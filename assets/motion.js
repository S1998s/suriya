(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  const dataConstrained = Boolean(connection?.saveData || ['slow-2g', '2g'].includes(connection?.effectiveType));
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const photoDialog = document.querySelector('.photo-dialog');
  const canAnimate = Boolean(gsap && !reducedMotion.matches && !dataConstrained && 'IntersectionObserver' in window);
  const canScrollAnimate = Boolean(canAnimate && ScrollTrigger);
  if (gsap && ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  const activeAnimations = new Set();
  const activeScrollTriggers = new Set();
  let photoWarpCleanup;
  let photoWarpRequest = 0;
  const isMobile = window.matchMedia('(max-width: 900px)').matches || window.matchMedia('(hover: none)').matches;
  const durationScale = isMobile ? 0.78 : 1;
  let revealObserver;
  let cardObserver;
  let sectionObserver;
  let introTimeline;
  let heroCards;
  let heroCardsVisible = false;
  let heroIntroFinished = false;
  const observed = new Map();

  function track(animation) {
    if (!animation) return animation;
    activeAnimations.add(animation);
    if (animation.scrollTrigger) activeScrollTriggers.add(animation.scrollTrigger);
    const onComplete = animation.eventCallback('onComplete');
    animation.eventCallback('onComplete', function () {
      activeAnimations.delete(this);
      onComplete?.call(this);
    });
    return animation;
  }

  function trackScrollTrigger(trigger) {
    if (!trigger) return trigger;
    activeScrollTriggers.add(trigger);
    return trigger;
  }

  function revealDialogPhoto(image) {
    closeDialogPhoto();
    const request = ++photoWarpRequest;
    if (!image) return;
    const source = image.currentSrc || image.src;
    const selectedImage = /(?:family-1|sports-1|candid-2)__w1200\.avif(?:$|\?)/.test(source);
    photoDialog?.classList.toggle('is-photo-takeover', selectedImage);
    if (!canAnimate) return;
    const fallbackReveal = () => track(gsap.fromTo(image, { clipPath: 'inset(6% round 2px)', scale: 1.025 }, {
      clipPath: 'inset(0% round 0px)', scale: 1, duration: .62, ease: 'power2.out', clearProps: 'clipPath,transform'
    }));
    if (isMobile || dataConstrained || !selectedImage || !('WebGLRenderingContext' in window)) {
      fallbackReveal();
      return;
    }
    image.decode().then(() => {
      if (request !== photoWarpRequest || !canAnimate || !photoDialog?.open || !image.isConnected) return;
      const figure = image.closest('figure');
      if (!figure) return;
      const canvas = document.createElement('canvas');
      canvas.className = 'photo-warp-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      figure.append(canvas);
      const gl = canvas.getContext('webgl', { alpha: true, antialias: false, depth: false, stencil: false, powerPreference: 'low-power' });
      if (!gl) { canvas.remove(); fallbackReveal(); return; }

      const vertexSource = 'attribute vec2 a_position; varying vec2 v_uv; void main(){v_uv=(a_position+1.0)*0.5;gl_Position=vec4(a_position,0.0,1.0);}';
      const fragmentSource = 'precision mediump float; varying vec2 v_uv; uniform sampler2D u_image; uniform vec2 u_resolution; uniform vec2 u_imageSize; uniform vec2 u_pointer; uniform float u_time; uniform float u_strength; uniform float u_mode; void main(){float boxAspect=u_resolution.x/u_resolution.y;float imageAspect=u_imageSize.x/u_imageSize.y;vec2 uv=v_uv;if(imageAspect>boxAspect){float fit=boxAspect/imageAspect;float inset=(1.0-fit)*0.5;if(uv.y<inset||uv.y>1.0-inset)discard;uv.y=(uv.y-inset)/fit;}else{float fit=imageAspect/boxAspect;float inset=(1.0-fit)*0.5;if(uv.x<inset||uv.x>1.0-inset)discard;uv.x=(uv.x-inset)/fit;}vec2 delta=uv-u_pointer;float radius=length(delta*vec2(boxAspect,1.0));float wave=sin(radius*34.0-u_time*7.0)*exp(-radius*5.5)*u_strength;vec2 offset;if(u_mode<0.5){offset=normalize(delta+vec2(0.0001))*wave*0.018;}else if(u_mode<1.5){offset=vec2(wave*0.024,wave*0.003);}else{offset=vec2(wave*0.004,wave*0.022);}gl_FragColor=texture2D(u_image,clamp(uv+offset,0.001,0.999));}';
      const compile = (type, sourceText) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, sourceText);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
        return shader;
      };
      const vertex = compile(gl.VERTEX_SHADER, vertexSource);
      const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
      if (!vertex || !fragment) { canvas.remove(); gl.getExtension('WEBGL_lose_context')?.loseContext(); fallbackReveal(); return; }
      const program = gl.createProgram();
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { canvas.remove(); gl.getExtension('WEBGL_lose_context')?.loseContext(); fallbackReveal(); return; }
      gl.useProgram(program);
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      const uniforms = Object.fromEntries(['u_resolution','u_imageSize','u_pointer','u_time','u_strength','u_mode'].map(name=>[name,gl.getUniformLocation(program,name)]));
      const mode = /sports-1/.test(source) ? 1 : /candid-2/.test(source) ? 2 : 0;
      let pointer = [.5,.5];
      let raf = 0;
      let began = performance.now();
      let until = began + 1500;
      const resize = () => {
        const rect = image.getBoundingClientRect();
        const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = Math.max(1, Math.round(rect.width * ratio));
        canvas.height = Math.max(1, Math.round(rect.height * ratio));
        gl.viewport(0,0,canvas.width,canvas.height);
        gl.uniform2f(uniforms.u_resolution,canvas.width,canvas.height);
        gl.uniform2f(uniforms.u_imageSize,image.naturalWidth,image.naturalHeight);
        gl.uniform1f(uniforms.u_mode,mode);
      };
      const draw = now => {
        raf = 0;
        if (!photoDialog?.open || reducedMotion.matches) { cleanup(); return; }
        const elapsed = now - began;
        const strength = Math.max(0,1-elapsed/Math.max(1,until-began));
        gl.uniform1f(uniforms.u_time,elapsed*.001);
        gl.uniform1f(uniforms.u_strength,strength);
        gl.uniform2f(uniforms.u_pointer,pointer[0],pointer[1]);
        gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
        if (now < until) raf = requestAnimationFrame(draw);
        else image.style.opacity = '0.08';
      };
      const startBurst = () => {
        began = performance.now();
        until = began + 720;
        image.style.opacity = '0.08';
        if (!raf) raf = requestAnimationFrame(draw);
      };
      const onPointer = event => {
        const rect = canvas.getBoundingClientRect();
        pointer = [Math.max(0,Math.min(1,(event.clientX-rect.left)/rect.width)),1-Math.max(0,Math.min(1,(event.clientY-rect.top)/rect.height))];
        startBurst();
      };
      const cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize',resize);
        canvas.removeEventListener('pointermove',onPointer);
        image.style.opacity = '';
        canvas.remove();
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        photoWarpCleanup = null;
      };
      resize();
      canvas.addEventListener('pointermove',onPointer,{passive:true});
      window.addEventListener('resize',resize,{passive:true});
      image.style.opacity = '0.08';
      photoWarpCleanup = cleanup;
      raf = requestAnimationFrame(draw);
    }).catch(() => {
      if (canAnimate) track(gsap.fromTo(image,{clipPath:'inset(6% round 2px)',scale:1.025},{clipPath:'inset(0% round 0px)',scale:1,duration:.62,ease:'power2.out',clearProps:'clipPath,transform'}));
    });
  }

  function closeDialogPhoto() {
    photoWarpRequest += 1;
    photoWarpCleanup?.();
    photoDialog?.classList.remove('is-photo-takeover');
  }

  function animateFrom(target, vars = {}) {
    if (!canAnimate || !target) return null;
    return track(gsap.fromTo(target, {
      autoAlpha: 0,
      y: isMobile ? 11 : 18,
      ...vars.from
    }, {
      autoAlpha: 1,
      y: 0,
      duration: (vars.duration || 0.72) * durationScale,
      ease: vars.ease || 'power2.out',
      clearProps: 'opacity,visibility,transform',
      ...vars.to
    }));
  }

  function animateGroup(elements, options = {}) {
    const items = [...elements].filter(Boolean);
    if (!items.length || !canAnimate) return;
    if (items.length === 1) {
      animateFrom(items[0], options);
      return;
    }
    return track(gsap.fromTo(items, {
      autoAlpha: 0,
      y: isMobile ? 10 : 16,
      ...options.from
    }, {
      autoAlpha: 1,
      y: 0,
      duration: (options.duration || 0.62) * durationScale,
      stagger: options.stagger ?? 0.08,
      ease: options.ease || 'power2.out',
      clearProps: 'opacity,visibility,transform',
      ...options.to
    }));
  }

  function revealHeading(element) {
    if (!canAnimate || !element) return;
    const marker = element.querySelector('.chapter-mark');
    const title = element.querySelector('h1, h2');
    const supporting = element.querySelector('.chapter-deck, .section-intro, .personal-cover-lede');
    const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });
    if (marker) timeline.from(marker, { autoAlpha: 0, y: -9, rotation: -4, duration: .48 * durationScale }, 0);
    if (title) timeline.fromTo(title,
      { autoAlpha: 0, y: 8, clipPath: 'inset(0 0 100% 0)' },
      { autoAlpha: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: .76 * durationScale, clearProps: 'opacity,visibility,transform,clipPath' },
      .08);
    if (supporting) timeline.from(supporting, { autoAlpha: 0, y: 8, duration: .56 * durationScale, clearProps: 'opacity,visibility,transform' }, .34);
    track(timeline);
  }

  function revealPhotograph(element) {
    if (!canAnimate || !element) return;
    const image = element.querySelector('img');
    const caption = element.querySelector('figcaption');
    const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });
    if (image) timeline.fromTo(image,
      { clipPath: 'inset(7% 0 7% 0)', scale: 1.025 },
      { clipPath: 'inset(0% 0 0% 0)', scale: 1, duration: .76 * durationScale, clearProps: 'clipPath,transform' },
      0);
    if (caption) timeline.from(caption, { autoAlpha: 0, y: 7, duration: .42 * durationScale, clearProps: 'opacity,visibility,transform' }, .24);
    track(timeline);
  }

  function revealMemory(element) {
    if (!canAnimate || !element) return;
    const image = element.querySelector('img');
    const caption = element.querySelector('figcaption');
    const cards = [...element.parentElement.querySelectorAll('.memory')];
    const cardIndex = Math.max(0, cards.indexOf(element));
    const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });
    timeline.fromTo(element,
      { autoAlpha: 0, y: 22 },
      { autoAlpha: 1, y: 0, duration: .68 * durationScale, clearProps: 'opacity,visibility,transform' },
      cardIndex * .08);
    if (image) timeline.fromTo(image,
      { scale: 1.045 },
      { scale: 1, duration: .9 * durationScale, ease: 'power2.out', clearProps: 'transform' },
      cardIndex * .08);
    if (caption) timeline.from(caption.children, { autoAlpha: 0, y: 7, stagger: .06, duration: .4 * durationScale, clearProps: 'opacity,visibility,transform' }, .18 + cardIndex * .08);
    track(timeline);
  }

  function revealElement(element, type) {
    if (type === 'heading') {
      revealHeading(element);
      return;
    }
    if (type === 'timeline') {
      if (!canScrollAnimate) element.classList.add('is-drawn');
      animateGroup(element.children, { y: 13, stagger: 0.11, duration: 0.62 });
      return;
    }
    if (type === 'memory') {
      revealMemory(element);
      return;
    }
    if (type === 'photo') {
      revealPhotograph(element);
      return;
    }
    if (type === 'craft') {
      const heading = element.querySelector(':scope > div');
      const rows = element.querySelectorAll('.skills-table tbody tr');
      animateFrom(heading, { duration: .55 });
      animateGroup(rows, { y: 8, stagger: .08, duration: .48 });
      return;
    }
    if (type === 'story') {
      const children = [...element.children];
      const personalChapter = document.body.classList.contains('personal-page');
      animateGroup(children, {
        y: personalChapter ? 8 : 12,
        stagger: personalChapter ? 0.1 : 0.07,
        duration: personalChapter ? 0.82 : 0.58,
        ease: personalChapter ? 'sine.out' : 'power2.out'
      });
      return;
    }
    if (type === 'cover-photo') {
      if (!canAnimate) return;
      const image = element.querySelector('.personal-cover-image img');
      const sweep = element.querySelector('.personal-photo-sweep');
      const caption = element.querySelector('figcaption');
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      timeline.fromTo(element,
        { autoAlpha: 0, y: 14, rotation: -2, scale: .985, transformOrigin: '50% 48%' },
        { autoAlpha: 1, y: 0, rotation: 1, scale: 1, duration: .82 * durationScale, clearProps: 'opacity,visibility,transform' },
        0);
      if (image) timeline.fromTo(image,
        { scale: 1.08, filter: 'grayscale(.82) sepia(.32) saturate(.55) brightness(.84) blur(5px)' },
        { scale: 1, filter: 'grayscale(0) sepia(.1) saturate(.86) brightness(1) blur(0px)', duration: 1.32 * durationScale, ease: 'power2.out', clearProps: 'transform,filter' },
        .06);
      if (sweep) timeline.fromTo(sweep,
        { yPercent: -125, autoAlpha: 0 },
        { yPercent: 420, autoAlpha: .82, duration: 1.12 * durationScale, ease: 'power1.inOut', clearProps: 'opacity,visibility,transform' },
        .12);
      if (caption) timeline.from(caption.children, { autoAlpha: 0, y: 8, stagger: .08, duration: .42 * durationScale, clearProps: 'opacity,visibility,transform' }, .72 * durationScale);
      track(timeline);
      return;
    }
    if (type === 'column-left') {
      animateFrom(element, { y: 0, from: { x: isMobile ? 0 : -14 }, duration: 0.68 });
      return;
    }
    if (type === 'column-right') {
      animateFrom(element, { y: 0, from: { x: isMobile ? 0 : 14 }, duration: 0.68 });
      return;
    }
    if (type === 'closing') {
      animateGroup(element.children, { y: 13, stagger: 0.12, duration: 0.7 });
      return;
    }
    animateFrom(element, { duration: type === 'heading' ? 0.78 : 0.68 });
  }

  function watch(element, type = 'rise') {
    if (!element || !revealObserver || observed.has(element)) return;
    observed.set(element, type);
    revealObserver.observe(element);
  }

  function watchAll(elements, type = 'rise') {
    elements.forEach(element => watch(element, type));
  }

  function unobserveAll(elements) {
    elements.forEach(element => {
      revealObserver?.unobserve(element);
      observed.delete(element);
    });
  }

  function updateCardResting() {
    if (!heroCards) return;
    heroCards.classList.toggle('is-resting', document.hidden || !heroCardsVisible || !heroIntroFinished);
  }

  function animateHomeIntro() {
    const hero = document.querySelector('.hero-content');
    if (!hero || !canAnimate) return;
    const eyebrow = hero.querySelector('.hero-eyebrow');
    const title = hero.querySelector('#hero-title');
    const titleEmphasis = title?.querySelector('span');
    const welcome = hero.querySelector('.hero-welcome');
    const itinerary = hero.querySelector('.hero-itinerary');
    const locations = itinerary ? [...itinerary.children] : [];
    const cards = hero.querySelector('.journey-paths');
    const cardLinks = cards ? [...cards.children] : [];

    heroCards = cards;
    heroIntroFinished = false;
    heroCards?.classList.add('is-resting');
    introTimeline = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete() {
        heroIntroFinished = true;
        updateCardResting();
      }
    });
    track(introTimeline);
    if (eyebrow) introTimeline.from(eyebrow, { autoAlpha: 0, y: 9, duration: 0.48 * durationScale }, 0.05);
    if (title) introTimeline.fromTo(title,
      { autoAlpha: 0, y: 17, clipPath: 'inset(0 0 100% 0)' },
      { autoAlpha: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.82 * durationScale, clearProps: 'opacity,visibility,transform,clipPath' },
      0.12);
    if (titleEmphasis) introTimeline.from(titleEmphasis, { autoAlpha: 0, x: isMobile ? -6 : -11, duration: 0.68 * durationScale }, 0.42);
    if (welcome) introTimeline.from(welcome, { autoAlpha: 0, y: 10, duration: 0.64 * durationScale }, 0.58);
    if (itinerary) introTimeline.from(itinerary, { autoAlpha: 0, y: 9, duration: 0.56 * durationScale }, 0.78);
    if (locations.length) introTimeline.from(locations, { autoAlpha: 0, y: 7, stagger: 0.09 * durationScale, duration: 0.46 * durationScale }, 0.88);
    if (cardLinks.length) introTimeline.from(cardLinks, { autoAlpha: 0, y: 0, stagger: 0.1 * durationScale, duration: 0.64 * durationScale }, 1.08);
  }

  function setCurrentNavigation(section) {
    document.querySelectorAll('.site-header nav a[aria-current], .chapter-links a[aria-current]').forEach(link => link.removeAttribute('aria-current'));
    if (!section) return;
    const link = document.querySelector(`.site-header nav a[href="#${section.id}"], .chapter-links a[href="#${section.id}"]`);
    link?.setAttribute('aria-current', 'location');
  }

  function initScrollStory() {
    const navigationLinks = [...document.querySelectorAll('.site-header nav a[href^="#"], .chapter-links a[href^="#"]')];
    const sections = [...new Set(navigationLinks.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean))];
    if (!sections.length || !('IntersectionObserver' in window)) return;
    const visible = new Map();
    sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) visible.set(entry.target, entry.intersectionRatio);
        else visible.delete(entry.target);
      });
      const current = [...visible.entries()].sort((left, right) => right[1] - left[1])[0]?.[0];
      setCurrentNavigation(current);
    }, { rootMargin: '-22% 0px -62% 0px', threshold: [0, 0.08, 0.2, 0.45] });
    sections.forEach(section => sectionObserver.observe(section));
  }

  function initProjects() {
    document.querySelectorAll('details.project').forEach(project => {
      project.addEventListener('toggle', () => {
        if (!project.open || !canAnimate) return;
        const body = project.querySelector('.project-body');
        if (body) animateFrom(body, { y: 7, from: { clipPath: 'inset(0 0 12% 0)' }, duration: 0.42 });
      });
    });
  }

  function createScrubbedMotion(target, from, to, scrollTrigger) {
    if (!canScrollAnimate || !target) return null;
    const tween = gsap.fromTo(target, from, {
      ...to,
      ease: 'none',
      scrollTrigger: { ...scrollTrigger, scrub: scrollTrigger.scrub ?? 0.45 }
    });
    if (tween.scrollTrigger) trackScrollTrigger(tween.scrollTrigger);
    track(tween);
    return tween;
  }

  function initScrollChoreography() {
    if (!canScrollAnimate) return;
    const hero = document.querySelector('.hero');
    if (hero && !isMobile) {
      const title = hero.querySelector('#hero-title');
      const description = hero.querySelector('.hero-welcome');
      const itinerary = hero.querySelector('.hero-itinerary');
      const cards = hero.querySelector('.journey-paths');
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.45 }
      });
      if (title) timeline.to(title, { y: -24, scale: 1.035, transformOrigin: '50% 60%' }, 0);
      if (description) timeline.to(description, { y: -13 }, 0);
      if (itinerary) timeline.to(itinerary, { y: -7 }, 0);
      if (cards) timeline.to(cards, { y: 12 }, 0);
      track(timeline);
      if (timeline.scrollTrigger) activeScrollTriggers.add(timeline.scrollTrigger);
    }

    const journey = document.querySelector('.hero-itinerary');
    if (journey) {
      createScrubbedMotion(journey, { '--journey-progress': 0 }, { '--journey-progress': 1 }, {
        trigger: journey,
        start: 'top 88%',
        end: 'top 48%',
        scrub: 0.35
      });
    }

    document.querySelectorAll('.timeline, .story-timeline').forEach(timeline => {
      timeline.classList.add('motion-line');
      gsap.set(timeline, { '--motion-progress': 0 });
      createScrubbedMotion(timeline, { '--motion-progress': 0 }, { '--motion-progress': 1 }, {
        trigger: timeline,
        start: 'top 78%',
        end: 'bottom 48%',
        scrub: 0.5
      });
      timeline.querySelectorAll('li').forEach(item => {
        trackScrollTrigger(ScrollTrigger.create({
          trigger: item,
          start: 'top 66%',
          end: 'bottom 42%',
          toggleClass: { targets: item, className: 'is-active' },
          fastScrollEnd: 2800
        }));
      });
    });

    document.querySelectorAll('.journal-frame, .personal-cover-image img').forEach((frame, index) => {
      if (isMobile) return;
      createScrubbedMotion(frame, { y: index % 2 ? 7 : 10 }, { y: index % 2 ? -7 : -10 }, {
        trigger: frame,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6
      });
    });

    if (!isMobile) {
      document.querySelectorAll('.skills-table tbody tr').forEach(row => {
        trackScrollTrigger(ScrollTrigger.create({
          trigger: row,
          start: 'top 68%',
          end: 'bottom 38%',
          toggleClass: { targets: row, className: 'is-current' },
          fastScrollEnd: 2800
        }));
      });
    }
  }

  function finishForReducedMotion() {
    if (!reducedMotion.matches) return;
    revealObserver?.disconnect();
    sectionObserver?.disconnect();
    activeScrollTriggers.forEach(trigger => trigger.kill());
    activeScrollTriggers.clear();
    activeAnimations.forEach(animation => animation.progress(1));
    activeAnimations.clear();
    heroIntroFinished = true;
    updateCardResting();
    document.querySelectorAll('.timeline.motion-line, .story-timeline.motion-line').forEach(timeline => timeline.classList.add('is-drawn'));
  }

  if (canAnimate) {
    revealObserver = new IntersectionObserver(entries => {
      entries.filter(entry => entry.isIntersecting).forEach(entry => {
        revealElement(entry.target, observed.get(entry.target));
        revealObserver.unobserve(entry.target);
        observed.delete(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });

    animateHomeIntro();
    document.querySelectorAll('.reveal').forEach(element => {
      const type = element.classList.contains('career-column') ? 'column-left'
        : element.classList.contains('work-column') ? 'column-right'
        : element.classList.contains('chapter-heading') ? 'heading'
        : element.classList.contains('craft') ? 'craft'
        : element.classList.contains('memory') ? 'memory'
        : element.classList.contains('contact-layout') ? 'closing'
        : 'rise';
      watch(element, type);
    });
    document.querySelectorAll('.timeline, .story-timeline').forEach(element => {
      element.classList.add('motion-line');
      watch(element, 'timeline');
    });
    document.querySelectorAll('.chapter-intro-inner').forEach(element => watch(element, 'heading'));
    document.querySelectorAll('.personal-cover-copy').forEach(element => watch(element, 'heading'));
    document.querySelectorAll('.personal-cover-photo').forEach(element => watch(element, 'cover-photo'));
    document.querySelectorAll('.place-thread-list li').forEach(element => watch(element, 'rise'));
    document.querySelectorAll('.story-section').forEach(element => watch(element, 'story'));
    document.querySelectorAll('.journal-frame').forEach(element => watch(element, 'photo'));
    document.querySelectorAll('.footer-letter, .footer-base').forEach(element => watch(element, 'closing'));

    if (heroCards && 'IntersectionObserver' in window) {
      cardObserver = new IntersectionObserver(entries => {
        heroCardsVisible = entries[0].isIntersecting;
        updateCardResting();
      }, { threshold: 0.15 });
      cardObserver.observe(heroCards);
      document.addEventListener('visibilitychange', updateCardResting);
    }

    initProjects();
    initScrollStory();
    initScrollChoreography();
  } else {
    document.querySelector('.journey-paths')?.classList.add('is-resting');
  }

  window.portfolioMotion = {
    observe: watch,
    observeAll: watchAll,
    unobserveAll,
    revealDialogPhoto,
    closeDialogPhoto,
    canAnimate
  };
  reducedMotion.addEventListener('change', finishForReducedMotion);
  if (reducedMotion.matches) finishForReducedMotion();
})();
