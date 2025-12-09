// Centralized grants data - in production this would come from API
export interface Grant {
    id: string;
    title: string;
    organization: string;
    amount: string;
    amount_min?: number;
    amount_max?: number;
    deadline: string;
    location: string;
    category: string;
    description: string;
    fullDescription?: string;
    eligibility?: string[];
    requirements?: string[];
    benefits?: string[];
}

export const grantsData: Grant[] = [
    {
        id: "1",
        title: "Innovation Startup Grant",
        organization: "Tech Foundation",
        amount: "$500,000 - $1,000,000",
        amount_min: 500000,
        amount_max: 1000000,
        deadline: "Dec 31, 2025",
        location: "United States",
        category: "Technology",
        description: "Supporting innovative tech startups with groundbreaking ideas in AI, blockchain, and sustainable technology.",
        fullDescription: "The Innovation Startup Grant is designed to support early-stage technology companies that are developing groundbreaking solutions in artificial intelligence, blockchain technology, and sustainable tech. We believe in empowering entrepreneurs who are committed to making a positive impact through innovation.",
        eligibility: [
            "Registered startup less than 3 years old",
            "Technology-focused business model",
            "Clear innovation component",
            "Team of at least 2 founders",
            "Based in the United States",
        ],
        requirements: [
            "Detailed business plan",
            "Financial projections for 2 years",
            "Team member resumes",
            "Proof of company registration",
            "Pitch deck (max 15 slides)",
            "Letter of recommendation",
        ],
        benefits: [
            "Non-dilutive funding",
            "Mentorship from industry experts",
            "Access to investor network",
            "Marketing and PR support",
            "Co-working space access",
        ],
    },
    {
        id: "2",
        title: "Business Scale-Up Fund",
        organization: "Economic Development Agency",
        amount: "$250,000 - $500,000",
        amount_min: 250000,
        amount_max: 500000,
        deadline: "Nov 15, 2025",
        location: "Global",
        category: "Business",
        description: "Empowering businesses to scale operations, expand market presence, and create jobs in their communities.",
        fullDescription: "The Business Scale-Up Fund provides substantial capital to established businesses ready to significantly expand operations, hire new employees, and increase their market presence nationally or internationally.",
        eligibility: [
            "Operating business for at least 2 years",
            "Clear growth plan",
            "Positive revenue history",
            "Job creation commitment",
        ],
        requirements: [
            "Business registration documents",
            "Financial statements (last 3 years)",
            "Growth plan and projections",
            "Current employee roster",
        ],
        benefits: [
            "Growth capital",
            "Business development support",
            "Networking opportunities",
            "Marketing assistance",
        ],
    },
    {
        id: "3",
        title: "Social Impact Initiative",
        organization: "Global Impact Fund",
        amount: "$750,000 - $1,500,000",
        amount_min: 750000,
        amount_max: 1500000,
        deadline: "Jan 20, 2026",
        location: "Worldwide",
        category: "Social Good",
        description: "Funding large-scale projects that create transformative social change and community development.",
        fullDescription: "This initiative supports major projects addressing social challenges such as poverty, education inequality, healthcare access, and community development with measurable, sustainable impact.",
        eligibility: [
            "Non-profit or social enterprise",
            "Clear social impact mission",
            "Measurable outcomes",
            "Community support",
            "Track record of successful programs",
        ],
        requirements: [
            "Comprehensive project proposal",
            "Impact measurement plan",
            "Detailed budget breakdown",
            "Community letters of support",
            "Organizational financial statements",
        ],
        benefits: [
            "Project funding",
            "Impact measurement tools",
            "Community of practice",
            "Visibility and recognition",
        ],
    },
    {
        id: "4",
        title: "Green Energy Grant",
        organization: "Environmental Coalition",
        amount: "$1,000,000 - $2,500,000",
        amount_min: 1000000,
        amount_max: 2500000,
        deadline: "Feb 28, 2026",
        location: "Europe",
        category: "Environment",
        description: "Supporting large-scale renewable energy projects and sustainable solutions for climate change.",
        fullDescription: "Funding for major renewable energy projects, sustainable technology development, and environmental conservation initiatives with significant environmental impact potential.",
        eligibility: [
            "Focus on renewable energy or sustainability",
            "Environmental impact assessment",
            "Technical feasibility demonstrated",
            "Based in or serving European markets",
            "Proven technical team",
        ],
        requirements: [
            "Technical project proposal",
            "Environmental impact report",
            "Detailed budget and timeline",
            "Team qualifications",
            "Engineering feasibility study",
        ],
        benefits: [
            "Project funding",
            "Technical advisory support",
            "Industry connections",
            "Media exposure",
        ],
    },
    {
        id: "5",
        title: "Healthcare Innovation Fund",
        organization: "Health Alliance",
        amount: "$600,000 - $1,200,000",
        amount_min: 600000,
        amount_max: 1200000,
        deadline: "Dec 15, 2025",
        location: "United States",
        category: "Healthcare",
        description: "Advancing healthcare technology and improving patient outcomes through major innovation initiatives.",
        fullDescription: "Supporting significant healthcare innovations that improve patient care, reduce costs, or increase access to quality healthcare services at scale.",
        eligibility: [
            "Healthcare-focused innovation",
            "Clear patient benefit",
            "Regulatory compliance path",
            "Medical advisory board",
            "Clinical validation completed",
        ],
        requirements: [
            "Clinical validation data",
            "Regulatory strategy",
            "Business model",
            "Team credentials",
            "Market analysis",
        ],
        benefits: [
            "Development funding",
            "Clinical advisors",
            "Healthcare network access",
            "Regulatory guidance",
        ],
    },
    {
        id: "6",
        title: "Education Transformation Grant",
        organization: "Education First Foundation",
        amount: "$400,000 - $800,000",
        amount_min: 400000,
        amount_max: 800000,
        deadline: "Nov 30, 2025",
        location: "Global",
        category: "Education",
        description: "Supporting large-scale educational initiatives that transform learning outcomes and accessibility.",
        fullDescription: "Funding for major educational programs, technology platforms, or initiatives that increase access to quality education at scale with measurable impact.",
        eligibility: [
            "Education-focused mission",
            "Demonstrated impact on learning",
            "Scalability potential",
            "Educator involvement",
            "Proven track record",
        ],
        requirements: [
            "Comprehensive program description",
            "Impact metrics",
            "Implementation plan",
            "Letters from educators",
            "Budget and timeline",
        ],
        benefits: [
            "Program funding",
            "Educational resources",
            "Teacher network",
            "Curriculum support",
        ],
    },
];

export const getGrantById = (id: string): Grant | undefined => {
    return grantsData.find(grant => grant.id === id);
};

export const getAllGrants = (): Grant[] => {
    return grantsData;
};

// Appwrite integration functions (async versions)
// These can be used to fetch from Appwrite when backend is ready
export const getAllGrantsAsync = async (): Promise<Grant[]> => {
    // Check if Appwrite is configured
    const appwriteProjectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

    if (appwriteProjectId) {
        try {
            const { getAllGrants: getGrantsFromAppwrite } = await import('./appwrite/grants.service');
            return await getGrantsFromAppwrite();
        } catch (error) {
            console.warn('Appwrite not configured, falling back to local data:', error);
        }
    }

    // Fallback to local data
    return Promise.resolve(grantsData);
};

export const getGrantByIdAsync = async (id: string): Promise<Grant | undefined> => {
    const appwriteProjectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

    if (appwriteProjectId) {
        try {
            const { getGrantById: getGrantFromAppwrite } = await import('./appwrite/grants.service');
            return await getGrantFromAppwrite(id);
        } catch (error) {
            console.warn('Appwrite not configured, falling back to local data:', error);
        }
    }

    // Fallback to local data
    return Promise.resolve(grantsData.find(grant => grant.id === id));
};

