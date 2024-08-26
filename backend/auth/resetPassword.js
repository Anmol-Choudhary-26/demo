const express = require("express");
const router = express.Router();
const  auth =  require("../firebase/setup").auth;
const  sendPasswordResetEmail = require("firebase/auth").sendPasswordResetEmail
router.post("/", async (req, res) => {
  try{
  const {email} = req.body
  console.log(email)
  const data = await sendPasswordResetEmail(auth, email)
  res.status(200).json({msg: "reset password mail sent", data});
  } catch(error){
    console.log(error)
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;
