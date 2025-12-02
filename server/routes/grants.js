const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const { computeApplicationFeeCents } = require('../lib/fees');
const { authenticateToken } = require('./auth');

// GET /api/grants - List all grants
router.get('/', async (req, res) => {
    try {
        const grants = await prisma.grant.findMany({
            orderBy: { deadline: 'asc' },
            take: 100,
            select: {
                id: true,
                title: true,
                organization: true,
                amount: true,
                deadline: true,
                category: true,
                imageUrl: true
            }
        });

        res.json(grants);
    } catch (err) {
        console.error('Error fetching grants:', err);
        res.status(500).json({ error: 'Failed to fetch grants' });
    }
});

// GET /api/grants/:id - Get single grant details
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const grant = await prisma.grant.findUnique({
            where: { id },
            include: {
                applications: {
                    select: {
                        id: true,
                        status: true,
                        submittedAt: true
                    },
                    orderBy: { submittedAt: 'desc' }
                }
            }
        });

        if (!grant) {
            return res.status(404).json({ error: 'Grant not found' });
        }

        res.json(grant);
    } catch (err) {
        console.error('Error fetching grant:', err);
        res.status(500).json({ error: 'Failed to fetch grant' });
    }
});

// POST /api/grants/:id/apply - Submit application (requires auth)
router.post('/:id/apply', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const {
        applicantName,
        email,
        organization,
        projectTitle,
        projectDescription,
        requestedAmount,
        annualIncome
    } = req.body;

    // Validate required fields
    if (!applicantName || !email || !projectTitle || !projectDescription || !requestedAmount) {
        return res.status(400).json({
            error: 'applicantName, email, projectTitle, projectDescription, and requestedAmount are required'
        });
    }

    // Parse and validate requested amount
    const amountNum = Number(requestedAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
        return res.status(400).json({ error: 'requestedAmount must be a positive number' });
    }

    try {
        // Verify grant exists
        const grant = await prisma.grant.findUnique({
            where: { id }
        });

        if (!grant) {
            return res.status(404).json({ error: 'Grant not found' });
        }

        // Check if grant deadline has passed
        if (new Date() > grant.deadline) {
            return res.status(400).json({ error: 'Grant application deadline has passed' });
        }

        // Compute application fee
        const feeCents = computeApplicationFeeCents(amountNum);
        const requestedAmountCents = Math.round(amountNum * 100);

        // Create application
        const application = await prisma.application.create({
            data: {
                grantId: id,
                userId: req.user.userId,
                applicantName,
                email,
                organization: organization || '',
                annualIncome: annualIncome || '',
                projectTitle,
                projectDescription,
                requestedAmount: requestedAmountCents,
                applicationFeeCents: feeCents,
                status: 'pending'
            },
            include: {
                grant: {
                    select: {
                        title: true,
                        organization: true
                    }
                }
            }
        });

        res.status(201).json({
            id: application.id,
            applicationFeeCents: feeCents,
            status: application.status,
            grant: application.grant
        });
    } catch (err) {
        console.error('Error submitting application:', err);
        res.status(500).json({ error: 'Failed to submit application' });
    }
});

// GET /api/applications/my - Get current user's applications (requires auth)
router.get('/applications/my', authenticateToken, async (req, res) => {
    try {
        const applications = await prisma.application.findMany({
            where: { userId: req.user.userId },
            include: {
                grant: {
                    select: {
                        title: true,
                        organization: true,
                        amount: true
                    }
                }
            },
            orderBy: { submittedAt: 'desc' }
        });

        res.json(applications);
    } catch (err) {
        console.error('Error fetching applications:', err);
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
});

// GET /api/applications/:id - Get application details (requires auth)
router.get('/applications/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const application = await prisma.application.findUnique({
            where: { id },
            include: {
                grant: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true
                    }
                }
            }
        });

        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }

        // Verify user owns this application or is admin
        if (application.userId !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        res.json(application);
    } catch (err) {
        console.error('Error fetching application:', err);
        res.status(500).json({ error: 'Failed to fetch application' });
    }
});

// Admin routes
// GET /api/admin/applications - Get all applications (admin only)
router.get('/admin/applications', authenticateToken, async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
        }

        const applications = await prisma.application.findMany({
            include: {
                grant: {
                    select: {
                        title: true,
                        organization: true,
                        amount: true
                    }
                },
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: { submittedAt: 'desc' }
        });

        res.json(applications);
    } catch (err) {
        console.error('Error fetching applications:', err);
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
});

// PATCH /api/admin/applications/:id/status - Update application status (admin only)
router.patch('/admin/applications/:id/status', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
        }

        // Validate status
        const validStatuses = ['submitted', 'under_review', 'approved', 'rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const application = await prisma.application.update({
            where: { id },
            data: { status },
            include: {
                grant: {
                    select: {
                        title: true,
                        organization: true
                    }
                },
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });

        res.json(application);
    } catch (err) {
        console.error('Error updating application status:', err);
        res.status(500).json({ error: 'Failed to update application status' });
    }
});

module.exports = router;
