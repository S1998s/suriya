# Portfolio Website - Shanmugavel Suriya

A modern, highly performant, and visually stunning portfolio website built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Features a beautiful dark theme with smooth animations and a responsive design that works seamlessly across all devices.

## 🚀 Features

- **⚡ Next.js 15** - Latest React framework with App Router and Turbopack
- **🎨 Dark Theme** - Modern dark design with blue accent colors
- **📱 Fully Responsive** - Mobile-first design for all screen sizes
- **✨ Smooth Animations** - CSS-in-JS animations and transitions
- **🎯 Performance Optimized** - Lightning-fast load times with Next.js optimization
- **🔍 SEO Friendly** - Proper meta tags and structured data
- **🎪 Interactive Components** - Engaging UI elements and smooth interactions

## 📋 Sections Included

1. **Navigation Bar** - Sticky navigation with mobile menu
2. **Hero Section** - Eye-catching landing area with CTAs
3. **About Me** - Personal introduction with timeline
4. **Skills** - Technical skills with proficiency levels
5. **Projects** - Portfolio of featured projects with filtering
6. **Blog** - Latest articles and insights
7. **Contact Form** - Get in touch section with validation
8. **Footer** - Social links and credits

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Build Tool**: [Turbopack](https://turbo.build/pack)
- **Package Manager**: npm

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm installed on your system

### Setup Instructions

1. **Clone or navigate to the project directory**
   ```bash
   cd d:\surya
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment to GitHub Pages

This project is configured for static export and can be deployed to GitHub Pages.

### Prerequisites
- GitHub repository created
- Repository set to public (required for GitHub Pages)

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **"GitHub Actions"**
   - The deployment workflow will run automatically on push to main branch

3. **Access your site**
   - Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`
   - For user/organization sites, use: `https://YOUR_USERNAME.github.io`

### Notes
- The site uses static export, so client-side routing works properly
- Images are optimized and served from GitHub's CDN
- The build process is automated via GitHub Actions

## 🏗️ Project Structure

```
d:\surya/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home page
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── Navbar.tsx            # Navigation component
│   │   ├── Hero.tsx              # Hero section
│   │   ├── About.tsx             # About section
│   │   ├── Skills.tsx            # Skills section
│   │   ├── Projects.tsx          # Projects showcase
│   │   ├── Blog.tsx              # Blog section
│   │   ├── Contact.tsx           # Contact form
│   │   └── Footer.tsx            # Footer component
│   └── public/
│       └── Shanmugavel_Resume.pdf            # Resume PDF
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── tailwind.config.ts            # Tailwind configuration
├── next.config.ts                # Next.js configuration
└── README.md                     # This file
```

## 🎨 Customization

### Update Personal Information

Edit the components to add your own information:

- **Navbar**: Update name and resume link in [src/components/Navbar.tsx](src/components/Navbar.tsx)
- **Hero**: Customize greeting and description in [src/components/Hero.tsx](src/components/Hero.tsx)
- **About**: Update bio and timeline in [src/components/About.tsx](src/components/About.tsx)
- **Skills**: Add your technical skills in [src/components/Skills.tsx](src/components/Skills.tsx)
- **Projects**: Update your projects in [src/components/Projects.tsx](src/components/Projects.tsx)
- **Blog**: Add articles in [src/components/Blog.tsx](src/components/Blog.tsx)
- **Contact**: Update contact methods in [src/components/Contact.tsx](src/components/Contact.tsx)

### Tailwind CSS Theme

Customize colors and theme in [tailwind.config.ts](tailwind.config.ts). The dark theme colors are defined in the `extend.colors` section.

### Add Resume

1. Place your resume PDF in `public/Shanmugavel_Resume.pdf`
2. Update the download link in the Navbar component

## 📦 Available Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com)
3. Import your repository
4. Vercel will automatically detect Next.js and deploy with optimal settings

### Deploy on Other Platforms

- **Netlify**: Build command: `npm run build`, Publish directory: `.next`
- **AWS Amplify**: Similar to Vercel, supports Next.js natively
- **Docker**: Create a Dockerfile for containerized deployment

## 🔧 Performance Optimization

This portfolio includes several performance best practices:

- **Image Optimization**: Using Next.js Image component
- **Code Splitting**: Automatic route-based code splitting
- **CSS Optimization**: Tailwind CSS purges unused styles
- **Font Optimization**: System fonts for faster load times
- **Lazy Loading**: Components load on demand

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Shanmugavel Suriya**
- Portfolio: [https://surya.dev](https://surya.dev)
- Email: shanmugavel127.com
- GitHub: [@suryar](https://github.com/suryar)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from Unicode emoji set

---

**Made with ❤️ by Shanmugavel Suriya**
