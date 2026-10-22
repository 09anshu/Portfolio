# Futuristic Interactive Developer Portfolio

A stunning, modern, highly interactive developer portfolio website built with modern web technologies and a futuristic neon green theme. Featuring glassmorphism, parallax scroll storytelling animations, and rich interactive developer components.

## Tech Stack
- **Framework:** Next.js 14/15 (App Router)
- **Library:** React
- **Styling:** Tailwind CSS (v4 Theme configuration)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Extras:** React GitHub Calendar

## Theme Highlights
- **Primary Color:** Neon Green (`#39FF14`)
- **Secondary Color:** Dark Green (`#0f2f1f`)
- **Accent:** Bright Green (`#00ff88`)
- **Background:** Dark black-green (`#050807`)

### Features
- Custom interactive glowing cursor tracking.
- Parallax grid and animated glowing blur backgrounds.
- Scroll-triggered reveal animations via Framer Motion.
- Animated vertical experience timeline.
- Dynamic GitHub Contribution Graph.
- Glassmorphism effect applied consistently across cards.

## Setup Instructions

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### 1. Clone or Download Repository
Navigate into the project directory:
```bash
cd portfolio
```

### 2. Install Dependencies
Run the following command to install all necessary packages:
```bash
npm install
```

### 3. Start Development Server
Run the local dev server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Build for Production
To test the production build locally:
```bash
npm run build
npm run start
```

## GitHub API Integration
Currently, the GitHub activity section fetches commits and paints a heatmap using `react-github-calendar` which relies internally on GitHub's API via proxy endpoints. 
To customize this, open `src/components/sections/GithubActivity.tsx` and change the `username` local variable (line ~12) to your GitHub username.

```tsx
const username = "YOUR_GITHUB_USERNAME";
```

## Deployment instructions for Vercel
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a GitHub/GitLab/Bitbucket repository.
2. Sign up or log into Vercel and click **Add New Project**.
3. Import your repository.
4. Vercel will automatically detect it's a Next.js project. You do not need to alter the default build settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `next build`
   - **Install Command**: `npm install`
5. Click **Deploy**. Focus your energy on showcasing your amazing work; Vercel handles the scaling, HTTPS, and CDN optimization automatically.

Enjoy your new futuristic Awwwards-level developer portfolio!
