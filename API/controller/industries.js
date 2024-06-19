import { industrieDAO } from "../dao/index.js";

const getAllIndustries = async (req, res) => {
    try {
        const industries = await industrieDAO.getAllIndustries();
        res.status(200).json(industries);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
}

export default {
    getAllIndustries
}