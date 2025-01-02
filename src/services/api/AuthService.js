import AxiosInstance from "./AxiosInstance";

export const Login = async (email, password) => {
    try {
        const response = await AxiosInstance.post('/users/login', {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}