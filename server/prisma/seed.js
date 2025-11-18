const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const sampleGrants = [
    {
        id: '1',
        title: 'Innovation Startup Grant',
        description: 'Support for innovative tech startups with groundbreaking ideas in AI, blockchain, and sustainable technology. Designed for early-stage companies ready to scale.',
        amount: 75000000, // $750,000 in cents
        deadline: new Date('2025-12-31'),
        eligibility: [
            'Registered startup less than 3 years old',
            'Technology-focused business model',
            'Clear innovation component',
            'Team of at least 2 founders',
            'Based in the United States'
        ],
        category: 'Technology',
        organization: 'Tech Foundation',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800'
    },
    {
        id: '2',
        title: 'Business Scale-Up Fund',
        description: 'Empowering businesses to scale operations, expand market presence, and create jobs. Substantial capital for established businesses ready to grow.',
        amount: 37500000, // $375,000 in cents
        deadline: new Date('2025-11-15'),
        eligibility: [
            'Operating business for at least 2 years',
            'Clear growth plan',
            'Positive revenue history',
            'Job creation commitment'
        ],
        category: 'Business',
        organization: 'Economic Development Agency',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
    },
    {
        id: '3',
        title: 'Social Impact Initiative',
        description: 'Funding large-scale projects that create transformative social change and community development with measurable, sustainable impact.',
        amount: 112500000, // $1,125,000 in cents
        deadline: new Date('2026-01-20'),
        eligibility: [
            'Non-profit or social enterprise',
            'Clear social impact mission',
            'Measurable outcomes',
            'Community support',
            'Track record of successful programs'
        ],
        category: 'Social Good',
        organization: 'Global Impact Fund',
        imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800'
    },
    {
        id: '4',
        title: 'Green Energy Grant',
        description: 'Supporting large-scale renewable energy projects and sustainable solutions for climate change with significant environmental impact potential.',
        amount: 175000000, // $1,750,000 in cents
        deadline: new Date('2026-02-28'),
        eligibility: [
            'Focus on renewable energy or sustainability',
            'Environmental impact assessment',
            'Technical feasibility demonstrated',
            'Based in or serving European markets',
            'Proven technical team'
        ],
        category: 'Environment',
        organization: 'Environmental Coalition',
        imageUrl: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=800'
    },
    {
        id: '5',
        title: 'Healthcare Innovation Fund',
        description: 'Advancing healthcare technology and improving patient outcomes through major innovation initiatives at scale.',
        amount: 90000000, // $900,000 in cents
        deadline: new Date('2025-12-15'),
        eligibility: [
            'Healthcare-focused innovation',
            'Clear patient benefit',
            'Regulatory compliance path',
            'Medical advisory board',
            'Clinical validation completed'
        ],
        category: 'Healthcare',
        organization: 'Health Alliance',
        imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800'
    },
    {
        id: '6',
        title: 'Education Transformation Grant',
        description: 'Supporting large-scale educational initiatives that transform learning outcomes and accessibility with measurable impact.',
        amount: 60000000, // $600,000 in cents
        deadline: new Date('2025-11-30'),
        eligibility: [
            'Education-focused mission',
            'Demonstrated impact on learning',
            'Scalability potential',
            'Educator involvement',
            'Proven track record'
        ],
        category: 'Education',
        organization: 'Education First Foundation',
        imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800'
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
