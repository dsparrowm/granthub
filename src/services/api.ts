// Re-export Appwrite services for backwards compatibility
export {
    type Application,
    getUserApplications as fetchUserApplications,
    createApplication,
    getAllApplications,
    updateApplicationStatus,
    getApplicationById,
} from './appwrite/applications.service';

export {
    type User,
    getAllUsers,
    getUserById,
    updateUserRole,
    updateUserProfile,
} from './appwrite/users.service';

