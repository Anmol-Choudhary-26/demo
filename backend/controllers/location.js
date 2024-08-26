const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

// Create a new location
router.post("/", async (req, res) => {
  const location = await prisma.location.create({
    data: req.body,
  });
  res.status(201).json(location);
});

router.get("/", async (req, res) => {
  const locationes = await prisma.location.findMany();
  res.json(locationes);
});

// Get a location by id
router.get("findone/:id", async (req, res) => {
  const location = await prisma.location.findUnique({
    where: { id: Number(req.params.id) },
  });
  res.json(location);
});

router.get("/search", async (req, res) => {
  const Recipe = await prisma.location.findMany({
   
   where:{
    OR: [
 {title:{contains:req.query.search, mode: "insensitive"}  },
 {description:{contains:req.query.search, mode: "insensitive"}  }
    
    ]
},
  }
  )
  res.status(200).json( Recipe )
})


// Update a location by id
router.put("/update", async (req, res) => {
  
  const location = await prisma.location.update({
    where: { id: req.body.values.id },
    data: {
      title: req.body.values.title,
      description: req.body.values.description
    },
  });
  res.json(location);
});

// Delete a location by id
router.delete("/dellocation", async (req, res) => {
  console.log(req.query.id)
  try{
  await prisma.location.delete({
    where: { id: req.query.id },
  });
  res.status(204).send();
}
catch(err){
  res.status(404).send(err);
  
}
});

module.exports = router;
