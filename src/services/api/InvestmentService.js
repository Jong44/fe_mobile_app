import AxiosInstance from "./AxiosInstance";

export const createInvestment = async (investment) => {
    try {
        const response = await AxiosInstance.post("/investments", investment);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getInvestmentsByUserId = async (userId) => {
    try {
        const response = await AxiosInstance.get("/investments/user/" + userId);
        return response.data;
    } catch (error) {
        throw error;
    }
}
