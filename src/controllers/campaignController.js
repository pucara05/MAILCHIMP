import mailchimpApi, { getLists, getTemplates } from "../config/mailchimp.js";
import campaing from "../models/Campaign.js";

export const getMailchimpLists = async (req, res) => {
  try {
    const lists = await getLists();
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch lists" });
  }
};

// crear campaña usando html
export const createCampaign = async (req, res) => {
  try {
    const { list_id, subject, from_name, reply_to, html_content } = req.body;

    // Crear la campaña
    const campaignResponse = await mailchimpApi.post("/campaigns", {
      type: "regular",
      recipients: { list_id },
      settings: {
        subject_line: subject,
        from_name,
        reply_to,
      },
    });

    const campaignId = campaignResponse.data.id;

    // Añadir contenido a la campaña
    const contentResponse = await mailchimpApi.put(
      `/campaigns/${campaignId}/content`,
      {
        html: html_content,
      }
    );

    res.status(201).json({
      message: "Campaign created and content added",
      campaignId,
      contentResponse: contentResponse.data,
    });
  } catch (error) {
    console.error(
      "Error creating campaign:",
      error.response?.data || error.message || error
    );

    // Capturar detalles específicos del error de Mailchimp si están disponibles
    const errorDetails =
      error.response?.data?.errors ||
      error.response?.data?.detail ||
      "Unknown error";

    res.status(500).json({
      error: "Failed to create campaign",
      details: errorDetails,
    });
  }
};

export const fetchTemplatesInfo = async (req, res) => {
  try {
    console.log("Fetching templates info..."); // Agrega esta línea para depuración
    const templatesInfo = await getTemplates();
    console.log("Templates info:", templatesInfo); // Agrega esta línea para depuración
    res.json(templatesInfo);
  } catch (error) {
    console.error("Error fetching templates info:", error); // Agrega esta línea para depuración
    res.status(500).send("Error retrieving templates information");
  }
};

// Crear campaña usando template_id
export const createCampaignWithTemplate = async (req, res) => {
  try {
    const { list_id, subject, from_name, reply_to, template_id } = req.body;

    // Validar los campos
    if (!list_id || !subject || !from_name || !reply_to || !template_id) {
      const missingFields = [];
      if (!list_id) missingFields.push("list_id");
      if (!subject) missingFields.push("subject");
      if (!from_name) missingFields.push("from_name");
      if (!reply_to) missingFields.push("reply_to");
      if (!template_id) missingFields.push("template_id");
      return res
        .status(400)
        .json({
          error: `Missing required fields: ${missingFields.join(", ")}`,
        });
    }

    // Comprobar que template_id sea un número
    if (isNaN(template_id)) {
      return res
        .status(400)
        .json({ error: "Invalid template_id. It should be a number." });
    }

    // Crear la campaña
    const campaignResponse = await mailchimpApi.post("/campaigns", {
      type: "regular",
      recipients: { list_id },
      settings: {
        subject_line: subject,
        from_name,
        reply_to,
        template_id: parseInt(template_id, 10), // Asegurar que sea un número
      },
    });

    const campaignId = campaignResponse.data.id;
//guardar campaña en la base de datos 
const NewCampaing = await campaing.create({
  campaingId: campaingId,
  listId: listId,
  subject,
  fromName: from_name,
  replyTo: reply_to,
  templateId: parseInt(templateId, 10),
  status: 'create',
});


    res
      .status(201)
      .json({ message: "Campaign created with template", campaignId, dbEntry: NewCampaing });
  } catch (error) {
    console.error(
      "Error creating campaign:",
      error.response ? error.response.data : error.message
    );

    // Más detalles sobre el error
    if (error.response) {
      // Errores específicos del API
      const { status, data } = error.response;
      console.error(
        `API Error - Status: ${status}, Response: ${JSON.stringify(data)}`
      );
      res
        .status(status)
        .json({
          error: data.detail || "Failed to create campaign with template",
        });
    } else {
      // Errores generales
      res
        .status(500)
        .json({ error: "Failed to create campaign with template" });
    }
  }
};

// Función para verificar si un template existe por ID
export const checkTemplateExists = async (req, res) => {
  const { templateId } = req.params;

  try {
    // Verifica la existencia del template
    const response = await mailchimpApi.get(`/templates/${templateId}`);
    console.log("Template exists:", response.data);

    // Responde con la información del template
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      console.error("Error details:", error.response.data.errors);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error:", error.message);
      res.status(500).send("Error checking template existence");
    }
  }
};

export const sendCampaign = async (req, res) => {
  try {
    const { campaign_id } = req.body;

    const sendResponse = await mailchimpApi.post(
      `/campaigns/${campaign_id}/actions/send`
    );

    res.status(200).json({ message: "Campaign sent successfully" });
  } catch (error) {
    console.error("Error sending campaign:", error);
    res.status(500).json({ error: "Failed to send campaign" });
  }
};
