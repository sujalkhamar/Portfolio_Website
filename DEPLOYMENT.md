# 🚀 Sujal Khamar Portfolio — Deployment Guide

## 📁 Folder Structure

```
portfolio/
├── index.html          ← Main portfolio page
├── 404.html            ← Custom 404 page
├── netlify.toml        ← Netlify config
├── css/
│   └── style.css       ← All styles
├── js/
│   └── main.js         ← All JavaScript
└── assets/
    ├── favicon.svg     ← Favicon
    └── Sujal_Khamar_Resume.pdf  ← Add your resume here!
```

---

## ✅ Step 0: Before Deploying — Things to Customize

Open `index.html` and update:
1. **Email** → Replace `sujalkhamar@gmail.com` with your real email
2. **LinkedIn** → Replace `linkedin.com/in/sujalkhamar` with your real URL
3. **GitHub** → Replace `github.com/sujalkhamar` with your real GitHub
4. **Formspree ID** → Replace `YOUR_FORM_ID` with your Formspree form ID (see below)
5. **Resume** → Add your PDF as `assets/Sujal_Khamar_Resume.pdf`
6. **OG URL** → Replace `https://sujalkhamar.netlify.app` with your actual URL after deploying

---

## 🟠 Step 1: Set Up Formspree (Contact Form)

1. Go to https://formspree.io and create a free account
2. Create a new form → choose "HTML Form"
3. Copy your form ID (looks like: `xpzgkqbn`)
4. In `index.html`, find this line:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
5. Replace `YOUR_FORM_ID` with your actual form ID

---

## 🐙 Step 2: Upload to GitHub

### First time setup (do this once):

```bash
# 1. Go inside the portfolio folder
cd portfolio

# 2. Initialize git
git init

# 3. Add all files
git add .

# 4. Commit
git commit -m "Initial portfolio commit"

# 5. Rename branch to main
git branch -M main

# 6. Connect to GitHub repo (create an empty repo on GitHub first!)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# 7. Push to GitHub
git push -u origin main
```

### After making changes:
```bash
git add .
git commit -m "Update portfolio"
git push
```

---

## 🌐 Step 3A: Deploy on GitHub Pages (Free)

1. Go to your GitHub repo
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Source", select **Deploy from a branch**
4. Select **main** branch → **/ (root)** folder
5. Click **Save**
6. Wait ~2 minutes
7. Your site will be live at: `https://YOUR_USERNAME.github.io/portfolio`

---

## ⚡ Step 3B: Deploy on Netlify (PREFERRED — better performance)

### Option A: Drag & Drop (Easiest)

1. Go to https://netlify.com and sign up (free)
2. Click **Add new site** → **Deploy manually**
3. Drag and drop your entire `portfolio` folder
4. Done! You get a live URL instantly

### Option B: Connect GitHub (Recommended for auto-updates)

1. Go to https://netlify.com
2. Click **Add new site** → **Import an existing project**
3. Choose **Deploy with GitHub**
4. Select your `portfolio` repository
5. Leave build settings blank (no framework)
6. Click **Deploy site**
7. Every `git push` will auto-deploy — zero effort!

### Custom Domain on Netlify:
- Go to **Domain settings** → **Add custom domain**
- You can get a free `.netlify.app` subdomain or connect your own

---

## 📊 Step 4: Add Google Analytics (Optional)

1. Go to https://analytics.google.com
2. Create a new property → Web
3. Get your Measurement ID (looks like: `G-XXXXXXXXXX`)
4. Add this before `</head>` in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🎨 Step 5: Add Your Resume PDF

1. Export your resume as PDF
2. Name it exactly: `Sujal_Khamar_Resume.pdf`
3. Place it in the `assets/` folder
4. The download button is already set up!

---

## 🔍 Step 6: Update SEO & Open Graph

In `index.html`, update these meta tags with your real deployed URL:

```html
<meta property="og:url" content="https://YOUR-REAL-URL.netlify.app" />
<meta property="og:image" content="https://YOUR-REAL-URL.netlify.app/assets/og-image.png" />
```

For the OG image: Take a screenshot of your portfolio homepage, save it as `assets/og-image.png` (1200×630px ideal).

---

## ✅ Deployment Checklist

- [ ] Updated email, LinkedIn, GitHub links
- [ ] Added resume PDF to `assets/`
- [ ] Set up Formspree and updated form ID
- [ ] Pushed to GitHub
- [ ] Deployed on Netlify (or GitHub Pages)
- [ ] Verified live URL works
- [ ] Tested on mobile
- [ ] Added Google Analytics (optional)
- [ ] Updated OG image URL

---

## 🆘 Common Issues

**Form not sending?**
→ Make sure you replaced `YOUR_FORM_ID` with your actual Formspree ID

**Resume not downloading?**
→ Ensure the file is named exactly `Sujal_Khamar_Resume.pdf` in the `assets/` folder

**Charts not showing?**
→ Make sure you have internet (CDN dependency). For offline use, download Chart.js locally.

**Dark mode not persisting?**
→ This is normal in private/incognito mode (localStorage is blocked). Works fine in normal browsing.

---

Good luck with your internship search, Sujal! 🚀
