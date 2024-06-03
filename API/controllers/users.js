import { userDAO } from "../dao/index.js";
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    const { username, password, email, fullName, roleID } = req.body;

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
        if (roleID === undefined) {
            return res.status(400).json({ message: 'Thiếu roleID' });
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
            roleID
        });

        return res.status(201).json({ message: 'Đăng ký thành công', user: newUser });
    } catch (error) {
        return res.status(500).json({ message: 'Đã xảy ra lỗi', error: error.message });
    }
};

const login = async (req, res) => {
    const { identifier, password } = req.body;

    try {
        let user = null;

        // Try to find user by username and password
        user = await userDAO.findUserByUsernameAndPassword(identifier, password);

        // If not found, try to find user by email and password
        if (!user) {
            user = await userDAO.findUserByEmailAndPassword(identifier, password);
        }

        if (!user) {
            console.log('User not found for identifier:', identifier);
            console.log('password', password);
            return res.status(401).send('Unauthorized: User not found');
        }

        const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).send('Internal Server Error');
    }
};

export default {
    login, register
};