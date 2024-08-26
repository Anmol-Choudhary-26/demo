const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { VerifyRole } = require("../middleware/verify");
const prisma = new PrismaClient();
const router = express.Router();
const verifyRole = require("../middleware/verify").VerifyRole;
const verify = require("../middleware/verify").Verify

// Create a new business
router.post("/", async (req, res) => {
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

router.get("/nonverified", async (req, res) => {
  try{
  const businesses = await prisma.business.findMany({
    where: {
      isVerified: false,
    },
  });
  res.json(businesses);
}
catch(error){
  res.status(500).json({ error: "Something went wrong" });
}
});

router.get('/api/businesses/search', async (req, res) => {
  try {
    // Get the query parameters from the request
    const {
      name,
      InvestorPreference,
      businessLegalEntityType,
      State,
      district,
      industry,
      investmentRangeStart,
      investmentRangeEnd,
      yearRange
    } = req.query;

    // Build the query conditions based on the provided filters
    const where = {
      AND: [
        {name: name },
        { InvestorPreference: { some: InvestorPreference? InvestorPreference.split(',') : null } },
        { businessLegalEntityType: { some: businessLegalEntityType? businessLegalEntityType.split(',') : null } },
        { State: State || null },
        { district: { some: district? district.split(',') : null } } ,
        { industry: { some: industry? industry.split(',') : null } },
        { investmentRangeStart: { lte: investmentRangeEnd || null } },
        { investmentRangeEnd: { gte: investmentRangeStart || null } },
        { establishedDateStart: { lte: yearRange.startYear || null } },
        { establishedDateStart: { gte: yearRange.endYear || null } },
      ],
    };

    // Fetch the businesses based on the query conditions
    const businesses = await prisma.business.findMany({
      where,
    });

    // Send the search results as a JSON response
    res.json(businesses);
  } catch (error) {
    // Handle any errors that occur during the search process
    console.error(error);
    res.status(500).json({ error: 'An error occurred while searching for businesses.' });
  }
});

// Get all businesses
router.get("/", async (req, res) => {
  const businesses = await prisma.business.findMany();
  res.json(businesses);
});



// Get a business by id
router.get("/one", async (req, res) => {
  console.log(req.query)
  const business = await prisma.business.findUnique({
    where: { id: (req.query.id) },
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
router.put("/", async (req, res) => {
    console.log(req.body,req.query.id)
  const business = await prisma.business.update({
    data: req.body,
    where: { id: (req.query.id) },
  });
  res.json(business);
});

 
// Delete a business by id
router.delete("/", async (req, res) => {
  console.log(req.query.id);
  await prisma.business.delete({
    where: { id: req.query.id },
  });
  res.status(204).send();
});

module.exports = router;
