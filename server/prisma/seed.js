const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const sampleGrants = [
    {
        id: '1',
        title: 'Small Business Innovation Grant',
        description: 'Support for innovative small businesses to develop new products or services. This grant provides funding for research, development, and market testing.',
        amount: 5000000, // $50,000 in cents
        deadline: new Date('2024-12-31'),
        eligibility: [
            'Must be a registered small business',
            'Annual revenue under $1M',
            'Developing an innovative product or service',
            'Based in the United States'
        ],
        category: 'Business',
        organization: 'Small Business Administration',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800'
    },
    {
        id: '2',
        title: 'Education Technology Grant',
        description: 'Funding for educational institutions to implement technology solutions that enhance learning outcomes and student engagement.',
        amount: 2500000, // $25,000 in cents
        deadline: new Date('2024-11-30'),
        eligibility: [
            'Must be an accredited educational institution',
            'Serving K-12 or higher education',
            'Clear implementation plan',
            'Demonstrated technology need'
        ],
        category: 'Education',
        organization: 'Department of Education',
        imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800'
    },
    {
        id: '3',
        title: 'Community Development Grant',
        description: 'Support for nonprofit organizations working to improve community infrastructure, services, and quality of life.',
        amount: 7500000, // $75,000 in cents
        deadline: new Date('2025-01-15'),
        eligibility: [
            'Must be a registered 501(c)(3) nonprofit',
            'Serving a defined community',
            'At least 2 years of operation',
            'Clear community impact plan'
        ],
        category: 'Community',
        organization: 'Community Development Foundation',
        imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800'
    },
    {
        id: '4',
        title: 'Research & Development Grant',
        description: 'Funding for scientific research projects with potential for significant impact in healthcare, environment, or technology.',
        amount: 10000000, // $100,000 in cents
        deadline: new Date('2025-02-28'),
        eligibility: [
            'Must have a PhD or equivalent research credentials',
            'Affiliated with a research institution',
            'Novel research approach',
            'Clear methodology and timeline'
        ],
        category: 'Research',
        organization: 'National Science Foundation',
        imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800'
    },
    {
        id: '5',
        title: 'Arts & Culture Grant',
        description: 'Support for artists, cultural organizations, and creative projects that enrich community cultural life.',
        amount: 1500000, // $15,000 in cents
        deadline: new Date('2024-12-15'),
        eligibility: [
            'Individual artist or arts organization',
            'Demonstrated artistic merit',
            'Community engagement component',
            'Budget and project timeline'
        ],
        category: 'Arts',
        organization: 'National Endowment for the Arts',
        imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800'
    },
    {
        id: '6',
        title: 'Environmental Sustainability Grant',
        description: 'Funding for projects focused on environmental conservation, renewable energy, or sustainable practices.',
        amount: 5000000, // $50,000 in cents
        deadline: new Date('2025-03-31'),
        eligibility: [
            'Environmental focus',
            'Measurable sustainability impact',
            'Implementation plan',
            'Community or organizational support'
        ],
        category: 'Environment',
        organization: 'Environmental Protection Agency',
        imageUrl: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=800'
    }
];

async function main() {
    console.log('Starting database seed...');

    try {
        // Clear existing data (optional - comment out if you want to keep existing data)
        await prisma.application.deleteMany();
        await prisma.grant.deleteMany();
        await prisma.user.deleteMany();
        console.log('Cleared existing data');

        // Create grants
        for (const grant of sampleGrants) {
            await prisma.grant.create({
                data: grant
            });
            console.log(`Created grant: ${grant.title}`);
        }

        console.log('\nSeed completed successfully!');
        console.log(`Created ${sampleGrants.length} grants`);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
