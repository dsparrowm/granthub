import { account, databases, DATABASE_ID, COLLECTIONS, ID } from '@/lib/appwrite';
import { Models } from 'appwrite';

export interface User {
    id: string;
    email: string;
    name: string;
    organization?: string;
    role: 'applicant' | 'admin';
}

export interface SignupData {
    email: string;
    password: string;
    name: string;
    organization?: string;
}

/**
 * Create a new user account
 */
export const signup = async (data: SignupData): Promise<User> => {
    let accountId: string | null = null;

    try {
        // Create Appwrite account
        const accountResponse = await account.create(
            ID.unique(),
            data.email,
            data.password,
            data.name
        );

        accountId = accountResponse.$id;

        // Create user document in database with additional info
        const userDoc = await databases.createDocument(
            DATABASE_ID,
            COLLECTIONS.USERS,
            accountResponse.$id, // Use account ID as document ID
            {
                email: data.email,
                name: data.name,
                organization: data.organization || '',
                role: 'applicant',
            }
        );

        // Create email session automatically
        await account.createEmailPasswordSession(data.email, data.password);

        return {
            id: userDoc.$id,
            email: userDoc.email,
            name: userDoc.name,
            organization: userDoc.organization,
            role: userDoc.role,
        };
    } catch (error: any) {
        console.error('Signup error:', error);

        // If account was created but something else failed, try to clean up
        if (accountId && error.code !== 409) {
            try {
                // Login as the user to delete the account
                await account.createEmailPasswordSession(data.email, data.password);
                await account.deleteSession('current');
                // Note: We can't delete the account itself without admin API key
                console.warn('Account created but user document failed. Please delete account manually:', accountId);
            } catch (cleanupError) {
                console.error('Cleanup error:', cleanupError);
            }
        }

        throw new Error(error.message || 'Failed to create account');
    }
};

/**
 * Login with email and password
 */
export const login = async (email: string, password: string): Promise<User> => {
    try {
        console.log('[Auth] Login started for:', email);

        // Check if there's already an active session
        try {
            const existingSession = await account.get();
            if (existingSession) {
                console.log('[Auth] Found existing session, deleting it');
                // Delete existing session before creating new one
                await account.deleteSession('current');
                console.log('[Auth] Existing session deleted');
            }
        } catch (error) {
            console.log('[Auth] No existing session found');
            // No existing session, continue with login
        }

        // Create new session
        console.log('[Auth] Creating new session...');
        const session = await account.createEmailPasswordSession(email, password);
        console.log('[Auth] Session created:', { userId: session.userId, sessionId: session.$id });

        // Get user document from database
        try {
            console.log('[Auth] Fetching user document for userId:', session.userId);
            const userDoc = await databases.getDocument(
                DATABASE_ID,
                COLLECTIONS.USERS,
                session.userId
            );
            console.log('[Auth] User document fetched:', { role: userDoc.role, email: userDoc.email });

            return {
                id: userDoc.$id,
                email: userDoc.email,
                name: userDoc.name,
                organization: userDoc.organization,
                role: userDoc.role,
            };
        } catch (docError: any) {
            // If user document doesn't exist, create it
            if (docError.code === 404) {
                console.log('[Auth] User document not found, creating it...');
                const accountData = await account.get();

                const userDoc = await databases.createDocument(
                    DATABASE_ID,
                    COLLECTIONS.USERS,
                    accountData.$id,
                    {
                        email: accountData.email,
                        name: accountData.name,
                        organization: '',
                        role: 'applicant',
                    }
                );
                console.log('[Auth] User document created with role: applicant');

                return {
                    id: userDoc.$id,
                    email: userDoc.email,
                    name: userDoc.name,
                    organization: userDoc.organization,
                    role: userDoc.role,
                };
            }
            throw docError;
        }
    } catch (error: any) {
        console.error('[Auth] Login error:', error);
        throw new Error(error.message || 'Failed to login');
    }
};

/**
 * Get current logged-in user
 */
export const getCurrentUser = async (): Promise<User | null> => {
    try {
        const accountData = await account.get();

        // Get user document from database
        const userDoc = await databases.getDocument(
            DATABASE_ID,
            COLLECTIONS.USERS,
            accountData.$id
        );

        return {
            id: userDoc.$id,
            email: userDoc.email,
            name: userDoc.name,
            organization: userDoc.organization,
            role: userDoc.role,
        };
    } catch (error) {
        return null;
    }
};

/**
 * Logout current user
 */
export const logout = async (): Promise<void> => {
    try {
        await account.deleteSession('current');
    } catch (error: any) {
        console.error('Logout error:', error);
        throw new Error(error.message || 'Failed to logout');
    }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = async (): Promise<boolean> => {
    try {
        await account.get();
        return true;
    } catch {
        return false;
    }
};

/**
 * Get current session
 */
export const getSession = async (): Promise<Models.Session | null> => {
    try {
        return await account.getSession('current');
    } catch {
        return null;
    }
};
