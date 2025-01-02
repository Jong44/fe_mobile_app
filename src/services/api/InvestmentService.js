import AxiosInstance from "./AxiosInstance";

export const createInvestment = async (investment) => {
    try {
        const response = await AxiosInstance.post("/investments", investment);
        return response.data;
    } catch (error) {
        throw error;
    }
}

