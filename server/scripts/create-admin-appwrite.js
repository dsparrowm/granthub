const { Client, Databases, ID, Query } = require('node-appwrite');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function makeUserAdmin() {
    try {
        console.log('\n=== Make Appwrite User Admin ===\n');
        console.log('This script updates an existing user\'s role to admin in Appwrite.\n');

        // Get Appwrite credentials
        const endpoint = process.env.VITE_APPWRITE_ENDPOINT || await question('Appwrite Endpoint (e.g., https://cloud.appwrite.io/v1): ');
        const projectId = process.env.VITE_APPWRITE_PROJECT_ID || await question('Project ID: ');
        const apiKey = await question('API Key (with users.write permission): ');
        const databaseId = process.env.VITE_APPWRITE_DATABASE_ID || await question('Database ID: ');
        const usersCollectionId = process.env.VITE_APPWRITE_COLLECTION_USERS || await question('Users Collection ID: ');

        console.log('\n');
        const userEmail = await question('Enter user email to make admin: ');

        // Initialize Appwrite client
        const client = new Client()
            .setEndpoint(endpoint)
            .setProject(projectId)
            .setKey(apiKey);

        const databases = new Databases(client);

        // Find user by email
        const response = await databases.listDocuments(
            databaseId,
            usersCollectionId,
            [Query.equal('email', userEmail)]
        );

        if (response.documents.length === 0) {
            console.error('\n❌ User not found with email:', userEmail, '\n');
            return;
        }

        const user = response.documents[0];

        console.log('\nFound user:');
        console.log('ID:', user.$id);
        console.log('Name:', user.name || 'N/A');
        console.log('Email:', user.email);
        console.log('Current Role:', user.role || 'user');

        const confirm = await question('\nMake this user an admin? (yes/no): ');

        if (confirm.toLowerCase() === 'yes' || confirm.toLowerCase() === 'y') {
            // Update user role to admin
            const updatedUser = await databases.updateDocument(
                databaseId,
                usersCollectionId,
                user.$id,
                { role: 'admin' }
            );

            console.log('\n✅ User updated successfully!');
            console.log('Name:', updatedUser.name || 'N/A');
            console.log('Email:', updatedUser.email);
            console.log('New Role:', updatedUser.role);
            console.log('\nThis user can now access the admin dashboard.\n');
        } else {
            console.log('\n❌ Operation cancelled.\n');
        }

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        if (error.code) {
            console.error('Error Code:', error.code);
        }
        if (error.response) {
            console.error('Response:', error.response);
        }
    } finally {
        rl.close();
    }
}

makeUserAdmin();
