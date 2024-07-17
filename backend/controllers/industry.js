const express = require("express");
const { PrismaClient } = require("@prisma/client");
const verifyRole = require("../middleware/verify").VerifyRole;

const prisma = new PrismaClient();
const router = express.Router();

// Create Industry
router.post("/", verifyRole, async (req, res) => {
  const { name } = req.body;

  try {
    const newIndustry = await prisma.industry.create({
      data: {
        name,
      },
    });

    res.status(201).json(newIndustry);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Read Industry
router.get("/:id", verifyRole, async (req, res) => {
  const { id } = req.params;

  try {
    const industry = await prisma.industry.findUnique({
      where: { id: id },
    });

    if (industry) {
      res.status(200).json(industry);
    } else {
      res.status(404).json({ error: "Industry not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/popular", async (req, res) => {
  try {
    const topIndustries = await prisma.industry.findMany({
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

// Update Industry
router.put("/:id", verifyRole, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedIndustry = await prisma.industry.update({
      where: { id: id },
      data: {
        name,
      },
    });

    res.status(200).json(updatedIndustry);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Delete Industry
router.delete("/:id", verifyRole, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedIndustry = await prisma.industry.delete({
      where: { id: Number(id) },
    });

    res.status(200).json(deletedIndustry);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
