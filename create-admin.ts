import 'dotenv/config';
import { Client, Users, Databases, ID } from 'node-appwrite';

const client = new Client();

client
    .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT || '')
    .setProject(process.env.VITE_APPWRITE_PROJECT_ID || '')
    .setKey(process.env.APPWRITE_API_KEY || ''); // Use API key for server-side operations

const users = new Users(client);
const databases = new Databases(client);

const DATABASE_ID = process.env.VITE_APPWRITE_DATABASE_ID || '';
const USERS_COLLECTION_ID = process.env.VITE_APPWRITE_COLLECTION_USERS || '';

async function createAdmin() {
    try {
        console.log('Creating admin user...');

        // Get admin credentials from command line or use defaults
        const email = process.argv[2] || 'admin@grantlink.com';
        const password = process.argv[3] || 'Admin123!@#';
        const name = process.argv[4] || 'Admin User';

        console.log(`Email: ${email}`);
        console.log(`Name: ${name}`);

        // Create Appwrite user using Users API (server-side)
        const accountResponse = await users.create(
            ID.unique(),
            email,
            undefined, // phone
            password,
            name
        );

        console.log('✓ Account created:', accountResponse.$id);

        // Verify the user's email (important for account access)
        await users.updateEmailVerification(accountResponse.$id, true);
        console.log('✓ Email verified');

        // Set admin label (optional but recommended for role-based access)
        await users.updateLabels(accountResponse.$id, ['admin']);
        console.log('✓ Admin label set');

        // Create user document with admin role
        const userDoc = await databases.createDocument(
            DATABASE_ID,
            USERS_COLLECTION_ID,
            accountResponse.$id, // Use account ID as document ID
            {
                email: email,
                name: name,
                organization: 'Grant Link Administration',
                role: 'admin', // Set as admin
            }
        );

        console.log('✓ Admin user document created:', userDoc.$id);
        console.log('\n✅ Admin user created successfully!');
        console.log('Login credentials:');
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log('\n⚠️  Please change the password after first login!');

    } catch (error: any) {
        console.error('❌ Error creating admin:', error.message);
        if (error.response) {
            console.error('Response:', error.response);
        }
        process.exit(1);
    }
}

createAdmin();
