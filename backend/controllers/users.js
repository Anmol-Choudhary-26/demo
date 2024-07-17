const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { Db } = require("mongodb");
const prisma = new PrismaClient();
const router = express.Router();
const verifyRole = require("../middleware/verify").VerifyRole;
const verify = require("../middleware/verify").Verify;
// Get all users
router.get("/", verifyRole, async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Get a user by id
router.get("/:id", verifyRole, async (req, res) => {
  console.log(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id: req.params.id },
  });
  res.json(user);
});

router.post('/', async (req, res) => {
  const { phoneNumber, FullName, email, password } = req.body;
  var DBuser = await prisma.user.findFirst({
    where: {
      phoneNumber,
    },
  });
  if (!DBuser) {
    DBuser = await prisma.user.create({
      data: {
        phoneNumber,
        FullName,
        email,
        Password: password,
      },
    });
  }
  console.log(DBuser)
  res.json(DBuser);
});

// Update a user by id
router.put("/:id", verify, async (req, res) => {
  console.log("hI")
  const user = await prisma.user.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.status(200).json(user);
});

// Delete a user by id
router.delete("/:id", verifyRole, async (req, res) => {
  await prisma.user.delete({
    where: { id: req.params.id },
  });
  res.status(204).send();
});

// check user role
// router.get('/checkrole', verify, async (req, res) => {
//   const data = await prisma.user.findUnique(
//     {   
//      where : {phone : req.body.phone,
//   }
//     }
//   ) 
//   res.status(200).json(data.userRole)
// })

module.exports = router;
