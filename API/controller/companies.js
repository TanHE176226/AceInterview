import { companiesDAO } from "../dao/index.js";

const getAllCompanies = async (req, res) => {
    try {
        const companies = await companiesDAO.getAllCompanies();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

const searchCompanyByName = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ error: 'Name query parameter is required' });
        }
        const companies = await companiesDAO.searchCompanyByName(name);
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

const getCompanyDetailById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'ID parameter is required' });
        }
        const company = await companiesDAO.getCompanyDetailById(id);
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default {
    getAllCompanies, searchCompanyByName, getCompanyDetailById
}