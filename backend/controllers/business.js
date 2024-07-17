const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { VerifyRole } = require("../middleware/verify");
const prisma = new PrismaClient();
const router = express.Router();
const verifyRole = require("../middleware/verify").VerifyRole;
const verify = require("../middleware/verify").Verify

// Create a new business
router.post("/",verify, async (req, res) => {
  console.log(req.body)
  
  try{
  const business = await prisma.business.create({
    data: req.body,
  });
  res.status(201).json(business);
}
catch(err){
  console.log(err)
  res.status(500).json({ error: "Something went wrong" });
}
});

//get verified businesses
router.get("/verified", async (req, res) => {
  try{
  const businesses = await prisma.business.findMany({
    where: {
      isVerified: true,
    },
  });
  res.json(businesses);
}
catch(error){
  res.status(500).json({ error: "Something went wrong" });
}
});
// Get all businesses
router.get("/", verifyRole, async (req, res) => {
  const businesses = await prisma.business.findMany();
  res.json(businesses);
});



// Get a business by id
router.get("/:id", verifyRole, async (req, res) => {
  const business = await prisma.business.findUnique({
    where: { id: Number(req.params.id) },
  });
  res.json(business);
});

router.get("/popular", async (req, res) => {
  try {
    const topIndustries = await prisma.business.findMany({
      where: {
        isVerified: true,
      },
      orderBy: {
        score: "desc",
      },
      take: 10,
    });

    res.status(200).json(topIndustries);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/search", verify, async (req, res) => {
  const { industry, minInvestment, maxInvestment } = req.query;

  // Convert location and industry to arrays if they are not already
  const industries = Array.isArray(industry) ? industry : [industry];
  pincodes = Array.isArray(pincodes) ? pincodes : [pincodes];
  try {
    const businesses = await prisma.business.findMany({
      where: {
        isVerified: true,
        industries: {
          hasSome: industries,
        },
        investment: {
          gte: Number(minInvestment),
          lte: Number(maxInvestment),
        },
        pincode: {
          in: pincodes, // filter by multiple pincodes
        },// filter by pincode
      },
    });
  
    if (businesses.length === 0) { // if no businesses are found
      const pincodePrefixes = pincodes.map(pincode => pincode.slice(0, 2)); // get the first 2 digits of the pincode
      const allBusinesses = await prisma.business.findMany({
        where: {
          OR: pincodePrefixes.map(prefix => ({ pincode: { startsWith: prefix } })),
        },
      });
      res.status(200).json(allBusinesses);
    } else {
      res.status(200).json(businesses);
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
  });
// request to update data by business
router.post("/", verifyRole, async (req, res) => {
  const business = await prisma.updateBusiness.create({
    data: req.body,
  });
  res.status(201).json(business);
});

// Update a business by id for admin
router.put("/:id", VerifyRole, async (req, res) => {
  const business = await prisma.business.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  res.json(business);
});

// Delete a business by id
router.delete("/:id", verifyRole, async (req, res) => {
  await prisma.business.delete({
    where: { id: Number(req.params.id) },
  });
  res.status(204).send();
});

module.exports = router;
