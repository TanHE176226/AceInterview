import { companiesDAO } from "../dao/index.js";

const getAllCompanies = async(req, res) => {
    try{
        const companies = await companiesDAO.getAllCompanies();
        res.status(200).json(companies);
    } catch(error) {
        res.status(500).json({error: error.toString()});
    }
}

export default {
getAllCompanies
}