import { userDAO } from "../dao/index.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import from '../middleware/authJWT.js';

let refreshTokens = [];

const getAllUsers = async (req, res) => {
    try {
        const users = await userDAO.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
}

const register = async (req, res) => {
    const { username, password, email, fullName } = req.body;

    try {
        // Kiểm tra xem email có tồn tại chưa
        const existingUser = await userDAO.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        // Kiểm tra xem các trường dữ liệu có hợp lệ không
        if (!username) {
            return res.status(400).json({ message: 'Thiếu tên đăng nhập' });
        }
        if (!password) {
            return res.status(400).json({ message: 'Thiếu mật khẩu' });
        }
        if (!email) {
            return res.status(400).json({ message: 'Thiếu email' });
        }
        if (!fullName) {
            return res.status(400).json({ message: 'Thiếu tên đầy đủ' });
        }

        // Hash password trước khi lưu
        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(password, salt);

        // Tạo người dùng mới với hash_password
        const newUser = await userDAO.createUser({
            username,
            hash_password,
            email,
            fullName,
            roleID: 1
        });

        return res.status(201).json({ message: 'Đăng ký thành công', user: newUser });
    } catch (error) {
        return res.status(500).json({ message: 'Đã xảy ra lỗi', error: error.message });
    }
};

const registerRecruiter = async (req, res) => {
    const { username, password, email, fullName, companiesID, BusinessLicense, Workplace } = req.body;

    try {
        // Kiểm tra xem email có tồn tại chưa
        const existingUser = await userDAO.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        // Kiểm tra xem các trường dữ liệu có hợp lệ không
        if (!username) {
            return res.status(400).json({ message: 'Thiếu tên đăng nhập' });
        }
        if (!password) {
            return res.status(400).json({ message: 'Thiếu mật khẩu' });
        }
        if (!email) {
            return res.status(400).json({ message: 'Thiếu email' });
        }
        if (!fullName) {
            return res.status(400).json({ message: 'Thiếu tên đầy đủ' });
        }

        // Hash password trước khi lưu
        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(password, salt);

        // Tạo người dùng mới với hash_password
        const newUser = await userDAO.createUser({
            username,
            hash_password,
            email,
            fullName,
            roleID: 2,
            companiesID,
            BusinessLicense,
            Workplace
        });

        return res.status(201).json({ message: 'Đăng ký thành công', user: newUser });
    } catch (error) {
        return res.status(500).json({ message: 'Đã xảy ra lỗi', error: error.message });
    }
};

function generateAccessToken(userID) {
    return jwt.sign(userID, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
};

const login = async (req, res) => {
    const { identifier, password } = req.body;

    try {
        const user = await userDAO.findUserByUsernameOrEmail(identifier);

        console.log("return2: ", user )
        
        if (!user) {
            console.log("return3: ", identifier )
            return res.status(404).json({
                success: false,
                message: 'User not found. Please check your username/email and try again.'
            });
        }

        const isMatch = await userDAO.comparePassword(user, password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect password. Please check your password and try again.'
            });
        }
    
        const userPayload = { id: user._id };

        const accessToken = generateAccessToken(userPayload);
        const refreshToken = jwt.sign(userPayload, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);

        // Set the access token in the response header
        res.set('Authorization', 'Bearer ' + accessToken);

        return res.status(200).json({ success: true, user, accessToken, refreshToken});


    } catch (error) {
        console.error(error);
        let errorMessage = 'An error occurred during login';
        if (error.name === 'MongoError') {
            errorMessage = 'Database error';
        } else if (error.name === 'ValidationError') {
            errorMessage = 'Validation error';
        }
        return res.status(500).json({ success: false, message: errorMessage, error: error.message });
    }
};

const deleteRefreshTokes = async (req, res) => {
    console.log("returnn: ", refreshTokens)
    refreshTokens = refreshTokens.filter(token => token != req.body.token);
    res.status(204).json({success: true});
}

const getNewAccessTokens = async (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.status(401).json({success: false, message:"refesh token not found"});
    // Make sure the refresh token is still valid
    if (!refreshTokens.includes(refreshToken)) return res.status(403).json({success:false, message:"refesh token is invalid"});
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({success:false, message:"false token"});
        const accessToken = generateAccessToken({ name: user.name });
        res.json({ accessToken: accessToken });
    })
}

export default {
    login, registerRecruiter, register, getAllUsers, deleteRefreshTokes, getNewAccessTokens
};
