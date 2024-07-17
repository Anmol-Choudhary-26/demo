const express = require("express");
const router = express.Router();
const supabase = require("./supabase.js");

router.post("/", async (req, res) => {
  const {
    data: { user, session },
    error,
  } = await supabase.auth.signUp({
    phone: req.body.phone,
    password: req.body.password,
  });
  if (error) {
    console.log(error)
    return res.status(401).json({ error: error});
  }
  res.status(200).json({ user, session });
});

module.exports = router;
