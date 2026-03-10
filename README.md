# pauladigun.com — Personal Research Website

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run locally (preview at http://localhost:5173)
npm run dev

# 3. Build for production
npm run build
```

## Deploy to GitHub Pages (FREE)

### First time setup:

```bash
# 1. Create a new repo on GitHub called "pauladigun-site" (or any name)
#    Go to https://github.com/new and create it (DON'T add README)

# 2. Initialize git and push
git init
git add .
git commit -m "Initial commit - pauladigun.com"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/pauladigun-site.git
git push -u origin main

# 3. Build and deploy
npm run build
npm run deploy
```

### After deploying:

1. Go to your GitHub repo → **Settings** → **Pages**
2. Under "Source", it should show **gh-pages** branch
3. Your site will be live at: `https://YOUR_USERNAME.github.io/pauladigun-site/`

### Connect your custom domain (pauladigun.com):

1. In GitHub repo → **Settings** → **Pages** → **Custom domain** → type `pauladigun.com` → Save
2. Go to your domain registrar (where you bought pauladigun.com) and update DNS:
   - Add an **A record** pointing to:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Add a **CNAME record**: `www` → `YOUR_USERNAME.github.io`
3. Check "Enforce HTTPS" in GitHub Pages settings
4. Wait 10-30 minutes for DNS to propagate

## Update the site later:

```bash
# Edit files, then:
git add .
git commit -m "Update site"
git push

# Rebuild and redeploy:
npm run build
npm run deploy
```

## Things to customize:
- Replace `paul.adigun@example.com` with your real email in `src/App.jsx`
- Replace `PAUL_SCHOLAR_ID` with your Google Scholar user ID
- Add your CV PDF and link the download buttons
- Update education/experience in the cvData object
