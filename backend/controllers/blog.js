const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const verify = require("../middleware/verify").Verify;
const VerifyRole = require("../middleware/verify").VerifyRole;

// Create a new blog
router.post("/", async (req, res) => {
  const blog = await prisma.blog.create({
    data: req.body,
  });
  res.status(201).json(blog);
});

router.get("/", async (req, res) => {
  const bloges = await prisma.blog.findMany();
  res.json(bloges);
});

// Get a blog by id
router.get("findone/:id", async (req, res) => {
  const blog = await prisma.blog.findUnique({
    where: { id: Number(req.params.id) },
  });
  res.json(blog);
});

router.get("/search", async (req, res) => {
  const Recipe = await prisma.blog.findMany({
   
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


// Update a blog by id
router.put("/update", async (req, res) => {
  
  const blog = await prisma.blog.update({
    where: { id: req.body.values.id },
    data: {
      title: req.body.values.title,
      description: req.body.values.description
    },
  });
  res.json(blog);
});

// Delete a blog by id
router.delete("/delblog", async (req, res) => {
  console.log(req.query.id)
  try{
  await prisma.blog.delete({
    where: { id: req.query.id },
  });
  res.status(204).send();
}
catch(err){
  res.status(404).send(err);
  
}
});

module.exports = router;
