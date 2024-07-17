const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const verify = require("../middleware/verify").Verify;
const VerifyRole = require("../middleware/verify").VerifyRole;

// Create a new notification
router.post("/", async (req, res) => {
  const notification = await prisma.notification.create({
    data: req.body,
  });
  res.status(201).json(notification);
});

router.get("/", async (req, res) => {
  const notificationes = await prisma.notification.findMany();
  res.json(notificationes);
});

// Get a notification by id
router.get("/getall", async (req, res) => {
  const notification = await prisma.notification.findUnique({
    where: { id: req.query.id },
  });
  res.json(notification);
});

// Update a notification by id
router.put("/", async (req, res) => {
  const noti = await prisma.notification.update({
    where: { id: req.body.values.id },
    data: {
      title: req.body.values.title,
      description: req.body.values.description
    },
  });
  res.json(noti);
});

// Delete a notification by id
router.delete("/", async (req, res) => {
  await prisma.notification.delete({
    where: { id: req.query.id },
  });
  res.status(204).send();
});

module.exports = router;

router.get("/specific", async (req, res) => {
  const type = req.query.type;
  const notifications = await prisma.notification.findMany({
    where: { type },
  });
  res.json(notifications);
});

router.get("/search", async (req, res) => {
  const Recipe = await prisma.notification.findMany({
   
   where:{
    OR: [
 {title:{contains:req.query.search, mode: "insensitive"}  },
 {description:{contains:req.query.search, mode: "insensitive"}  }
    
    ],
    
      notiType: req.query.type
},
  }
  )
  res.status(200).json( Recipe )
})
