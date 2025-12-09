import { databases, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';
import { Query } from 'appwrite';

export interface User {
    id: string;
    userId: string;
    email: string;
    name: string;
    organization?: string;
    role: 'applicant' | 'admin';
}

/**
 * Get all users (Admin only)
 */
export const getAllUsers = async (): Promise<User[]> => {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.USERS,
            [
                Query.limit(100),
            ]
        );

        return response.documents.map((doc) => ({
            id: doc.$id,
            userId: doc.userId,
            email: doc.email,
            name: doc.name,
            organization: doc.organization,
            role: doc.role,
        }));
    } catch (error: any) {
        console.error('Get all users error:', error);
        throw new Error(error.message || 'Failed to fetch users');
    }
};

/**
 * Get user by ID
 */
export const getUserById = async (userId: string): Promise<User | null> => {
    try {
        const doc = await databases.getDocument(
            DATABASE_ID,
            COLLECTIONS.USERS,
            userId
        );

        return {
            id: doc.$id,
            userId: doc.userId,
            email: doc.email,
            name: doc.name,
            organization: doc.organization,
            role: doc.role,
        };
    } catch (error: any) {
        console.error('Get user by ID error:', error);
        return null;
    }
};

/**
 * Update user role (Admin only)
 */
export const updateUserRole = async (
    userId: string,
    role: 'applicant' | 'admin'
): Promise<User> => {
    try {
        const doc = await databases.updateDocument(
            DATABASE_ID,
            COLLECTIONS.USERS,
            userId,
            { role }
        );

        return {
            id: doc.$id,
            userId: doc.userId,
            email: doc.email,
            name: doc.name,
            organization: doc.organization,
            role: doc.role,
        };
    } catch (error: any) {
        console.error('Update user role error:', error);
        throw new Error(error.message || 'Failed to update user role');
    }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (
    userId: string,
    updates: { name?: string; organization?: string }
): Promise<User> => {
    try {
        const doc = await databases.updateDocument(
            DATABASE_ID,
            COLLECTIONS.USERS,
            userId,
            updates
        );

        return {
            id: doc.$id,
            userId: doc.userId,
            email: doc.email,
            name: doc.name,
            organization: doc.organization,
            role: doc.role,
        };
    } catch (error: any) {
        console.error('Update user profile error:', error);
        throw new Error(error.message || 'Failed to update profile');
    }
};
