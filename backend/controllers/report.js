const express = require('express');
const { PrismaClient } = require('@prisma/client');
const verify = require('../middleware/verify').Verify
const verifyRole = require('../middleware/verify').VerifyRole;
const prisma = new PrismaClient();
const router = express.Router();lofi 

// Create a report
router.post('/reports',verify, async (req, res) => {
  const { userId, reason } = req.body;
  const report = await prisma.report.create({
    data: { userId, reason },
  });
  res.json(report);
});

// Get all reports
router.get('/reports',verifyRole, async (req, res) => {
  const reports = await prisma.report.findMany();
  res.json(reports);
});

// Get a single report
router.get('/reports/:id',verifyRole,  async (req, res) => {
  const { id } = req.params;
  const report = await prisma.report.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(report);
});

// Delete a report
router.delete('/reports/:id',verifyRole, async (req, res) => {
  const { id } = req.params;
  const report = await prisma.report.delete({
    where: { id: parseInt(id) },
  });
  res.json(report);
});

// block a user
router.put('/users/:id/block', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.update({
    where: { id: id },
    data: { blocked: true },
  });
  res.json(user);
});

module.exports = router;