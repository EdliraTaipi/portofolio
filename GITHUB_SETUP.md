# GitHub Setup Instructions for Your Portfolio

Since the Replit environment has git restrictions, here's how to push your portfolio to GitHub:

## Option 1: Download and Push Locally

### Step 1: Download Your Project
1. **In Replit**: Click the 3-dot menu → Download as zip
2. **Extract** the zip file on your computer
3. **Remove** the `.replit` file and `.git` folder (if present)

### Step 2: Create GitHub Repository  
1. Go to **GitHub.com**
2. Click **"New repository"**
3. **Repository name**: `portofolio` (already created)
4. **Description**: "Professional portfolio showcasing Digital Marketing and Strategic Management expertise"
5. Set to **Public** (recommended for portfolio)
6. **Don't** initialize with README (you already have one)
7. Click **"Create repository"**

### Step 3: Push to GitHub
Open terminal/command prompt in your extracted folder:

```bash
# Initialize git repository
git init

# Configure git (use your details)
git config user.name "Edlira Taipi"
git config user.email "edlira.taipi@hotmail.com"

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Professional portfolio with working email system

- Complete React/TypeScript portfolio application
- Working Brevo SMTP email integration  
- PostgreSQL database with Drizzle ORM
- Mobile-responsive design across all sections
- Professional email templates and contact form
- Multi-tier email backup system
- LinkedIn integration with animated buttons
- Message dashboard for contact form review
- Ready for deployment"

# Add your existing GitHub remote
git remote add origin https://github.com/EdliraTaipi/portofolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Option 2: GitHub Desktop (Easier)

1. **Download GitHub Desktop** from desktop.github.com
2. **Download** your Replit project as zip
3. **Extract** and remove `.replit` and `.git` folders
4. **Open GitHub Desktop** → "Add an Existing Repository from your Hard Drive"
5. **Select** your project folder
6. **Create repository** → "Publish repository"
7. Set name: `edlira-taipi-portfolio`
8. **Publish** to GitHub

## Environment Variables for Deployment

Create a `.env.example` file for others:
```
DATABASE_URL=your_postgresql_database_url
BREVO_API_KEY=your_brevo_api_key
PGHOST=your_postgres_host
PGPORT=5432
PGUSER=your_postgres_user
PGPASSWORD=your_postgres_password
PGDATABASE=your_database_name
```

**Important**: Never commit your actual `.env` file with real secrets!

## Repository Features to Enable

After pushing to GitHub:

1. **GitHub Pages** (if deploying static version)
2. **Issues** (for project management)
3. **Discussions** (for community feedback)
4. **Actions** (for CI/CD if needed)

## Recommended Repository Settings

- **License**: MIT (open for collaboration)
- **Topics**: Add tags like: `portfolio`, `react`, `typescript`, `digital-marketing`, `brevo`, `nodejs`
- **Description**: "Professional portfolio showcasing Digital Marketing and Strategic Management expertise with working contact system"
- **Website**: Add your deployed URL when available

## Your Portfolio Structure

```
edlira-taipi-portfolio/
├── README.md                 # Project overview
├── client/                   # React frontend
├── server/                   # Express backend  
├── shared/                   # Shared schemas
├── attached_assets/          # Your portfolio documents
├── package.json             # Dependencies
├── NOTIFICATION_SETUP.md    # Email system docs
├── BREVO_SETUP_GUIDE.md    # Email configuration
└── replit.md               # Project documentation
```

## After GitHub Setup

1. **Star your repository** to make it more visible
2. **Add repository to LinkedIn** in your projects section
3. **Share the GitHub link** in your CV/resume
4. **Enable GitHub Profile README** to showcase this project

Your portfolio will be accessible at:
`https://github.com/YOUR_USERNAME/edlira-taipi-portfolio`