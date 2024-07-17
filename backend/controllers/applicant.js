const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const verifyRole = require("../middleware/verify").VerifyRole;

router.get("/business", verifyRole, async (req, res) => {
  const business = (await prisma.business.findMany()).filter(
    (business) => business.isVerified === false
  );
  res.json(business);
});

router.get("/investor", verifyRole, async (req, res) => {
  const investor = (await prisma.investor.findMany()).filter(
    (investor) => investor.isVerified === false
  );
  res.json(investor);
});

router.get("/franchise", verifyRole, async (req, res) => {
  const franchise = (await prisma.franchise.findMany()).filter(
    (franchise) => franchise.isVerified === false
  );
  res.json(franchise);
});

router.get("/idea", verifyRole, async (req, res) => {
  const idea = (await prisma.idea.findMany()).filter(
    (idea) => idea.isVerified === false
  );
  res.json(idea);
});

module.exports = router;
