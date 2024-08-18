
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const mailchimpApi = axios.create({
  baseURL: `https://${process.env.MAILCHIMP_REGION}.api.mailchimp.com/3.0`,
  auth: {
    username: 'anystring', // Puede ser cualquier string, Mailchimp lo ignora
    password: process.env.MAILCHIMP_API_KEY // La clave API va aquí
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para verificar la respuesta del servidor
const checkServerResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    console.log('Request was successful:', response.status);
  } else {
    console.warn('Request was not successful:', response.status, response.statusText);
    throw new Error(`Request failed with status ${response.status}`);
  }
};

// Función para verificar si los datos se han cargado correctamente
const checkDataIntegrity = (data) => {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid data received from Mailchimp API');
  }
  console.log('Data integrity check passed');
};

// Función para obtener las listas de Mailchimp
export const getLists = async () => {
  try {
    const response = await mailchimpApi.get('/lists');
    checkServerResponse(response); // Verifica la respuesta del servidor
    checkDataIntegrity(response.data); // Verifica la integridad de los datos
    return response.data;
  } catch (error) {
    console.error('Error fetching lists:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default mailchimpApi;




/*

// config/mailchimp.js
import mailchimp from '@mailchimp/mailchimp_marketing';
import { config } from 'dotenv';

config(); // Cargar variables de entorno

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_REGION
});


// Obtiene todas las listas (audiences) de Mailchimp
 
export const getLists = async () => {
  try {
    const response = await mailchimp.lists.getAllLists();
    return response.lists;
  } catch (error) {
    console.error('Error fetching lists:', error);
    throw error;
  }
};



export default mailchimp;
*/