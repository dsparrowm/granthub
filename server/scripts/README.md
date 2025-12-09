# Admin User Scripts

This directory contains scripts for managing admin users in your application.

## Appwrite Admin Script

### Script: `create-admin-appwrite.js`

This script allows you to make an existing user an admin in Appwrite.

### Prerequisites

1. Install node-appwrite package:
   ```bash
   npm install node-appwrite
   ```

2. You'll need:
   - Appwrite API Key with `users.write` permission
   - Your Database ID
   - Your Users Collection ID

### How to Get an API Key

1. Go to your Appwrite Console
2. Navigate to your Project
3. Go to **Settings** → **API Keys**
4. Click **Create API Key**
5. Give it a name (e.g., "Admin Management")
6. Under **Scopes**, enable:
   - `databases.read`
   - `databases.write`
7. Click **Create**
8. Copy the generated API key (you won't be able to see it again!)

### Usage

Run the script using Node.js:

```bash
node server/scripts/create-admin-appwrite.js
```

The script will prompt you for:
1. Appwrite Endpoint (or use env var `VITE_APPWRITE_ENDPOINT`)
2. Project ID (or use env var `VITE_APPWRITE_PROJECT_ID`)
3. API Key (required - paste the API key you created)
4. Database ID (or use env var `VITE_APPWRITE_DATABASE_ID`)
5. Users Collection ID (or use env var `VITE_APPWRITE_COLLECTION_USERS`)
6. User email to make admin

### Environment Variables (Optional)

You can set these environment variables to avoid entering them each time:

```bash
export VITE_APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
export VITE_APPWRITE_PROJECT_ID="your-project-id"
export VITE_APPWRITE_DATABASE_ID="your-database-id"
export VITE_APPWRITE_COLLECTION_USERS="your-users-collection-id"
```

Or use a .env file and load it with dotenv.

## Legacy Scripts (Prisma/SQL)

- `create-admin.js` - Creates a new admin user (Prisma/SQL only)
- `make-user-admin.js` - Makes existing user admin (Prisma/SQL only)

**Note:** These legacy scripts only work if you're using a Prisma/SQL database backend. They won't work with Appwrite.
