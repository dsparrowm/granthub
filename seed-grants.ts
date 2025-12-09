import { Client, Databases, ID } from 'appwrite';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Appwrite client
const client = new Client();

const endpoint = process.env.VITE_APPWRITE_ENDPOINT || 'https://sfo.cloud.appwrite.io/v1';
const projectId = process.env.VITE_APPWRITE_PROJECT_ID || '6931d6b4001d87134ad8';
const databaseId = process.env.VITE_APPWRITE_DATABASE_ID || '6931dde90030d25b4261';
const apiKey = process.env.APPWRITE_API_KEY; // Server-side API key

if (!apiKey) {
    console.error('ERROR: APPWRITE_API_KEY environment variable is required!');
    console.error('To get an API key:');
    console.error('1. Go to Appwrite Console → Your Project → Settings → API Keys');
    console.error('2. Create a new API key with "databases.write" scope');
    console.error('3. Add it to your .env file: APPWRITE_API_KEY=your_key_here');
    process.exit(1);
}

client
    .setEndpoint(endpoint)
    .setProject(projectId);

// For server-side operations, we need to set the API key in headers
if (apiKey) {
    // @ts-ignore - Adding custom header for API key
    client.headers['X-Appwrite-Key'] = apiKey;
}

const databases = new Databases(client);

// Sample grants data
const sampleGrants = [
    {
        title: "Small Business Innovation Grant",
        description: "Support innovative small businesses in developing new products and services. This grant provides funding for research and development, prototype creation, and market testing.",
        organization: "State Economic Development",
        category: "Business",
        amount: 50000,
        amountMin: 10000,
        deadline: new Date('2025-12-31').toISOString(),
        location: "California",
        eligibility: JSON.stringify([
            "Must be a registered business",
            "Annual revenue under $2M",
            "Operating for at least 1 year"
        ]),
        requirements: JSON.stringify([
            "Business plan",
            "Financial statements",
            "Project proposal"
        ]),
        isActive: true,
        createdAt: new Date().toISOString(),
    },
    {
        title: "Educational Technology Grant",
        description: "Funding for schools and educational institutions to implement innovative technology solutions in the classroom.",
        organization: "Department of Education",
        category: "Education",
        amount: 75000,
        amountMin: 25000,
        deadline: new Date('2025-11-30').toISOString(),
        location: "Nationwide",
        eligibility: JSON.stringify([
            "Registered educational institution",
            "Serving K-12 students",
            "Non-profit status"
        ]),
        requirements: JSON.stringify([
            "Implementation plan",
            "Budget breakdown",
            "Student impact assessment"
        ]),
        isActive: true,
        createdAt: new Date().toISOString(),
    },
    {
        title: "Community Health Initiative",
        description: "Support community-based health programs focusing on preventive care and wellness education.",
        organization: "Health & Human Services",
        category: "Healthcare",
        amount: 100000,
        amountMin: 50000,
        deadline: new Date('2026-01-15').toISOString(),
        location: "Urban Areas",
        eligibility: JSON.stringify([
            "Non-profit organization",
            "3+ years in operation",
            "Serving underserved communities"
        ]),
        requirements: JSON.stringify([
            "Program proposal",
            "Community needs assessment",
            "Partnership letters"
        ]),
        isActive: true,
        createdAt: new Date().toISOString(),
    },
    {
        title: "Arts & Culture Preservation Grant",
        description: "Funding to preserve and promote local arts, cultural heritage, and community creative programs.",
        organization: "National Endowment for the Arts",
        category: "Arts",
        amount: 30000,
        amountMin: 5000,
        deadline: new Date('2025-10-31').toISOString(),
        location: "Nationwide",
        eligibility: JSON.stringify([
            "Arts organization or collective",
            "Tax-exempt status",
            "Community engagement focus"
        ]),
        requirements: JSON.stringify([
            "Project description",
            "Budget",
            "Community impact statement"
        ]),
        isActive: true,
        createdAt: new Date().toISOString(),
    },
    {
        title: "Green Energy Innovation Fund",
        description: "Support renewable energy projects and sustainable technology development for businesses and communities.",
        organization: "Environmental Protection Agency",
        category: "Environment",
        amount: 150000,
        amountMin: 50000,
        deadline: new Date('2026-02-28').toISOString(),
        location: "Nationwide",
        eligibility: JSON.stringify([
            "Registered business or non-profit",
            "Focus on renewable energy",
            "Environmental impact assessment"
        ]),
        requirements: JSON.stringify([
            "Technical proposal",
            "Environmental impact study",
            "Financial projections"
        ]),
        isActive: true,
        createdAt: new Date().toISOString(),
    },
];

async function seedGrants() {
    console.log('Starting grant seeding...');
    console.log(`Endpoint: ${endpoint}`);
    console.log(`Project: ${projectId}`);
    console.log(`Database: ${databaseId}`);

    let successCount = 0;
    let errorCount = 0;

    for (const grant of sampleGrants) {
        try {
            const response = await databases.createDocument(
                databaseId,
                'grants',
                ID.unique(),
                grant
            );
            console.log(`✓ Created grant: ${grant.title}`);
            successCount++;
        } catch (error: any) {
            console.error(`✗ Failed to create grant: ${grant.title}`);
            console.error(`  Error: ${error.message}`);
            errorCount++;
        }
    }

    console.log('\n=== Seeding Complete ===');
    console.log(`Success: ${successCount}`);
    console.log(`Errors: ${errorCount}`);
}

// Run the seed function
seedGrants().catch(console.error);
