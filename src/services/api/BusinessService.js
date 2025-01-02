import AxiosInstance from './AxiosInstance';

export const getBusiness = async () => {
    try {
        const response = await AxiosInstance.get('/business');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getBusinessById = async (id) => {
    try {
        const response = await AxiosInstance.get(`/business/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getLogo = async (id) => {
    try {
        const response = await AxiosInstance.get(`/business/blob/logo/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getVideoPitch = async (id) => {
    try{
        const response = await AxiosInstance.get(`/business/blob/pitchdeck/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}