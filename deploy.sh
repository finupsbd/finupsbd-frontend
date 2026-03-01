#!/bin/bash

# ===== CONFIG =====
APP_NAME="finupsbd"
APP_DIR="/media/algorify-labs-ltd/Server/projects/finupsbd-frontend" 
PORT=3000
NODE_ENV="production"

echo "🚀 Starting deployment..."

cd $APP_DIR || exit
echo "🔄 Pulling latest changes from Git...(IMPORTENT: All local changes will be lost)"
git reset --hard HEAD
git pull origin main

 


echo "📦 Installing dependencies..."
pnpm install 

echo "🏗️ Building Next.js app..."
pnpm run build

echo "♻️ Restarting app with PM2..."

pm2 restart finupsbd || pm2 start npm --name "$APP_NAME" -- start

echo "✅ Deployment finished successfully! start project finupsbd.com live"
