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
        const newCompany = new Companies(companyData);
        await newCompany.save();
        return newCompany;
    } catch (error) {
        throw createError(500, error.message);
    }
};

const updateCompany = async (companyId, companyData) => {
    try {
        const updatedCompany = await Companies.findByIdAndUpdate(companyId, companyData, { new: true }).exec();
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
