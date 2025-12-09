import 'dotenv/config';
import { Client, Users } from 'node-appwrite';

const client = new Client();

client
    .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT || '')
    .setProject(process.env.VITE_APPWRITE_PROJECT_ID || '')
    .setKey(process.env.APPWRITE_API_KEY || '');

const users = new Users(client);

async function deleteUserByEmail(email: string) {
    try {
        console.log(`Looking for user with email: ${email}...`);

        // List all users and find by email
        const usersList = await users.list();
        const user = usersList.users.find(u => u.email === email);

        if (user) {
            console.log(`Found user: ${user.$id}`);
            await users.delete(user.$id);
            console.log('✓ User deleted successfully!');
        } else {
            console.log('User not found');
        }
    } catch (error: any) {
        console.error('❌ Error:', error.message);
        if (error.response) {
            console.error('Response:', error.response);
        }
    }
}

const email = process.argv[2] || 'admin@grantlink.com';
deleteUserByEmail(email);
