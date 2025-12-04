# VinylLog

A personal web application to track, rate, and review music albums - inspired by Letterboxd.

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)

### Local Development

1. **Install dependencies:**
```bash
npm install
```

2. **Set up Supabase:**
   - Go to [supabase.com](https://supabase.com) and create a free account
   - Create a new project
   - Go to Settings → API to get your project URL and anon key

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Set up the database:**
   - In Supabase, go to SQL Editor
   - Copy and paste the contents of `supabase-schema.sql`
   - Run the SQL to create the tables

5. **Run the development server:**
```bash
npm run dev
```

6. **View the app:**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

### Option 1: Vercel (Recommended - Free & Easy)

Vercel is the easiest way to deploy Next.js apps:

1. **Push your code to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-github-repo-url
git push -u origin main
```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Click "Deploy"

3. **Your app will be live!** Vercel will give you a URL like `your-app.vercel.app`

### Option 2: Netlify

1. Push to GitHub (same as above)
2. Go to [netlify.com](https://netlify.com)
3. Sign up and click "New site from Git"
4. Connect your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add environment variables in Site settings
7. Deploy!

### Option 3: Self-hosted

1. **Build the app:**
```bash
npm run build
```

2. **Start the production server:**
```bash
npm start
```

The app will run on `http://localhost:3000`

## Environment Variables

For deployment, make sure to set these environment variables in your hosting platform:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon/public key

## Database Setup

Run the SQL schema in your Supabase SQL editor (see `supabase-schema.sql`). This creates:
- `users` table (for future multi-user support)
- `albums` table (cached album metadata)
- `reviews` table (your logged entries)

## Features

- ✅ Manual album logging
- ✅ Star ratings (1-5)
- ✅ Text reviews
- ✅ Date listened tracking
- ✅ Grid view of logged albums
- ✅ Sort by date or rating
- ✅ Recent listens section
- ✅ Edit and delete reviews
- 🔜 Spotify integration (coming soon)

