import axios from "axios";
import {
    PROFILE_URL,
    LOGIN_URL,
    REGISTER_URL,
    PRODUCT_URL,
    PRODUCTS_URL,
    CHECKLIMITS_URL,
    DATA_URL,
    UPDATE_SUBDOMAIN_URL,
    GET_ENTREGAS_URL,
    ENTREGA_URL,
    INFO_PRODUCTS_URL,
    GET_FINANZAS_URL,
    FINANZA_URL,
    PREFERENCES_URL
} from "@consts/index";


export async function registrationService(data){
    try{
        const res = await axios.post(REGISTER_URL,data);
        return res.data;
    }catch(error){
        throw error;
    }
}

export async function getProfile(token = null){
    try{
        const res = await axios.get(PROFILE_URL+token);
        return res.data;
    }catch(error){
        throw error;
    }
}

export async function getProduct(token = null, id = 1){
    try{
        const res = await axios.get(PRODUCT_URL+`${id}/${token}`);
        return res.data;
    }catch(error){
        throw error;
    }
}

export async function updateProduct(token=null,id=1,data){
    try{
        const res = await axios.put(PRODUCT_URL+`${id}/${token}`,data);
        return res.data;
    }catch(error){
        throw error;
    }
}

export async function getProducts(token = null){
    try{
        const res = await axios.get(PRODUCTS_URL+token);
        return res.data;
    }catch(error){
        throw error;
    }
}

export async function getFinanzas(token = null){
    try{
        const res = await axios.get(GET_FINANZAS_URL+token);
        return res.data;
    }catch(error){
        throw error;
    }
}

export async function getTotalFinanzas(token = null){
    try{
        const res = await axios.get(`${GET_FINANZAS_URL}total/${token}`);
        return res.data;
    }catch(error){
        throw error;
    }
}


export async function getUserSession(data){
    try{
        const res = await axios.post(LOGIN_URL,data);
        return res.data;
    }catch(error){
        throw error;
    }
}

export async function postEntrega(token,data){
    try{
    const res = await axios.post(ENTREGA_URL+token,data);
    return res.data;
    }catch(error){
    throw error;
    }
}

export async function postFinanza(token,data){
    try{
        const res = await axios.post(FINANZA_URL+token,data);
        return res.data;
    }catch(error){
        throw error;
    }
}

export async function deleteFinanza(id = 1,token = null){
    try{
        const res = await axios.delete(FINANZA_URL+`${id}/${token}`);
        return res.data;
    }catch(error){
        throw error;
    }
}

export async function deleteProduct(id = 1,token = null){
    try{
        const res = await axios.delete(PRODUCT_URL+`${id}/${token}`);
        return res.data;
    }catch(error){
        throw error;
    }
}

export async function getLimits(token = null){
    try{
        const res = await axios.get(CHECKLIMITS_URL+token);
        return res.data;
    }catch(error){
        throw error;
    }
}

export async function saveProduct(token = null,data){
    try{
        const res = await axios.post(PRODUCT_URL+token,data);
        return res.data;
    }catch(error){
        throw error;
    }
}

export async function getInfoProductos(token = null){
    try{
    const res = await axios.get(INFO_PRODUCTS_URL+token);
    return res.data;
    }catch(error){
    throw error;
    }
}

export async function getMyData(token = null){
    try{
        const res = await axios.get(DATA_URL+token);
        return res.data;
    }catch(error){
        throw error;
    }
}

export async function getEntregas(token = null){
    try{
    const res = await axios.get(GET_ENTREGAS_URL+token);
    return res.data;
    }catch(error){
    throw error;
    }
}

export async function updateMyData(token = null, data){
    try{
        const res = await axios.put(DATA_URL+token,data);
        return res.data;
    }catch(error){
        throw error;
    }
}

export async function updateUrl(token = null, data){
    try{
        const res = await axios.put(UPDATE_SUBDOMAIN_URL+token,data);
        return res.data;
    }catch(error){
        throw error;
    }
}

//! SERVICIOS DE PREFERENCIAS

export async function getPreferences(token = null){
    try{
        const res = await axios.get(PREFERENCES_URL+token);
        return res.data;
    }catch(error){
        throw error;
    }
}

export async function updatePreferences(token,data){
    try{
        const res = await axios.put(PREFERENCES_URL+token,data);
        return res.data;
    }catch(error){
        throw error;
    }
}