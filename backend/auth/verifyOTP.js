const express = require("express");
const router = express.Router();
const supabase = require("./supabase.js"); // adjust the path to match your project structure

router.post("/", async (req, res) => {
  console.log(req.body.phone, req.body.token)
  const {
    data: { session },
    error,
  } = await supabase.auth.verifyOtp({
    phone: req.body.phone,
    token: req.body.token,
    type: "sms",
  });
  if (error) {
    return res.status(401).json({ error: error.message });
  }

  res.status(200).json(session);
});

module.exports = router;
