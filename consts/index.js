/* ============= WORK ENVIRONMENT ============= */

const EDEN = false;
const DEV_API = "http://192.168.1.6:3001";
const PROD_API = "";
const WORK_ENVIRONMENT = EDEN ? DEV_API : PROD_API;

/* ============= LINKS API REST ============= */

export const DATA_URL = `${WORK_ENVIRONMENT}/v1/me/`;
export const LOGIN_URL = `${WORK_ENVIRONMENT}/v1/login`;
export const REGISTER_URL = `${WORK_ENVIRONMENT}/v1/register`;
export const PROFILE_URL = `${WORK_ENVIRONMENT}/v1/me/profile/`;
export const PRODUCTS_URL = `${WORK_ENVIRONMENT}/v1/me/products/`;
export const PRODUCT_URL = `${WORK_ENVIRONMENT}/v1/me/product/`;
export const UPDATE_SUBDOMAIN_URL = `${WORK_ENVIRONMENT}/v1/me/update/url/`;
export const CHECKLIMITS_URL = `${WORK_ENVIRONMENT}/v1/me/checklimits/`;
export const INFO_PRODUCTS_URL = `${WORK_ENVIRONMENT}/v1/me/products/info/`;
export const GET_ENTREGAS_URL = `${WORK_ENVIRONMENT}/v1/me/entregas/`;
export const ENTREGA_URL = `${WORK_ENVIRONMENT}/v1/me/entrega/`;
export const GET_FINANZAS_URL = `${WORK_ENVIRONMENT}/v1/me/finanzas/`;
export const FINANZA_URL = `${WORK_ENVIRONMENT}/v1/me/finanza/`;
export const PREFERENCES_URL = `${WORK_ENVIRONMENT}/v1/me/preferences/`;

/* ============= TEXT CONSTANTS ============= */

export const VALIDATE_SESSION_URL = `${WORK_ENVIRONMENT}/v1/validate/`;
export const MAIN_NUMBER = "";
export const UPGRADE_TEXT = "¡Hola! Deseo actualizar mi cuenta al *plan mensual básico* de S/21.00 mi tienda es: ";
export const HELP_TEXT = "¡Hola! Necesito ayuda con: ";
export const HELP_URL = `https://api.whatsapp.com/send?phone=${MAIN_NUMBER}&text=${HELP_TEXT}`;
export const UPGRADE_URL =  `https://api.whatsapp.com/send?phone=${MAIN_NUMBER}&text=${UPGRADE_TEXT}`;
export const CONNECTION_ERROR = "¡Error de conexión!";
export const MAINTENANCE = true;
export const LIMITE_FINANZAS = 100;
export const LIMITE_ENTREGAS = 70;

/* ============= FIREBASE CONFIG ============= */

export const FIREBASE_URL = "https://firebasestorage.googleapis.com/v0/b/";
export const PRODUCT_FIREBASE_STORAGE = 1;
export const LOGO_FIREBASE_STORAGE = 1;