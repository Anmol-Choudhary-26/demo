const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const  auth =  require("../firebase/setup").auth;
const  createUserWithEmailAndPassword = require("firebase/auth").createUserWithEmailAndPassword;
const  sendEmailVerification = require("firebase/auth").sendEmailVerification;
router.post("/", async (req, res) => {
  try{
  const {email, password,phoneNumber, name} = req.body
  console.log(email, password, phoneNumber, name);
  
   const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
   await sendEmailVerification(userCredentials.user)
   var DBuser = await prisma.user.findFirst({
    where: {
      phoneNumber,
    }, 
  });
  if (!DBuser) {
    DBuser = await prisma.user.create({
      data: {
        phoneNumber,
        FullName: name,
        email,
        Password: password,
      },
    });
  }
 
  res.status(200).json({"user": userCredentials.user, DBuser });
  } catch(error){
    console.log(error)
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;
