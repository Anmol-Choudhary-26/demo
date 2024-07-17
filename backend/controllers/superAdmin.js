const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const router = express.Router();
const superAdminAuth = require("../middleware/verify.js").VerifySuperAdmin

// Update SuperAdmin
router.put("/superadmin/:id", superAdminAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
      ...req.body,
      password: hashedPassword,
    };

    const updatedSuperAdmin = await prisma.superAdmin.update({
      where: { id: Number(id) },
      data: data,
    });

    res.status(200).json(updatedSuperAdmin);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
