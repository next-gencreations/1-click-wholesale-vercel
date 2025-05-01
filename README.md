# 1-Click-Wholesale Vercel Deployment

This folder contains a minimal version of the 1-Click-Wholesale application specifically optimized for Vercel deployment.

## Simple Deployment Instructions

1. Go to your Vercel dashboard (vercel.com)
2. Click "Add New" -> "Project"
3. Import your GitHub repository or upload this `vercel` folder directly
4. **Important**: Set the Root Directory to `vercel` (this folder)
5. Click "Deploy"

## What's Included

- `index.html`: Simple product listing page
- `api/index.js`: Serverless API function that returns product data
- `vercel.json`: Configuration file for Vercel deployment

## Testing the Deployment

After deployment:

1. Visit your deployment URL to see the frontend
2. Visit `[your-url]/api` to see the API response

## Troubleshooting

If you encounter issues:

1. Check the Function Logs in your Vercel dashboard
2. Verify that the Root Directory is set to `vercel`
3. Make sure the vercel.json file is being recognized

## Next Steps

Once this simple deployment is working, you can:

1. Add more API endpoints to the `api` folder
2. Enhance the frontend with more features
3. Add authentication and user management