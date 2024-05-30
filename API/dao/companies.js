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

export default {
    getAllCompanies
}