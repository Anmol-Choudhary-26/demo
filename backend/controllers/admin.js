const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { VerifySuperAdmin } = require("../middleware/verify.js");
const prisma = new PrismaClient();
const router = express.Router();
const superAdminAuth = require("../middleware/verify.js").VerifySuperAdmin
// Create Admin
router.post("/", superAdminAuth, async (req, res) => {
  const { email, password, phoneNumber } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        phoneNumber,
      },
    });

    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" }, error);
  }
});

// Read Admin
router.get("/:id", superAdminAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await prisma.admin.findUnique({
      where: { id },
    });

    if (admin) {
      res.status(200).json(admin);
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Update Admin
router.put("/:id", superAdminAuth, async (req, res) => {
  const { id } = req.params;
  const { email, password, phoneNumber } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedAdmin = await prisma.admin.update({
      where: { id },
      data: {
        email,
        password: hashedPassword,
        phoneNumber,
      },
    });

    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Delete Admin
router.delete("/:id", superAdminAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAdmin = await prisma.admin.delete({
      where: { id },
    });

    res.status(200).json(deletedAdmin);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
