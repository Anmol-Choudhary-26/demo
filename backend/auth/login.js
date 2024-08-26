const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const auth = require("../firebase/setup").auth;
const { signInWithEmailAndPassword, signOut } = require("firebase/auth");

dotenv.config();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const authUser = await signInWithEmailAndPassword(auth, email, password);
    // const userPhone = authUser.user.
    if (!authUser.user.emailVerified) {
      console.log("email not verified");
      signOut(auth);
      return res.status(401).json({ error: "Email not verified" });
    }

    var DBuser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    console.log(DBuser);

    let payload = {
      id: DBuser.id,
      data: DBuser,
      role: DBuser.userRole,
    };
    res.status(200).json({
      DBuser,
      token: jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, {
        expiresIn: "120m",
      }),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
