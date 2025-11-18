const prisma = require('../prisma/client');
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
        console.log('\n=== Make Existing User Admin ===\n');

        const email = await question('Enter user email: ');

        // Find user
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            console.error('\n❌ User not found with email:', email, '\n');
            return;
        }

        console.log('\nFound user:');
        console.log('Name:', user.name);
        console.log('Email:', user.email);
        console.log('Current Role:', user.role);

        const confirm = await question('\nMake this user an admin? (yes/no): ');

        if (confirm.toLowerCase() === 'yes' || confirm.toLowerCase() === 'y') {
            // Update user role to admin
            const updatedUser = await prisma.user.update({
                where: { id: user.id },
                data: { role: 'admin' }
            });

            console.log('\n✅ User updated successfully!');
            console.log('Name:', updatedUser.name);
            console.log('Email:', updatedUser.email);
            console.log('New Role:', updatedUser.role);
            console.log('\nThis user can now access the admin dashboard.\n');
        } else {
            console.log('\n❌ Operation cancelled.\n');
        }

    } catch (error) {
        console.error('\n❌ Error:', error.message);
    } finally {
        rl.close();
        await prisma.$disconnect();
    }
}

makeUserAdmin();
