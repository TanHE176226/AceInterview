import { companiesDAO } from "../dao/index.js";

const getAllCompanies = async (req, res) => {
    try {
        const companies = await companiesDAO.getAllCompanies();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

const getCompanyById = async (req, res) => {
    try {
        const { companyId } = req.params;
        const company = await companiesDAO.getCompanyById(companyId);
        if (company) {
            res.status(200).json(company);
        } else {
            res.status(404).json({ error: "Company not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

const createCompany = async (req, res) => {
    try {
        // Destructure req.body to extract necessary fields
        const {
            companyName,
            email,
            phoneNumber,
            location,
            taxNumber,
            numberOfEmployees,
            companyStatus
        } = req.body;

        // Optionally log the received company data for debugging

        // Create a new object containing extracted fields
        const companyData = {
            companyName,
            email,
            phoneNumber,
            location,
            taxNumber,
            numberOfEmployees,
            companyStatus
        };
        console.log('Received company data:', companyData);

        // Call companiesDAO.createCompany to save the company
        const newCompany = await companiesDAO.createCompany(companyData);

        // Respond with status 201 (Created) and the newly created company data
        res.status(201).json(newCompany);
    } catch (error) {
        // If an error occurs, respond with status 500 (Internal Server Error)
        // and send the error message as JSON
        res.status(500).json({ error: error.toString() });
    }
};


const updateCompany = async (req, res) => {
    try {
        const { companyId } = req.params;
        const companyData = req.body;
        const updatedCompany = await companiesDAO.updateCompany(companyId, companyData);
        if (updatedCompany) {
            res.status(200).json(updatedCompany);
        } else {
            res.status(404).json({ error: "Company not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

const deleteCompany = async (req, res) => {
    try {
        const { companyId } = req.params;
        const deletedCompany = await companiesDAO.deleteCompany(companyId);
        if (deletedCompany) {
            res.status(200).json(deletedCompany);
        } else {
            res.status(404).json({ error: "Company not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

export default {
    getAllCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany
};
