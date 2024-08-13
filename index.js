import axios from "axios";

import { config } from "dotenv";
import mailchimp from "@mailchimp/mailchimp_marketing";

// Cargar las variables de entorno
config();

// Verificar que las variables de entorno estén configuradas correctamente
if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_REGION) {
  throw new Error(
    "Las variables de entorno para Mailchimp no están configuradas correctamente."
  );
}

// Configuración de Mailchimp utilizando variables de entorno
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_REGION,
});

// Obtener el ID de la lista por nombre
async function obtenerIdLista(listaNombre) {
  try {
    const response = await mailchimp.lists.getAllLists();
    const lista = response.lists.find((list) => list.name === listaNombre);
    if (!lista) {
      throw new Error(`La lista con el nombre "${listaNombre}" no fue encontrada.`);
    }
    return lista.id;
  } catch (error) {
    console.error("Error al obtener el ID de la lista:", error.message, error);
    throw error; // Lanza el error para que el flujo de control en la llamada lo maneje
  }
}

// Crear y programar una campaña
async function crearYProgramarCampaña(
  subject,
  fromEmail,
  listaNombre,
  content,
  sendTime
) {
  try {
    const listId = await obtenerIdLista(listaNombre);

    // Crear la campaña
    const campaignResponse = await mailchimp.campaigns.create({
      type: "regular",
      recipients: {
        list_id: listId,
      },
      settings: {
        subject_line: subject,
        from_name: "Tu Nombre", // Puedes hacer esto dinámico si es necesario
        reply_to: fromEmail,
        title: subject,
      },
    });

    const campaignId = campaignResponse?.id;
    if (!campaignId) {
      throw new Error("No se pudo crear la campaña.");
    }

    // Configurar el contenido de la campaña
    await mailchimp.campaigns.setContent(campaignId, {
      html: content,
    });

    // Programar el envío de la campaña
    await mailchimp.campaigns.schedule(campaignId, {
      send_time: sendTime,
    });

    console.log("Campaña creada y programada con éxito.");
  } catch (error) {
    console.error("Error al crear la campaña:", error.message, error);
  }
}

// Ejemplo de uso
async function main() {
  try {
    await crearYProgramarCampaña(
      "¡Nuevo producto",
      "danielcardenasvillamizar@gmail.com",
      "daniel c", // Nombre de tu lista
      "Contenido HTML de tu correo",
      "2024-04-01T09:00:00"
    );
  } catch (error) {
    console.error("Error en el proceso de creación y programación de la campaña:", error.message);
  }
}

main();
