const express = require("express");
const router = express.Router();
const supabase = require("./supabase.js"); 


router.post("/", async (req, res) => {
    console.log(req.body.phone, req.body.token)
      const { error } = await supabase.auth.resend({
        type: 'sms',
        phone: req.body.phone
      })
    if (error) {
      return res.status(401).json({ error: error.message });
    }
  
    res.status(200).json(session);
  });
  
  module.exports = router;
  