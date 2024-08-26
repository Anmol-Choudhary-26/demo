const express = require("express");
const { PrismaClient } = require("@prisma/client");
const verifyRole = require("../middleware/verify").VerifyRole;

const prisma = new PrismaClient();
const router = express.Router();

// Create Industry
router.post("/", async (req, res) => {
  const {name, description} = req.body
  console.log(req.body);
  try {
    const newIndustry = await prisma.industry.create({
      data: {
       name, description
      },
    });

    res.status(201).json(newIndustry);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error });
  }
});

// Read Industry
router.get("/", async (req, res) => {

  try {
    const industry = await prisma.industry.findUnique({
      where: { id: req.params.id },
    });

    if (industry) {
      res.status(200).json(industry);
    } else {
      res.status(404).json({ error: "Industry not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});
``
router.get("/popular", async (req, res) => {
  try {
    const topIndustries = await prisma.industry.findMany({
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

router.get("/search", async (req, res) => {
  const Recipe = await prisma.industry.findMany({
   
   where:{
    OR: [
 {name:{contains:req.query.search, mode: "insensitive"}  },
 {description:{contains:req.query.search, mode: "insensitive"}  }
    
    ],
    
      notiType: req.query.type
},
  }
  )
  res.status(200).json( Recipe )
})


// Update Industry
router.put("/",  async (req, res) => {
  const { name, description } = req.body;
  try {
    const updatedIndustry = await prisma.industry.update({
      where: { id: req.params.id },
      data: {
        name,
        description
      },
    });

    res.status(200).json(updatedIndustry);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Delete Industry
router.delete("/", verifyRole, async (req, res) => {

  try {
    const deletedIndustry = await prisma.industry.delete({
      where: { id: req.params.id },
    });

    res.status(200).json(deletedIndustry);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
