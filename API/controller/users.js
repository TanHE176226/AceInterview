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

const getUserDetails = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userDAO.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const deactivateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userDAO.deactivateUser(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const activateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userDAO.activateUser(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const getAllRecruiters = async (req, res) => {
    try {
        const recruiters = await userDAO.getAllRecruiters();
        res.status(200).json(recruiters);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const getInvalidatedRecruiters = async (req, res) => {
    try {
        const invalidatedRecruiters = await userDAO.getAllInvalidatedRecruiters();
        res.status(200).json(invalidatedRecruiters);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const validateRecruiter = async (req, res) => {
    try {
        const { userId } = req.params;
        const recruiter = await userDAO.validateRecruiter(userId);
        res.status(200).json(recruiter);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
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
            Workplace,
            isActive: false
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

        console.log("return2: ", user)

        if (!user) {
            console.log("return3: ", identifier)
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

        return res.status(200).json({ success: true, user, accessToken, refreshToken });


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
    res.status(204).json({ success: true });
}

const getNewAccessTokens = async (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.status(401).json({ success: false, message: "refesh token not found" });
    // Make sure the refresh token is still valid
    if (!refreshTokens.includes(refreshToken)) return res.status(403).json({ success: false, message: "refesh token is invalid" });
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ success: false, message: "false token" });
        const accessToken = generateAccessToken({ name: user.name });
        res.json({ accessToken: accessToken });
    })
}

const updateProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const { profileData, newPassword } = req.body;

        // Validate input (can be expanded as needed)
        if (!profileData && !newPassword) {
            return res.status(400).json({ message: 'Profile data or new password is required.' });
        }

        // Update profile if profileData is provided
        let updatedUser = null;
        if (profileData) {
            updatedUser = await userDAO.updateProfile(userId, profileData);
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found.' });
            }
        }

        // Update password if newPassword is provided
        if (newPassword) {
            const saltRounds = 10;
            const hashedPassword = bcrypt.hashSync(newPassword, saltRounds);
            updatedUser = await userDAO.updatePassword(userId, hashedPassword);
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found.' });
            }
        }

        res.status(200).json({ message: 'Profile and/or password updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const chooseCompany = async (req, res, next) => {
    try {
        const { userID, companyID } = req.body;
        const updatedUser = await userDAO.chooseCompany(userID, companyID);

        res.status(200).json({
            message: 'Updated successfully',
            user: updatedUser
        });
    } catch (error) {
        next(error);
    }
};

export default {
    getAllUsers,
    getUserDetails,
    deactivateUser,
    activateUser,
    getAllRecruiters,
    getInvalidatedRecruiters,
    validateRecruiter,
    login,
    register,
    registerRecruiter,
    chooseCompany,
    updateProfile,
    deleteRefreshTokes,
    getNewAccessTokens,
};

