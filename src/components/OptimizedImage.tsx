type OptimizedImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

const responsiveBreakpoints = [320, 480, 640, 768, 960, 1200, 1600];

function splitSource(src: string) {
  const [cleanSrc] = src.split(/[?#]/);
  const dotIndex = cleanSrc.lastIndexOf(".");
  if (dotIndex === -1) {
    return { base: cleanSrc, extension: "" };
  }
  return {
    base: cleanSrc.slice(0, dotIndex),
    extension: cleanSrc.slice(dotIndex),
  };
}

function buildSrcSet(src: string, width: number, extension: string) {
  const { base } = splitSource(src);
  const candidates = responsiveBreakpoints.filter((breakpoint) => breakpoint < width);
  if (candidates.length === 0) {
    return undefined;
  }

  return candidates
    .map((breakpoint) => `${base}__w${breakpoint}${extension} ${breakpoint}w`)
    .concat(`${src} ${width}w`)
    .join(", ");
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = "100vw",
}: OptimizedImageProps) {
  const original = splitSource(src);
  const avifSrcSet = buildSrcSet(src, width, ".avif");
  const webpSrcSet = buildSrcSet(src, width, ".webp");
  const fallbackSrcSet = buildSrcSet(src, width, original.extension);

  return (
    <picture>
      {avifSrcSet ? <source srcSet={avifSrcSet} sizes={sizes} type="image/avif" /> : null}
      {webpSrcSet ? <source srcSet={webpSrcSet} sizes={sizes} type="image/webp" /> : null}
      <img
        src={src}
        srcSet={fallbackSrcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}