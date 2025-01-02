import AxiosInstance from "./AxiosInstance";

export const getUserById = async (id) => {
    try {
        const response = await AxiosInstance.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}