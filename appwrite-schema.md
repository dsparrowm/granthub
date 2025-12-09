# Appwrite Database Schema

This document outlines the database structure for the GrantHub application in Appwrite.

## Database: GrantHub

### Collection: Users
**Collection ID**: `users`

**Note**: The document ID (`$id`) will be set to match the Appwrite account ID, so no separate `userId` field is needed.

| Attribute | Type | Size | Required | Array | Default |
|-----------|------|------|----------|-------|---------|
| email | email | 255 | Yes | No | - |
| name | string | 255 | Yes | No | - |
| organization | string | 255 | No | No | - |
| role | enum | - | Yes | No | applicant |

**Role enum values**: `applicant`, `admin`

**Indexes**:
- `email` - unique
- `role` - key

**Permissions**:
- Create: Users
- Read: Users (own documents)
- Update: Users (own documents)
- Delete: None

---

### Collection: Applications
**Collection ID**: `applications`

| Attribute | Type | Size | Required | Array | Default |
|-----------|------|------|----------|-------|---------|
| grantId | string | 255 | Yes | No | - |
| userId | string | 255 | Yes | No | - |
| applicantName | string | 255 | Yes | No | - |
| email | email | 255 | Yes | No | - |
| organization | string | 255 | No | No | - |
| projectTitle | string | 500 | Yes | No | - |
| projectDescription | string | 5000 | Yes | No | - |
| requestedAmount | integer | - | Yes | No | - |
| applicationFeeCents | integer | - | Yes | No | - |
| status | enum | - | Yes | No | pending |
| submittedAt | datetime | - | Yes | No | now() |
| reviewedAt | datetime | - | No | No | - |
| reviewNotes | string | 2000 | No | No | - |

**Enum Values**:
- status: `pending`, `under_review`, `approved`, `rejected`

**Indexes**:
- `userId` - key
- `grantId` - key
- `status` - key
- `submittedAt` - key

**Permissions**:
- Create: Users
- Read: Users (own documents), Admin (any)
- Update: Admin (any)
- Delete: Admin (any)

---

### Collection: Grants
**Collection ID**: `grants`

| Attribute | Type | Size | Required | Array | Default |
|-----------|------|------|----------|-------|---------|
| title | string | 500 | Yes | No | - |
| organization | string | 255 | Yes | No | - |
| amount | string | 100 | Yes | No | - |
| amountMin | integer | - | No | No | - |
| amountMax | integer | - | No | No | - |
| deadline | string | 100 | Yes | No | - |
| location | string | 255 | Yes | No | - |
| category | string | 100 | Yes | No | - |
| description | string | 1000 | Yes | No | - |
| fullDescription | string | 5000 | No | No | - |
| eligibility | string | 5000 | No | Yes | - |
| requirements | string | 5000 | No | Yes | - |
| benefits | string | 5000 | No | Yes | - |
| isActive | boolean | - | Yes | No | true |
| createdAt | datetime | - | Yes | No | now() |

**Indexes**:
- `category` - key
- `location` - key
- `isActive` - key
- `deadline` - key

**Permissions**:
- Create: Admin
- Read: Any
- Update: Admin
- Delete: Admin

---

## Storage Buckets

### Bucket: Documents
**Bucket ID**: `documents`

**Purpose**: Store application-related documents (PDFs, images, etc.)

**Settings**:
- Max file size: 10MB
- Allowed file extensions: pdf, doc, docx, jpg, jpeg, png
- Encryption: Enabled
- Antivirus: Enabled

**Permissions**:
- Create: Users
- Read: Users (own files), Admin (any)
- Update: Users (own files), Admin (any)
- Delete: Users (own files), Admin (any)

---

## Setup Instructions

### 1. Create Project
1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Create a new project named "GrantHub"
3. Copy the Project ID

### 2. Create Database
1. Navigate to Databases
2. Create a new database named "GrantHub"
3. Copy the Database ID

### 3. Create Collections
For each collection above:
1. Create the collection with the specified ID
2. Add all attributes as defined
3. Create indexes
4. Configure permissions

### 4. Create Storage Bucket
1. Navigate to Storage
2. Create bucket "documents"
3. Configure file size limits and allowed extensions
4. Set permissions

### 5. Configure Environment Variables
Add to `.env`:
```
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_USERS=users
VITE_APPWRITE_COLLECTION_APPLICATIONS=applications
VITE_APPWRITE_COLLECTION_GRANTS=grants
VITE_APPWRITE_BUCKET_DOCUMENTS=documents
```

### 6. Seed Initial Data
Use the Appwrite Console or API to add initial grant data from `src/services/grantsData.ts`
