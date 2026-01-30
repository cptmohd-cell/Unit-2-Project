# Deployment Guide

This guide will help you deploy your AutoParts Store application to various platforms.

## Deploying to Render

1. **Create a Render account** at https://render.com

2. **Create a new Web Service**
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - Name: `autoparts-store`
     - Environment: `Node`
     - Build Command: `npm install`
     - Start Command: `node server.js`

3. **Set Environment Variables**
   - Add `MONGODB_URI` with your MongoDB Atlas connection string
   - Add `SESSION_SECRET` with a secure random string
   - Add `PORT` with value `3000`

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete

## Deploying to Heroku

1. **Install Heroku CLI**
   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create a new Heroku app**
   ```bash
   heroku create your-app-name
   ```

4. **Set environment variables**
   ```bash
   heroku config:set MONGODB_URI="your-mongodb-uri"
   heroku config:set SESSION_SECRET="your-secret"
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

## MongoDB Atlas Setup

1. **Create account** at https://www.mongodb.com/cloud/atlas

2. **Create a cluster**
   - Choose free tier (M0)
   - Select a cloud provider and region

3. **Create database user**
   - Go to Database Access
   - Add new database user with password

4. **Whitelist IP addresses**
   - Go to Network Access
   - Add IP address: `0.0.0.0/0` (allows access from anywhere)

5. **Get connection string**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## Important Notes

- Never commit your `.env` file to GitHub
- Use strong, unique values for `SESSION_SECRET` in production
- Regularly backup your MongoDB database
- Monitor your application logs for errors
- Set up proper error handling for production
