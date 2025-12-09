import { databases, DATABASE_ID, COLLECTIONS, ID } from '@/lib/appwrite';
import { Query } from 'appwrite';
import { Grant } from '@/services/grantsData';

/**
 * Get all active grants
 */
export const getAllGrants = async (): Promise<Grant[]> => {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.GRANTS,
            [
                Query.equal('isActive', true),
                Query.orderDesc('createdAt'),
                Query.limit(100),
            ]
        );

        return response.documents.map((doc) => ({
            id: doc.$id,
            title: doc.title,
            organization: doc.organization,
            amount: doc.amount,
            amount_min: doc.amountMin,
            amount_max: doc.amount_max,
            deadline: doc.deadline,
            location: doc.location,
            category: doc.category,
            description: doc.description,
            fullDescription: doc.description, // Use description as fullDescription
            eligibility: doc.eligibility ? JSON.parse(doc.eligibility) : [],
            requirements: doc.requirements ? JSON.parse(doc.requirements) : [],
            benefits: [], // Not in database yet
        }));
    } catch (error: any) {
        console.error('Get grants error:', error);
        throw new Error(error.message || 'Failed to fetch grants');
    }
};

/**
 * Get grant by ID
 */
export const getGrantById = async (grantId: string): Promise<Grant | undefined> => {
    try {
        const doc = await databases.getDocument(
            DATABASE_ID,
            COLLECTIONS.GRANTS,
            grantId
        );

        return {
            id: doc.$id,
            title: doc.title,
            organization: doc.organization,
            amount: doc.amount,
            amount_min: doc.amountMin,
            amount_max: doc.amount_max,
            deadline: doc.deadline,
            location: doc.location,
            category: doc.category,
            description: doc.description,
            fullDescription: doc.description, // Use description as fullDescription
            eligibility: doc.eligibility ? JSON.parse(doc.eligibility) : [],
            requirements: doc.requirements ? JSON.parse(doc.requirements) : [],
            benefits: [], // Not in database yet
        };
    } catch (error: any) {
        console.error('Get grant by ID error:', error);
        return undefined;
    }
};

/**
 * Create a new grant (Admin only)
 */
export const createGrant = async (grantData: Omit<Grant, 'id'>): Promise<Grant> => {
    try {
        const doc = await databases.createDocument(
            DATABASE_ID,
            COLLECTIONS.GRANTS,
            ID.unique(),
            {
                title: grantData.title,
                organization: grantData.organization,
                amount: grantData.amount,
                amountMin: grantData.amount_min || 0,
                amountMax: grantData.amount_max || 0,
                deadline: grantData.deadline,
                location: grantData.location,
                category: grantData.category,
                description: grantData.description,
                fullDescription: grantData.fullDescription || '',
                eligibility: grantData.eligibility || [],
                requirements: grantData.requirements || [],
                benefits: grantData.benefits || [],
                isActive: true,
                createdAt: new Date().toISOString(),
            }
        );

        return {
            id: doc.$id,
            title: doc.title,
            organization: doc.organization,
            amount: doc.amount,
            amount_min: doc.amountMin,
            amount_max: doc.amountMax,
            deadline: doc.deadline,
            location: doc.location,
            category: doc.category,
            description: doc.description,
            fullDescription: doc.fullDescription,
            eligibility: doc.eligibility || [],
            requirements: doc.requirements || [],
            benefits: doc.benefits || [],
        };
    } catch (error: any) {
        console.error('Create grant error:', error);
        throw new Error(error.message || 'Failed to create grant');
    }
};

/**
 * Update grant (Admin only)
 */
export const updateGrant = async (
    grantId: string,
    updates: Partial<Omit<Grant, 'id'>>
): Promise<Grant> => {
    try {
        const updateData: any = {};

        if (updates.title !== undefined) updateData.title = updates.title;
        if (updates.organization !== undefined) updateData.organization = updates.organization;
        if (updates.amount !== undefined) updateData.amount = updates.amount;
        if (updates.amount_min !== undefined) updateData.amountMin = updates.amount_min;
        if (updates.amount_max !== undefined) updateData.amountMax = updates.amount_max;
        if (updates.deadline !== undefined) updateData.deadline = updates.deadline;
        if (updates.location !== undefined) updateData.location = updates.location;
        if (updates.category !== undefined) updateData.category = updates.category;
        if (updates.description !== undefined) updateData.description = updates.description;
        if (updates.fullDescription !== undefined) updateData.fullDescription = updates.fullDescription;
        if (updates.eligibility !== undefined) updateData.eligibility = updates.eligibility;
        if (updates.requirements !== undefined) updateData.requirements = updates.requirements;
        if (updates.benefits !== undefined) updateData.benefits = updates.benefits;

        const doc = await databases.updateDocument(
            DATABASE_ID,
            COLLECTIONS.GRANTS,
            grantId,
            updateData
        );

        return {
            id: doc.$id,
            title: doc.title,
            organization: doc.organization,
            amount: doc.amount,
            amount_min: doc.amountMin,
            amount_max: doc.amountMax,
            deadline: doc.deadline,
            location: doc.location,
            category: doc.category,
            description: doc.description,
            fullDescription: doc.fullDescription,
            eligibility: doc.eligibility || [],
            requirements: doc.requirements || [],
            benefits: doc.benefits || [],
        };
    } catch (error: any) {
        console.error('Update grant error:', error);
        throw new Error(error.message || 'Failed to update grant');
    }
};

/**
 * Delete grant (Admin only)
 */
export const deleteGrant = async (grantId: string): Promise<void> => {
    try {
        // Soft delete by setting isActive to false
        await databases.updateDocument(
            DATABASE_ID,
            COLLECTIONS.GRANTS,
            grantId,
            { isActive: false }
        );
    } catch (error: any) {
        console.error('Delete grant error:', error);
        throw new Error(error.message || 'Failed to delete grant');
    }
};

/**
 * Search grants by category
 */
export const getGrantsByCategory = async (category: string): Promise<Grant[]> => {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.GRANTS,
            [
                Query.equal('isActive', true),
                Query.equal('category', category),
                Query.orderDesc('createdAt'),
            ]
        );

        return response.documents.map((doc) => ({
            id: doc.$id,
            title: doc.title,
            organization: doc.organization,
            amount: doc.amount,
            amount_min: doc.amountMin,
            amount_max: doc.amountMax,
            deadline: doc.deadline,
            location: doc.location,
            category: doc.category,
            description: doc.description,
            fullDescription: doc.fullDescription,
            eligibility: doc.eligibility || [],
            requirements: doc.requirements || [],
            benefits: doc.benefits || [],
        }));
    } catch (error: any) {
        console.error('Get grants by category error:', error);
        throw new Error(error.message || 'Failed to fetch grants');
    }
};
