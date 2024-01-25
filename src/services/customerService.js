import axios from '../config/axiosConfig';

require("dotenv").config();

const apiUrl = process.env.REACT_APP_API_URL;

const url = apiUrl + '/customers'

const create = async (formData) => {
    try {
        await axios.post(url, formData);

        return { success: true, message: 'Cliente cadastrado com sucesso' };
    } catch (error) {
        console.error('Error on create customer:', error);
        return { success: false, message: 'Não foi possível salvar o cliente' };
    }
}

const edit = async (id, formData) => {
    try {
        await axios.put(url + '/' + id, formData);

        return { success: true, message: 'Cliente alterado com sucesso' };
    } catch (error) {
        console.error('Error on edit customer:', error);
        return { success: false, message: 'Não foi possível alterar o cliente' };
    }
}

const remove = async (ids) => {
    try {
        await axios.delete(url, {
            params: {
                'ids': ids.join(',')
            },
        });

        return { success: true, message: 'Cliente excluído com sucesso' };
    } catch (error) {
        console.error('Error on delete customer:', error);
        return { success: false, message: 'Não foi possível excluir o cliente' };
    }
}

const filter = async (params) => {
    try {
        const response = await axios.get(url, {
            params,
        });

        return { success: true, customers: response.data.content };
    } catch (error) {
        console.error('Error on delete customer:', error);
        return { success: false, customers: [], message: 'Não foi possível excluir o cliente' };
    }
}

export { create, edit, filter, remove };

