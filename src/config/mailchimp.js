// config/mailchimp.js
import mailchimp from '@mailchimp/mailchimp_marketing';
import { config } from 'dotenv';

config(); // Cargar variables de entorno

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_REGION
});

/**
 * Obtiene todas las listas (audiences) de Mailchimp
 */
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
