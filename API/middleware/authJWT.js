import jwt from "jsonwebtoken";
import User from "../models/users.js";

// Check if user log in
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    //Check if jwt exist & is verified
    if (token) {
        jwt.verify(token, process.env.SIGNATURE, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken)
                next();
            }
        });
    }
    else {
        res.redirect('login');
    }
}

// Check if user is admin or not
const isAdmin = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.SIGNATURE, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                res.status(403).send({ message: "1" });
            } else {
                console.log(decodedToken);
                // Get the ID of the user by jwt
                const user = await User.findById(decodedToken.id);
                console.log(decodedToken.id);
                res.locals.user = user;
                if (user.roleID != 0) {
                    res.status(403).send({ message: "User must be an admin to access this api" });
                }
            }
        });
    }
    else {
        res.locals.user = null;
        res.status(403).send({ message: "2" });
    }
}

const isRecruiter = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.SIGNATURE, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                // Get the ID of the user by jwt
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                if (user.roleID != 2 && user.roleID != 0) {
                    res.status(403).send({ message: "User must be an recruiter to access this api" });
                }
                next();
            }
        });
    }
    else {
        res.locals.user = null;
        next();
    }
}

export default {
    requireAuth,
    isAdmin,
    isRecruiter
}