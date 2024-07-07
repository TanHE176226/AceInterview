import jwt from "jsonwebtoken";
import User from "../models/users.js";
// import refreshTokens from '../controllers/users.js';

// function generateAccessToken(userID) {
//     return jwt.sign(userID, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
// };

function isAdmin(req, res, next) {
    const user = req.user;
    if (user.roleID === 0) {
        next();
    } else {
        res.sendStatus(403); // Access forbidden for non-admin users
    }
}

function isRecruiter(req, res, next) {
    const user = req.user;
    if (user.roleID === 2) {
        next();
    } else {
        res.sendStatus(403); // Access forbidden for non-recruiter users
    }
}

// Middleware xác thực token
function authenticationToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401); // If no token is provided

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
        if (err) return res.sendStatus(403); // If token is no longer valid

        const userID = decodedToken.id;
        try {
            const user = await User.findById(userID);
            req.user = user;
            next();
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    });
}



export default {
    isAdmin,
    isRecruiter,
    authenticationToken
}