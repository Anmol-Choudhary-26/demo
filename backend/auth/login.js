const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const supabase = require("./supabase.js"); // adjust the path to match your project structure
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

router.post("/", async (req, res) => {
  console.log(req.body.phone, req.body.password)
  const phone = req.body.phone;
  const {
    user, 
    error,
  } = await supabase.auth.signInWithPassword({
    phone: phone,
    password: req.body.password,
  });
  
  if (error) {
    console.log(error)
    return res.status(401).json({ error: error });
  }
  var DBuser = await prisma.user.findFirst({
    where: {
      phoneNumber: req.body.phone,
    },
  });
 console.log(DBuser)
  
  let payload = {
    id: DBuser.id,
    data: DBuser,
    role: DBuser.userRole,
  };
  res.status(200).send({ DBuser , "token": jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, {
    expiresIn: "120m",
  })});
 

});

module.exports = router;
