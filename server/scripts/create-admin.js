const bcrypt = require('bcryptjs');
const prisma = require('../prisma/client');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function createAdminUser() {
    try {
        console.log('\n=== Create Admin User ===\n');

        const email = await question('Email: ');
        const password = await question('Password: ');
        const name = await question('Full Name: ');
        const organization = await question('Organization (optional): ');

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create admin user
        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                name,
                organization: organization || null,
                role: 'admin'
            }
        });

        console.log('\n✅ Admin user created successfully!');
        console.log('User ID:', user.id);
        console.log('Email:', user.email);
        console.log('Name:', user.name);
        console.log('Role:', user.role);
        console.log('\nYou can now log in with these credentials.\n');

    } catch (error) {
        if (error.code === 'P2002') {
            console.error('\n❌ Error: A user with this email already exists.\n');
        } else {
            console.error('\n❌ Error creating admin user:', error.message);
        }
    } finally {
        rl.close();
        await prisma.$disconnect();
    }
}

createAdminUser();
