import { useAuth } from "@/contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export interface Application {
    id: string;
    grantId: string;
    userId: string;
    applicantName: string;
    email: string;
    organization: string;
    projectTitle: string;
    projectDescription: string;
    requestedAmount: number;
    applicationFeeCents: number;
    status: string;
    submittedAt: string;
    grant: {
        title: string;
        organization: string;
        amount: number;
    };
}

export const fetchUserApplications = async (token: string): Promise<Application[]> => {
    try {
        const response = await fetch(`${API_URL}/api/applications/my`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch applications");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching user applications:", error);
        throw error;
    }
};
