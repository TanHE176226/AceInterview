import { companiesDAO } from "../dao/index.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


// Lấy đường dẫn hiện tại
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const createCompany = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

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
        console.log('Received company data:', req.body);

        // Check if both files are uploaded
        if (!req.files.logo || !req.files.businessLicense) {
            return res.status(400).send('Both logo and BusinessLicense files are required.');
        }

        let logoFile = req.files.logo;
        let businessLicenseFile = req.files.businessLicense;

        const logoUploadPath = path.join(__dirname, '../uploads/', logoFile.name);
        const businessLicenseUploadPath = path.join(__dirname, '../uploads/', businessLicenseFile.name);

        // Save the logo file
        logoFile.mv(logoUploadPath, async (err) => {
            if (err) {
                return res.status(500).send(err);
            }

            // Save the BusinessLicense file
            businessLicenseFile.mv(businessLicenseUploadPath, async (err) => {
                if (err) {
                    return res.status(500).send(err);
                }

                try {
                    // Create a new object containing extracted fields
                    const companyData = {
                        companyName,
                        email,
                        phoneNumber,
                        location,
                        taxNumber,
                        numberOfEmployees,
                        companyStatus,
                        logo: logoUploadPath, // Include logo path
                        businessLicense: businessLicenseUploadPath // Include BusinessLicense path
                    };

                    // Call companyDAO.createCompany to save the company
                    const newCompany = await companiesDAO.createCompany(companyData);

                    // Respond with status 201 (Created) and the newly created company data
                    res.status(200).json(newCompany);
                } catch (error) {
                    // If an error occurs, respond with status 500 (Internal Server Error)
                    // and send the error message as JSON
                    res.status(500).json({ error: error.message });
                }
            });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    getAllCompanies, searchCompanyByName, getCompanyDetailById, createCompany
}