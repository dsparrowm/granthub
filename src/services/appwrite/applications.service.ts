import { databases, DATABASE_ID, COLLECTIONS, ID } from '@/lib/appwrite';
import { Query, Permission, Role } from 'appwrite';

export interface Application {
    id: string;
    grantId: string;
    userId: string;
    applicantName: string;
    email: string;
    organization: string;
    annualIncome?: string;
    projectTitle: string;
    projectDescription: string;
    requestedAmount: number;
    applicationFeeCents: number;
    feeAmount?: number;
    feeStatus?: 'pending' | 'processing' | 'paid';
    status: 'pending' | 'under_review' | 'approved' | 'rejected';
    submittedAt: string;
    reviewedAt?: string;
    reviewNotes?: string;
    grant?: {
        title: string;
        organization: string;
        amount: string | number;
    };
    user?: {
        name: string;
        email: string;
    };
}

export interface CreateApplicationData {
    grantId: string;
    userId: string;
    applicantName: string;
    email: string;
    organization: string;
    projectTitle: string;
    projectDescription: string;
    requestedAmount: number;
    annualIncome?: string;
    applicationFeeCents?: number;
}

/**
 * Create a new grant application
 */
export const createApplication = async (data: CreateApplicationData): Promise<Application> => {
    try {
        // Destructure to exclude applicationFeeCents which doesn't exist in DB schema
        const { applicationFeeCents, ...applicationData } = data;

        const doc = await databases.createDocument(
            DATABASE_ID,
            COLLECTIONS.APPLICATIONS,
            ID.unique(),
            {
                ...applicationData,
                status: 'pending',
                submittedAt: new Date().toISOString(),
            },
            [
                // Allow the user who created it to read, update, and delete
                Permission.read(Role.user(data.userId)),
                Permission.update(Role.user(data.userId)),
                Permission.delete(Role.user(data.userId)),
                // Allow any authenticated user to read (for admin dashboard)
                Permission.read(Role.users()),
                Permission.update(Role.users()),
            ]
        );

        return {
            id: doc.$id,
            grantId: doc.grantId,
            userId: doc.userId,
            applicantName: doc.applicantName,
            email: doc.email,
            organization: doc.organization,
            projectTitle: doc.projectTitle,
            projectDescription: doc.projectDescription,
            requestedAmount: doc.requestedAmount,
            applicationFeeCents: doc.applicationFeeCents,
            status: doc.status,
            submittedAt: doc.submittedAt,
            reviewedAt: doc.reviewedAt,
            reviewNotes: doc.reviewNotes,
        };
    } catch (error: any) {
        console.error('Create application error:', error);
        throw new Error(error.message || 'Failed to create application');
    }
};

/**
 * Get applications for current user
 */
export const getUserApplications = async (userId: string): Promise<Application[]> => {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.APPLICATIONS,
            [
                Query.equal('userId', userId),
                Query.orderDesc('submittedAt'),
            ]
        );

        // Fetch grant details for each application
        const applicationsWithGrants = await Promise.all(
            response.documents.map(async (doc) => {
                try {
                    const grant = await databases.getDocument(
                        DATABASE_ID,
                        COLLECTIONS.GRANTS,
                        doc.grantId
                    );

                    return {
                        id: doc.$id,
                        grantId: doc.grantId,
                        userId: doc.userId,
                        applicantName: doc.applicantName,
                        email: doc.email,
                        organization: doc.organization,
                        projectTitle: doc.projectTitle,
                        projectDescription: doc.projectDescription,
                        requestedAmount: doc.requestedAmount,
                        applicationFeeCents: doc.applicationFeeCents,
                        status: doc.status,
                        submittedAt: doc.submittedAt,
                        reviewedAt: doc.reviewedAt,
                        reviewNotes: doc.reviewNotes,
                        grant: {
                            title: grant.title,
                            organization: grant.organization,
                            amount: grant.amount,
                        },
                    };
                } catch {
                    return {
                        id: doc.$id,
                        grantId: doc.grantId,
                        userId: doc.userId,
                        applicantName: doc.applicantName,
                        email: doc.email,
                        organization: doc.organization,
                        projectTitle: doc.projectTitle,
                        projectDescription: doc.projectDescription,
                        requestedAmount: doc.requestedAmount,
                        applicationFeeCents: doc.applicationFeeCents,
                        status: doc.status,
                        submittedAt: doc.submittedAt,
                        reviewedAt: doc.reviewedAt,
                        reviewNotes: doc.reviewNotes,
                    };
                }
            })
        );

        return applicationsWithGrants;
    } catch (error: any) {
        console.error('Get user applications error:', error);
        throw new Error(error.message || 'Failed to fetch applications');
    }
};

/**
 * Get all applications (Admin only)
 */
export const getAllApplications = async (): Promise<Application[]> => {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.APPLICATIONS,
            [Query.orderDesc('submittedAt'), Query.limit(100)]
        );

        return response.documents.map((doc) => ({
            id: doc.$id,
            grantId: doc.grantId,
            userId: doc.userId,
            applicantName: doc.applicantName,
            email: doc.email,
            organization: doc.organization,
            projectTitle: doc.projectTitle,
            projectDescription: doc.projectDescription,
            requestedAmount: doc.requestedAmount,
            applicationFeeCents: doc.applicationFeeCents,
            status: doc.status,
            submittedAt: doc.submittedAt,
            reviewedAt: doc.reviewedAt,
            reviewNotes: doc.reviewNotes,
        }));
    } catch (error: any) {
        console.error('Get all applications error:', error);
        throw new Error(error.message || 'Failed to fetch applications');
    }
};

/**
 * Update application status (Admin only)
 */
export const updateApplicationStatus = async (
    applicationId: string,
    status: Application['status'],
    reviewNotes?: string
): Promise<Application> => {
    try {
        const doc = await databases.updateDocument(
            DATABASE_ID,
            COLLECTIONS.APPLICATIONS,
            applicationId,
            {
                status,
                reviewedAt: new Date().toISOString(),
                reviewNotes: reviewNotes || '',
            }
        );

        return {
            id: doc.$id,
            grantId: doc.grantId,
            userId: doc.userId,
            applicantName: doc.applicantName,
            email: doc.email,
            organization: doc.organization,
            projectTitle: doc.projectTitle,
            projectDescription: doc.projectDescription,
            requestedAmount: doc.requestedAmount,
            applicationFeeCents: doc.applicationFeeCents,
            status: doc.status,
            submittedAt: doc.submittedAt,
            reviewedAt: doc.reviewedAt,
            reviewNotes: doc.reviewNotes,
        };
    } catch (error: any) {
        console.error('Update application status error:', error);
        throw new Error(error.message || 'Failed to update application');
    }
};

/**
 * Get application by ID
 */
export const getApplicationById = async (applicationId: string): Promise<Application> => {
    try {
        const doc = await databases.getDocument(
            DATABASE_ID,
            COLLECTIONS.APPLICATIONS,
            applicationId
        );

        return {
            id: doc.$id,
            grantId: doc.grantId,
            userId: doc.userId,
            applicantName: doc.applicantName,
            email: doc.email,
            organization: doc.organization,
            projectTitle: doc.projectTitle,
            projectDescription: doc.projectDescription,
            requestedAmount: doc.requestedAmount,
            applicationFeeCents: doc.applicationFeeCents,
            status: doc.status,
            submittedAt: doc.submittedAt,
            reviewedAt: doc.reviewedAt,
            reviewNotes: doc.reviewNotes,
        };
    } catch (error: any) {
        console.error('Get application error:', error);
        throw new Error(error.message || 'Failed to fetch application');
    }
};
