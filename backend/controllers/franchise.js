const express = require("express");
const { PrismaClient } = require("@prisma/client");
const verifyRole = require("../middleware/verify").VerifyRole;
const prisma = new PrismaClient();
const router = express.Router();

// Create Franchise
router.post("/", async (req, res) => {
  const { name, location } = req.body;
  console.log(req.body);
  try {
    const newFranchise = await prisma.franchise.create({
      data: req.body,
    });

    res.status(201).json(newFranchise);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Read Franchise
router.get("/:id", verifyRole, async (req, res) => {
  const { id } = req.params;

  try {
    const franchise = await prisma.franchise.findUnique({
      where: { id: Number(id) },
    });

    if (franchise) {
      res.status(200).json(franchise);
    } else {
      res.status(404).json({ error: "Franchise not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Update Franchise
router.put("/:id", verifyRole, async (req, res) => {
  const { id } = req.params;
  const { name, location } = req.body;

  try {
    const updatedFranchise = await prisma.franchise.update({
      where: { id: Number(id) },
      data: {
        name,
        location,
      },
    });

    res.status(200).json(updatedFranchise);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Delete Franchise
router.delete("/:id", verifyRole, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFranchise = await prisma.franchise.delete({
      where: { id: Number(id) },
    });

    res.status(200).json(deletedFranchise);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
