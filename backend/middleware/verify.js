const  jwt =  require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const dotenv = require('dotenv');
dotenv.config();

 async function Verify(req, res, next) {
    try {
        // console.log(req.headers)
        const authHeader = req.headers["authorization"]; // get the session cookie from request header
        if (!authHeader) return res.sendStatus(401); // if there is no cookie from request header, send an unauthorized response.
        const cookie = authHeader.split("=")[1]; // If there is, split the cookie string to get the actual jwt
        // console.log(cookie,split(" ")[1])
        // Verify using jwt to see if token has been tampered with or if it has expired.
        // that's like checking the integrity of the cookie
        jwt.verify(cookie, process.env.SECRET_ACCESS_TOKEN, async (err, decoded) => {
            if (err) {
                // if token has been altered or has expired, return an unauthorized error
                return res
                    .status(401)
                    .json({ message: "This session has expired. Please login", cookie });
            }

            const { id } = decoded; // get user id from the decoded token
            // console.log(id)
            const user = await prisma.user.findUnique({
                where: {
                  id: id,
                },
              })
              if (user.block) {
                return res.status(403).json({ message: "User is blocked" });
            }
            const { password, ...data } = user; // return user object without the password
            req.user = data; // put the data object into req.user
            next();
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}

 function VerifyRole(req, res, next) {
    try{
        // console.log(req.headers)
        const authHeader = req.headers["authorization"]; // get the session cookie from request header
        if (!authHeader) return res.sendStatus(401); // if there is no cookie from request header, send an unauthorized response.
        const cookie = authHeader.split("=")[1]; // If there is, split the cookie string to get the actual jwt
        
        jwt.verify(cookie, process.env.SECRET_ACCESS_TOKEN, async (err, decoded) => {
            if (err) {
                // if token has been altered or has expired, return an unauthorized error
                return res
                    .status(401)
                    .json({ message: "This session has expired. Please login", cookie });
            }})
            console.log("success")
        if (!JSON.parse(Buffer.from(cookie.split('.')[1], 'base64').toString()).role && !JSON.parse(Buffer.from(cookie.split('.')[1], 'base64').toString()).superAdmin) {
            return res.status(401).json({
                status: "failed",
                message: "You are not authorized to view this page.",
            });
        }
        next(); // continue to the next middleware or function
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}


function VerifySuperAdmin(req, res, next) {
    try{
        const authHeader = req.headers["cookie"]; // get the session cookie from request header
        if (!authHeader) return res.sendStatus(401); // if there is no cookie from request header, send an unauthorized response.
        const cookie = authHeader.split("=")[1]; // If there is, split the cookie string to get the actual jwt
        
        jwt.verify(cookie, process.env.SECRET_ACCESS_TOKEN, async (err, decoded) => {
            if (err) {
                // if token has been altered or has expired, return an unauthorized error
                return res
                    .status(401)
                    .json({ message: "This session has expired. Please login", cookie });
            }})
        if (!JSON.parse(Buffer.from(cookie.split('.')[1], 'base64').toString()).superAdmin) {
            return res.status(401).json({
                status: "failed",
                message: "You are not authorized to view this page.",
            });
        }
        next(); // continue to the next middleware or function
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}

module.exports = { Verify, VerifyRole, VerifySuperAdmin };
