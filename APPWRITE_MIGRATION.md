# Appwrite Migration Guide

This guide will help you complete the migration from the Express.js backend to Appwrite.

## What Has Been Done

✅ **Completed Steps:**
1. Installed Appwrite SDK
2. Created Appwrite configuration (`src/lib/appwrite.ts`)
3. Defined complete database schema (`appwrite-schema.md`)
4. Implemented service layer for all backend operations:
   - `src/services/appwrite/auth.service.ts` - Authentication
   - `src/services/appwrite/applications.service.ts` - Application management
   - `src/services/appwrite/grants.service.ts` - Grant management
   - `src/services/appwrite/users.service.ts` - User management
5. Migrated AuthContext to use Appwrite
6. Updated all pages to use Appwrite services:
   - Profile.tsx
   - Index.tsx
   - Grants.tsx
   - GrantDetail.tsx
   - Apply.tsx
   - AdminDashboard.tsx

## What You Need to Do

### 1. Set Up Appwrite Project

1. **Create an Appwrite account** at https://cloud.appwrite.io (or self-host)

2. **Create a new project** in the Appwrite console

3. **Create a database** with the following collections:

#### Users Collection
```
Collection ID: users
Attributes:
- email (string, 255, required)
- name (string, 255, required)
- organization (string, 255, optional)
- role (string, 50, default: "user") - enum: user, admin
- phone (string, 20, optional)
- createdAt (datetime, required)

Indexes:
- email_idx (key: email, type: key, order: ASC)
- role_idx (key: role, type: key, order: ASC)

Permissions:
- Role: Any - Create
- Role: Users - Read (own documents)
- Role: Admins - All permissions
```

#### Grants Collection
```
Collection ID: grants
Attributes:
- title (string, 255, required)
- description (string, 5000, required)
- organization (string, 255, required)
- category (string, 100, required)
- amount (integer, required)
- amount_min (integer, optional)
- amount_max (integer, optional)
- deadline (datetime, required)
- location (string, 255, required)
- eligibility (string, 2000, optional) - JSON array stored as string
- requirements (string, 2000, optional) - JSON array stored as string
- isActive (boolean, default: true)
- createdAt (datetime, required)

Indexes:
- category_idx (key: category, type: key, order: ASC)
- deadline_idx (key: deadline, type: key, order: ASC)
- isActive_idx (key: isActive, type: key, order: ASC)

Permissions:
- Role: Any - Read (for active grants)
- Role: Admins - All permissions
```

#### Applications Collection
```
Collection ID: applications
Attributes:
- userId (string, 255, required)
- grantId (string, 255, required)
- applicantName (string, 255, required)
- email (string, 255, required)
- organization (string, 255, optional)
- annualIncome (string, 100, optional)
- projectTitle (string, 255, required)
- projectDescription (string, 5000, required)
- requestedAmount (float, required)
- status (string, 50, default: "submitted") - enum: submitted, under_review, approved, rejected
- reviewNotes (string, 2000, optional)
- submittedAt (datetime, required)
- reviewedAt (datetime, optional)

Indexes:
- userId_idx (key: userId, type: key, order: ASC)
- grantId_idx (key: grantId, type: key, order: ASC)
- status_idx (key: status, type: key, order: ASC)
- submittedAt_idx (key: submittedAt, type: key, order: DESC)

Permissions:
- Role: Users - Create
- Role: Users - Read (own documents)
- Role: Admins - All permissions
```

4. **Create a storage bucket** for document uploads:
```
Bucket ID: documents
Max File Size: 10MB
Allowed File Extensions: pdf, jpg, jpeg, png, doc, docx
Permissions:
- Role: Users - Create, Read (own files)
- Role: Admins - All permissions
```

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your Appwrite credentials:
   ```env
   VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   VITE_APPWRITE_PROJECT_ID=your_actual_project_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_USERS_COLLECTION_ID=users
   VITE_APPWRITE_APPLICATIONS_COLLECTION_ID=applications
   VITE_APPWRITE_GRANTS_COLLECTION_ID=grants
   VITE_APPWRITE_DOCUMENTS_BUCKET_ID=documents
   ```

### 3. Seed Initial Data (Optional)

If you want to populate your database with sample grants, you can:

1. Use the Appwrite console to manually create grant documents
2. Or create a seed script using the grants service:

```typescript
import { createGrant } from '@/services/appwrite/grants.service';

// Example grant data
const sampleGrant = {
  title: "Small Business Innovation Grant",
  description: "Support for innovative small businesses...",
  organization: "State Business Development",
  category: "Business",
  amount: 50000,
  amount_min: 10000,
  amount_max: 100000,
  deadline: new Date('2024-12-31'),
  location: "California",
  eligibility: ["Must be a registered business", "Annual revenue under $2M"],
  requirements: ["Business plan", "Financial statements"],
  isActive: true
};

await createGrant(sampleGrant);
```

### 4. Test the Application

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Test authentication flow:**
   - Sign up a new user
   - Log in
   - Log out

3. **Test grant browsing:**
   - View grants list
   - View grant details
   - Search and filter grants

4. **Test application submission:**
   - Apply for a grant
   - View your applications in profile

5. **Test admin features** (if you create an admin user):
   - View all applications
   - Update application status
   - View all users

### 5. Create Admin User

Since Appwrite doesn't have a built-in admin user, you need to:

1. Sign up normally through the app
2. Go to your Appwrite console
3. Navigate to Databases → Your Database → users collection
4. Find your user document
5. Edit the `role` attribute and change it from "user" to "admin"

## Key Differences from Express Backend

### Authentication
- **Before:** JWT tokens stored in localStorage
- **After:** Appwrite session cookies (managed automatically)
- **Impact:** No need to manually pass tokens around

### API Calls
- **Before:** `fetch()` calls to Express endpoints with Authorization headers
- **After:** Direct Appwrite SDK calls through service layer
- **Impact:** Simpler code, better type safety

### Data Structure
- **Before:** MongoDB-style documents with `_id`
- **After:** Appwrite documents with `$id`, `$createdAt`, etc.
- **Impact:** Service layer handles this transformation

### File Uploads
- **Before:** Multer middleware on Express
- **After:** Appwrite Storage SDK
- **Impact:** Built-in features like image thumbnails, compression

## Troubleshooting

### "Appwrite configuration is missing"
- Make sure all environment variables are set in `.env`
- Restart the dev server after changing `.env`

### "User (role: guests) missing scope (account)"
- User needs to be authenticated
- Check that login/signup is working correctly

### "Document with the requested ID could not be found"
- Make sure collection IDs in `.env` match your Appwrite console
- Verify documents exist in the database

### "Invalid API key"
- Check that your project ID is correct
- Verify endpoint URL matches your Appwrite instance

## Migration Checklist

- [ ] Appwrite project created
- [ ] Database and collections created with proper schema
- [ ] Storage bucket created
- [ ] Environment variables configured
- [ ] Dev server starts without errors
- [ ] User signup works
- [ ] User login works
- [ ] Grants display correctly
- [ ] Grant application submission works
- [ ] Profile shows user applications
- [ ] Admin dashboard shows all applications (for admin users)
- [ ] Admin can update application status

## Next Steps

Once everything is working:

1. **Remove old backend code** (Express server files)
2. **Update deployment configuration** to only deploy the React frontend
3. **Configure production environment variables** in your hosting service
4. **Set up Appwrite production instance** if using self-hosted
5. **Update documentation** with new API structure

## Support

- Appwrite Documentation: https://appwrite.io/docs
- Appwrite Discord: https://appwrite.io/discord
- Project issues: Create an issue in the repository
