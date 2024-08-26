const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { VerifyRole } = require("../middleware/verify");
const prisma = new PrismaClient();
const router = express.Router();
const verifyRole = require("../middleware/verify").VerifyRole;
const verify = require("../middleware/verify").Verify


router.post('/', async (req, res) => {
    try{
    const data = await prisma.businessReport.create({
        data: req.body,
    });
    res.status(201).json(data);
  }
  catch(err){
    console.log(err)
    res.status(500).json({ error: "Something went wrong" });
  }
    })


router.get('/', async (req, res) => {
    try{
        const data = await prisma.businessReport.findMany();
        res.status(200).json(data);
    }    
    catch(err){
        console.log(err)
        res.status(500).json({ error: err });
    }
})

router.delete('/', async (req, res) => {
    try{
        const data = await prisma.businessReport.delete(
            {
                where: {
                    id: req.query.id
                }
            }
        );
        res.status(200).json(data);
    }    
    catch(err){
        console.log(err)
        res.status(500).json({ error: err });
    }
})

router.get("/search", async (req, res) => {
    const Recipe = await prisma.businessReport.findMany({
     
     where:{
   reason:{contains:req.query.search, mode: "insensitive"}  
  
      
     
      
     
    }
}
    )
    res.status(200).json( Recipe )
  })
  

module.exports = router;