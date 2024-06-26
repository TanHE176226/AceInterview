import Companies from "../models/companies.js";
import createError from 'http-errors';

const getAllCompanies = async () => {
    try{
        const companies = await Companies.find({}).exec();
        return companies;
    } catch(error) {
        throw createError(500, error.message);
    }
}

const searchCompanyByName = async (name) => {
    try {
        const companies = await Companies.find({ companyName: new RegExp(name, 'i')});
        return companies;
    } catch (error) {
        throw createError(500, error.message);
    }
}

const getCompanyDetailById = async (id) => {
    try {
        const company = await Companies.findById(id);
        return company;
    } catch (error) {
        throw createError(500, error.message);
    }
}

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
            companyStatus: companyData.companyStatus,
            logo: companyData.logo,
            businessLicense: companyData.businessLicense
        });
        await newCompany.save();
        return newCompany;
    } catch (error) {
        throw createError(500, error.message);
    }
};

export default {
    getAllCompanies, searchCompanyByName, getCompanyDetailById, createCompany
}