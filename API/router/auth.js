import express from "express";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

function generateAccessToken(userID) {
    return jwt.sign(userID, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
};

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

function authenticationToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // If there is no token provided
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
        // If token is no longer valid
        if (err) return res.sendStatus(403);

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

// Find way to store refresh token
let refreshTokens = [];

authRouter.get("/posts", authenticationToken, (req, res) => {
    res.json("posts");
});

authRouter.post("/login", (req, res) => {
    //Authentication user
    const username = req.body.username;
    const user = { name: username };

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken);
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

authRouter.post("/token", (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);
    // Make sure the refresh token is still valid
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name });
        res.json({ accessToken: accessToken });
    })
});

authRouter.delete("/logout", (req, res) => {
    refreshTokens = refreshTokens.filter(token => token != req.body.token);
    res.sendStatus(204);
});

export default authRouter;