#!/bin/bash

# ===== CONFIG =====
APP_NAME="finupsbd-client"
APP_DIR="/media/algorify-labs-ltd/Server/projects/finupsbd-frontend" 
PORT=3000
NODE_ENV="production"

echo "🚀 Starting deployment..."

cd $APP_DIR || exit
echo "🔄 Pulling latest changes from Git..."

git pull origin main




echo "📦 Installing dependencies..."
npm install 

echo "🏗️ Building Next.js app..."
npm run build

echo "♻️ Restarting app with PM2..."

pm2 restart finupsbd-client || pm2 start npm --name "$APP_NAME" -- start

echo "✅ Deployment finished successfully! start project finupsbd.com live"
