const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const verifyRole = require("../middleware/verify.js").VerifyRole;
const verify = require("../middleware/verify.js").Verify;

// Create a new investor
router.post("/", async (req, res) => {
  const investor = await prisma.investor.create({
    data: req.body,
  });
  console.log(investor);
  res.status(201).json(investor);
});

router.get("/nonverified", async (req, res) => {
  try{
  const businesses = await prisma.investor.findMany({
    where: {
      isVerified: false,
    },
  });
  res.json(businesses);
}
catch(error){
  res.status(500).json({ error: "Something went wrong" });
}
});


// Get all investors
router.get("/", async (req, res) => {
  const investors = await prisma.investor.findMany();
  res.json(investors);
});

router.get("/popular", async (req, res) => {
  try {
    const topIndustries = await prisma.investor.findMany({
      orderBy: {
        score: "desc",
      },
      take: 10,
    });

    res.status(200).json(topIndustries);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Get an investor by id
router.get("/:id", async (req, res) => {

  const investor = await prisma.investor.findUnique({
    where: { id: req.query.id },
  });
  res.json(investor);
});

// Update an investor by id
router.put("/", async (req, res) => {
  const investor = await prisma.investor.update({
    where: { id: (req.query.id) },
    data: req.body,
  });
  res.json(investor);
});

// Delete an investor by id
router.delete("/:id", async (req, res) => {
  await prisma.investor.delete({
    where: { id: Number(req.params.id) },
  });
  res.status(204).send();
});


module.exports = router;
