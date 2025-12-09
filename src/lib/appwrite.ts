import { Client, Account, Databases, Storage, ID } from 'appwrite';

// Initialize Appwrite client
const client = new Client();

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID || '';

client
    .setEndpoint(endpoint)
    .setProject(projectId);

// Initialize services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Export client for advanced usage
export { client, ID };

// Database and Collection IDs
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || '';
export const COLLECTIONS = {
    USERS: import.meta.env.VITE_APPWRITE_COLLECTION_USERS || '',
    APPLICATIONS: import.meta.env.VITE_APPWRITE_COLLECTION_APPLICATIONS || '',
    GRANTS: import.meta.env.VITE_APPWRITE_COLLECTION_GRANTS || '',
};

// Storage Bucket IDs
export const BUCKETS = {
    DOCUMENTS: import.meta.env.VITE_APPWRITE_BUCKET_DOCUMENTS || '',
};
