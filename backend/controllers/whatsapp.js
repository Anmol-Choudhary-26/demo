const express = require('express');
const { PrismaClient } = require('@prisma/client');
const verify = require("../middleware/verify").Verify;
const prisma = new PrismaClient();
const router = express.Router();

// Create chatRoom
router.post('/whatsappschema',verify,  async (req, res) => {

    try {
        const newwhatsappschema = await prisma.chatRoom.create({
            data: req.body
        });

        res.status(201).json(newwhatsappschema);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Get all ChatRooms of a user
router.get('/whatsappschema/:receiver',verify,  async (req, res) => {
    const { receiver } = req.params;

    try {
        const whatsappschema = await prisma.chatRoom.findMany({
            where: {OR: [
                { business: receiver },
                { investor: receiver },
            ],
        },
        });

        res.json(whatsappschema);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.get('/chatroom/:id/messages',verify,  async (req, res) => {
    const { id } = req.params;

    try {
        const messages = await prisma.message.findMany({
            where: {
                chatRoomId: id,
            },
            orderBy: {
                timestamp: 'asc',
            },
        });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.post('/chatroom/:id',verify,  async (req, res) => {
    const { id } = req.params;
    

    try {
        const newMessage = await prisma.message.create({
            data: {
                chatRoomId: id,
                ...req.body,
            },
        });

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}
);


module.exports = router;