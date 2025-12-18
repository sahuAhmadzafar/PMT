# PMT - Project Management Tool

A modern, full-featured project management platform built with Next.js 16, React 19, TypeScript, and Tailwind CSS. Features a comprehensive dashboard with project tracking, kanban boards, Gantt charts, time tracking, team management, and real-time chat capabilities.

## ✨ Features

- **📊 Dashboard**: Overview of projects, tasks, and team activity
- **📋 Kanban Boards**: Visual task management with drag-and-drop
- **📅 Gantt Charts**: Timeline view for project planning
- **⏱️ Time Tracking**: Track time spent on tasks and projects
- **👥 Team Management**: Manage team members and their roles
- **💬 Real-time Chat**: Collaborate with your team
- **🎨 Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **🌓 Dark/Light Mode**: System-aware theme switching
- **📱 Fully Responsive**: Optimized for all devices
- **⚡ Performance**: Built on Next.js 16 with React 19

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui (Radix UI primitives)
- **Forms**: React Hook Form + Zod validation
- **Theme**: next-themes
- **Analytics**: Vercel Analytics
- **Charts**: Recharts
- **Icons**: Lucide React

## 📁 Project Structure

```
PMT/
├── app/                        # Next.js App Router
│   ├── (dashboard)/           # Dashboard route group
│   │   ├── chat/              # Chat page
│   │   ├── dashboard/         # Main dashboard
│   │   ├── gantt/             # Gantt chart view
│   │   ├── kanban/            # Kanban board
│   │   ├── projects/          # Projects list
│   │   ├── settings/          # Settings page
│   │   ├── team/              # Team management
│   │   ├── time-tracking/     # Time tracking
│   │   └── layout.tsx         # Dashboard layout
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page (redirects to dashboard)
│   └── globals.css            # Global styles & Tailwind
├── components/                # React components
│   ├── layout/               # Layout components (Header, Sidebar)
│   ├── providers/            # Context providers
│   ├── ui/                   # shadcn/ui components
│   └── theme-provider.tsx    # Theme provider
├── lib/                      # Utilities
│   └── utils.ts              # Helper functions
├── hooks/                    # Custom React hooks
├── public/                   # Static assets
└── styles/                   # Legacy SCSS (if needed)
```

## 🚀 Getting Started

### Prerequisites

- **Node.js 20.9.0 or later** (required for Next.js 16)
- npm, yarn, or pnpm package manager

> ⚠️ **Note**: This project requires Node.js >= 20.9.0. If you're using an older version, please upgrade using [nvm](https://github.com/nvm-sh/nvm) or [Node.js installer](https://nodejs.org/).

### Installation

1. **Clone the repository** (or ensure you have the project files)

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

The app will redirect to `/dashboard` automatically.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Styling

This project uses **Tailwind CSS v4** with a CSS-first configuration. The theme is defined in `app/globals.css` using CSS variables and the `@theme` directive.

### Customization

Colors, fonts, and other design tokens can be customized in `app/globals.css`:

```css
:root {
  --primary: oklch(0.5 0.2 240);
  --background: oklch(1 0 0);
  /* ... more variables */
}
```

## 🧩 Components

This project uses [shadcn/ui](https://ui.shadcn.com/) components built on Radix UI primitives. Components are located in `components/ui/` and can be customized as needed.

## 🌓 Theme System

The theme system uses `next-themes` for dark/light mode switching. The theme provider is configured in the root layout and supports:
- System preference detection
- Manual theme switching
- Persistent theme selection
- Smooth transitions

## 📦 Key Dependencies

### Core
- `next` - React framework
- `react` & `react-dom` - UI library
- `typescript` - Type safety

### UI & Styling
- `tailwindcss` - Utility-first CSS
- `@tailwindcss/postcss` - Tailwind v4 PostCSS plugin
- `class-variance-authority` - Component variants
- `clsx` & `tailwind-merge` - Class name utilities

### Components
- `@radix-ui/*` - Headless UI primitives
- `lucide-react` - Icon library
- `recharts` - Chart library

### Forms & Validation
- `react-hook-form` - Form state management
- `zod` - Schema validation
- `@hookform/resolvers` - Form validation integration

### Other
- `next-themes` - Theme management
- `date-fns` - Date utilities
- `@vercel/analytics` - Analytics

## 🔧 Configuration Files

- `next.config.mjs` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.mjs` - PostCSS configuration (Tailwind)
- `.eslintrc.json` - ESLint configuration
- `components.json` - shadcn/ui configuration

## 📱 Features Overview

### Dashboard
Main overview page showing project statistics, recent activity, and quick actions.

### Projects
Project management with filtering, search, and detailed project views.

### Kanban Board
Visual task management with columns for different task statuses. Drag-and-drop functionality for task organization.

### Gantt Chart
Timeline view for project planning and tracking dependencies.

### Time Tracking
Track time spent on tasks with start/stop functionality and time reports.

### Team Management
Manage team members, assign roles, and view team activity.

### Chat
Real-time messaging for team collaboration.

### Settings
User and application settings.

## 🔐 Environment Variables

Create a `.env.local` file for local development (not committed to git):

```env
# Add your environment variables here
# Example:
# NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will detect Next.js and configure the build automatically
4. Deploy!

### Other Platforms

This Next.js app can be deployed to any platform that supports Node.js:
- Netlify
- AWS Amplify
- Railway
- Render
- Docker

Build the app:
```bash
npm run build
```

## 📝 Development Notes

- The project uses Next.js App Router (not Pages Router)
- All routes are defined in the `app/` directory
- Components use TypeScript for type safety
- The dashboard uses route groups `(dashboard)` for shared layout
- Server and client components are separated as needed

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📄 License

This project is open source and available for personal and commercial use.

---

**Built with ❤️ using Next.js, React, and modern web technologies**
