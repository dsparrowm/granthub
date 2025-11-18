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
        amount: "$50,000 - $100,000",
        amount_min: 50000,
        amount_max: 100000,
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
        title: "Small Business Growth Fund",
        organization: "Economic Development Agency",
        amount: "$25,000",
        amount_min: 25000,
        amount_max: 25000,
        deadline: "Nov 15, 2025",
        location: "Global",
        category: "Business",
        description: "Empowering small businesses to scale and create jobs in their communities.",
        fullDescription: "The Small Business Growth Fund provides capital to established small businesses ready to expand operations, hire new employees, and increase their market presence.",
        eligibility: [
            "Operating business for at least 1 year",
            "Clear growth plan",
            "Positive revenue history",
            "Job creation commitment",
        ],
        requirements: [
            "Business registration documents",
            "Financial statements (last 2 years)",
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
        amount: "$75,000",
        amount_min: 75000,
        amount_max: 75000,
        deadline: "Jan 20, 2026",
        location: "Worldwide",
        category: "Social Good",
        description: "Funding projects that create positive social change and community development.",
        fullDescription: "This initiative supports projects addressing social challenges such as poverty, education inequality, healthcare access, and community development.",
        eligibility: [
            "Non-profit or social enterprise",
            "Clear social impact mission",
            "Measurable outcomes",
            "Community support",
        ],
        requirements: [
            "Project proposal",
            "Impact measurement plan",
            "Budget breakdown",
            "Community letters of support",
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
        amount: "$100,000",
        amount_min: 100000,
        amount_max: 100000,
        deadline: "Feb 28, 2026",
        location: "Europe",
        category: "Environment",
        description: "Supporting renewable energy projects and sustainable solutions for climate change.",
        fullDescription: "Funding for innovative renewable energy projects, sustainable technology development, and environmental conservation initiatives.",
        eligibility: [
            "Focus on renewable energy or sustainability",
            "Environmental impact assessment",
            "Technical feasibility demonstrated",
            "Based in or serving European markets",
        ],
        requirements: [
            "Technical project proposal",
            "Environmental impact report",
            "Budget and timeline",
            "Team qualifications",
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
        amount: "$60,000",
        amount_min: 60000,
        amount_max: 60000,
        deadline: "Dec 15, 2025",
        location: "United States",
        category: "Healthcare",
        description: "Advancing healthcare technology and improving patient outcomes through innovation.",
        fullDescription: "Supporting healthcare innovations that improve patient care, reduce costs, or increase access to quality healthcare services.",
        eligibility: [
            "Healthcare-focused innovation",
            "Clear patient benefit",
            "Regulatory compliance path",
            "Medical advisory board",
        ],
        requirements: [
            "Clinical validation data",
            "Regulatory strategy",
            "Business model",
            "Team credentials",
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
        title: "Education Excellence Grant",
        organization: "Education First Foundation",
        amount: "$40,000",
        amount_min: 40000,
        amount_max: 40000,
        deadline: "Nov 30, 2025",
        location: "Global",
        category: "Education",
        description: "Supporting educational initiatives that improve learning outcomes and accessibility.",
        fullDescription: "Funding for innovative educational programs, technology platforms, or initiatives that increase access to quality education.",
        eligibility: [
            "Education-focused mission",
            "Demonstrated impact on learning",
            "Scalability potential",
            "Educator involvement",
        ],
        requirements: [
            "Program description",
            "Impact metrics",
            "Implementation plan",
            "Letters from educators",
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
