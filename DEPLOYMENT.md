# Deployment & Viewing Guide

## Quick Start: View the App Locally

### Step 1: Install Node.js (if not already installed)
- Download from [nodejs.org](https://nodejs.org/) (LTS version recommended)
- Or use a version manager like `nvm` or `fnm`

### Step 2: Set Up Supabase
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project (choose a name and database password)
3. Wait for the project to finish setting up (takes ~2 minutes)
4. Go to **Settings → API**
5. Copy:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

### Step 3: Create Environment File
Create a file named `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 4: Set Up Database
1. In Supabase, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `supabase-schema.sql`
4. Paste and click **Run**
5. You should see "Success. No rows returned"

### Step 5: Install Dependencies & Run
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Step 6: Open in Browser
Open [http://localhost:3000](http://localhost:3000)

You should see the VinylLog homepage! Try logging your first album.

---

## Deploy to Production

### Option 1: Vercel (Easiest - Recommended)

**Why Vercel?**
- Free tier is generous
- Built by the Next.js team
- Automatic deployments from GitHub
- Zero configuration needed

**Steps:**

1. **Push code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   # Create a new repo on GitHub, then:
   git remote add origin https://github.com/yourusername/vinyllog.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login (use GitHub)
   - Click **"Add New..." → "Project"**
   - Import your GitHub repository
   - **Add Environment Variables:**
     - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
   - Click **"Deploy"**

3. **Done!** Your app will be live at `your-app.vercel.app`

**Future updates:** Just push to GitHub, Vercel auto-deploys!

### Option 2: Netlify

1. Push to GitHub (same as above)
2. Go to [netlify.com](https://netlify.com)
3. Sign up and click **"Add new site" → "Import an existing project"**
4. Connect GitHub and select your repo
5. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
6. Click **"Show advanced"** and add environment variables
7. Click **"Deploy site"**

### Option 3: Railway

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click **"New Project" → "Deploy from GitHub repo"**
4. Select your repository
5. Add environment variables in the Variables tab
6. Railway auto-detects Next.js and deploys

### Option 4: Self-Hosted (VPS/Docker)

If you have a VPS or want to use Docker:

```bash
# Build
npm run build

# Start production server
npm start
```

Or use Docker:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## Troubleshooting

### "Cannot find module" errors
- Run `npm install` again
- Delete `node_modules` and `.next` folders, then reinstall

### Database connection errors
- Double-check your `.env.local` file has the correct values
- Make sure you copied the **anon key**, not the service role key
- Verify your Supabase project is active

### Build errors on Vercel/Netlify
- Make sure environment variables are set correctly
- Check that your Supabase project is not paused
- Review build logs in your hosting platform

### Images not loading
- The `next.config.js` already includes Spotify image domains
- For other image sources, add them to the `domains` array in `next.config.js`

---

## Environment Variables Reference

| Variable | Description | Where to Get It |
|----------|-------------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase public/anonymous key | Supabase Dashboard → Settings → API |

**Note:** The `NEXT_PUBLIC_` prefix makes these variables available in the browser. Never put secrets here!

---

## Next Steps After Deployment

1. ✅ Test logging an album
2. ✅ Test editing a review
3. ✅ Test sorting by date/rating
4. 🔜 Add Spotify integration (when ready)

