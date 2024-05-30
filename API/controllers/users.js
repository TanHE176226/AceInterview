import { userDAO } from "../dao/index.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;
        const user = await userDAO.findUserByUsernameOrEmail(usernameOrEmail);

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. Invalid username/email or password.' });
        }

        // So sánh mật khẩu hash
        const passwordMatch = await bcrypt.compare(password, user.hash_password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Authentication failed. Invalid username/email or password.' });
        }

        const token = jwt.sign({ _id: user._id, roleID: user.roleID }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        return res.status(200).json({ message: 'Login successful.', token });
    } catch (er) {
        res.status(400).json({ er: er.message });
    }
};

export default {
    login
};