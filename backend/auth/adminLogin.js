const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

router.post("/adminlogin", async (req, res) => {
  const { phone, password } = req.body;

  try {
    const admin = await prisma.admin.findFirst({
      where: { phoneNumber: phone },
    });
    if (!admin) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      res.status(400).json({ error: "Invalid username or password" });
    }
    let payload = {
      id: admin.id,
      data: admin,
      role: admin.admin,
    };
    res.cookie(
      jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, {
        expiresIn: "120m",
      })
    );

    res.status(200).json({ message: "Admin Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
