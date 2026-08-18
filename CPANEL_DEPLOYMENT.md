# AutoDezire — cPanel Deployment Guide

This guide walks you through deploying **AutoDezire** on a standard cPanel hosting environment using Node.js Selector / Application Manager.

---

## 1. Prerequisites on cPanel
- **Node.js Selector / Setup Node.js App** enabled in cPanel (Node.js v18+ or v20+).
- **MongoDB Database**: MongoDB Atlas cluster (recommended for cloud databases) or local MongoDB instance.
- **Git** or **File Manager** access in cPanel.

---

## 2. Step-by-Step Deployment

### Step 1: Upload Files
1. In your cPanel **File Manager**, navigate to your application root (e.g. `/home/username/autodezire` or `public_html`).
2. Upload the project repository files.
3. Ensure the project structure contains:
   ```
   ├── client/
   │   ├── dist/           <-- Production React build
   │   └── ...
   ├── server/
   │   ├── config/
   │   ├── models/
   │   ├── routes/
   │   ├── services/
   │   └── server.js       <-- Node entry point
   ├── .env.example
   ├── .htaccess
   ├── ecosystem.config.js
   └── package.json
   ```

### Step 2: Configure Environment Variables
1. Copy `.env.example` to `.env` in the root directory:
   ```env
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/autodezire?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_key_here
   GEMINI_API_KEY=your_optional_gemini_api_key
   OPENAI_API_KEY=your_optional_openai_api_key
   ```

### Step 3: Setup Node.js Application in cPanel
1. In cPanel, open **Setup Node.js App**.
2. Click **Create Application**.
3. Configure the following fields:
   - **Node.js version**: 20.x or 22.x
   - **Application mode**: Production
   - **Application root**: `autodezire` (or your folder path)
   - **Application startup file**: `server/server.js`
   - **Application URL**: `yourdomain.com` (or subdomain)
4. Click **Create**.

### Step 4: Install Dependencies & Build
1. In the Node.js application management screen, click **Run NPM Install** or access terminal via SSH.
2. In SSH / Terminal:
   ```bash
   npm run install-all
   npm run build
   ```

### Step 5: Start Application
1. In cPanel Node.js App, click **Restart**.
2. Visit `https://yourdomain.com` in your browser.
3. The AutoDezire platform will load with full suitability scoring, AI Advisor, and vehicle catalog!

---

## 3. Default Credentials
- **Admin Portal**: Accessible via `/admin` or the sidebar button.
- **Admin Email**: `admin@autodezire.com`
- **Admin Password**: `admin123`
