import Companies from "../models/companies.js";
import createError from 'http-errors';

const getAllCompanies = async () => {
    try {
        const companies = await Companies.find({}).exec();
        return companies;
    } catch (error) {
        throw createError(500, error.message);
    }
};

const getCompanyById = async (companyId) => {
    try {
        const company = await Companies.findById(companyId).exec();
        return company;
    } catch (error) {
        throw createError(500, error.message);
    }
};

const createCompany = async (companyData) => {
    try {
        console.log('Received company data:', companyData); // Log received data for debugging
        const newCompany = new Companies({
            companyName: companyData.companyName,
            email: companyData.email,
            phoneNumber: companyData.phoneNumber,
            location: companyData.location,
            taxNumber: companyData.taxNumber,
            numberOfEmployees: companyData.numberOfEmployees,
            companyStatus: companyData.companyStatus
        });
        await newCompany.save();
        return newCompany;
    } catch (error) {
        throw createError(500, error.message);
    }
};

const updateCompany = async (companyId, companyData) => {
    try {
        const updatedCompany = await Companies.findByIdAndUpdate(companyId, {
            companyName: companyData.companyName,
            email: companyData.email,
            phoneNumber: companyData.phoneNumber,
            location: companyData.location,
            taxNumber: companyData.taxNumber,
            numberOfEmployees: companyData.numberOfEmployees,
            companyStatus: companyData.companyStatus
        }, { new: true }).exec();
        return updatedCompany;
    } catch (error) {
        throw createError(500, error.message);
    }
};

const deleteCompany = async (companyId) => {
    try {
        const deletedCompany = await Companies.findByIdAndDelete(companyId).exec();
        return deletedCompany;
    } catch (error) {
        throw createError(500, error.message);
    }
};

export default {
    getAllCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany
};
