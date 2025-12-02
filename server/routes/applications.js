const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const { authenticateToken } = require('./auth');

// GET /api/applications/my - Get current user's applications (requires auth)
router.get('/my', authenticateToken, async (req, res) => {
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
router.get('/:id', authenticateToken, async (req, res) => {
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

// POST /api/applications/:id/payment - Upload payment proof
router.post('/:id/payment', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { paymentProof } = req.body; // In real app, handle file upload

    try {
        const application = await prisma.application.findUnique({
            where: { id }
        });

        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }

        // Verify user owns this application
        if (application.userId !== req.user.userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Update application status to indicate payment is being processed
        // In a real app, you'd store the file and update a payment status field
        const updatedApp = await prisma.application.update({
            where: { id },
            data: {
                // For now, just update status since we don't have payment fields in schema
                status: 'pending'
            }
        });

        res.json({ message: 'Payment proof uploaded successfully', application: updatedApp });
    } catch (err) {
        console.error('Error uploading payment:', err);
        res.status(500).json({ error: 'Failed to upload payment proof' });
    }
});

// Admin routes
// GET /api/applications/admin/all - Get all applications (admin only)
router.get('/admin/all', authenticateToken, async (req, res) => {
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

// PATCH /api/applications/:id/status - Update application status (admin only)
router.patch('/:id/status', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
        }

        // Validate status
        const validStatuses = ['pending', 'submitted', 'under_review', 'approved', 'rejected'];
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
