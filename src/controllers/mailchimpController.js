// controllers/campaignController.js
import mailchimpApi, { getListMembers } from '../config/mailchimp.js';




/**
 * Crea una nueva campaña en Mailchimp
 */
/*
export const createCampaign = async (req, res) => {
  const { list_id, subject_line, title, from_name, reply_to } = req.body;

  try {
    // 1. Crear la campaña
    const campaignResponse = await mailchimp.campaigns.create({
      type: 'regular',
      recipients: {
        list_id: list_id
      },
      settings: {
        subject_line: subject_line,
        title: title,
        from_name: from_name,
        reply_to: reply_to
      }
    });

    const campaignId = campaignResponse.id;

    // 2. Configurar el contenido de la campaña
    const content = '<html><body><h1>Contenido de la campaña</h1></body></html>'; // Ejemplo de contenido
    await mailchimp.campaigns.setContent(campaignId, { html: content });

    // No es necesario finalizar la campaña en Mailchimp antes de enviarla, por lo que este paso se omite.

    res.status(200).json({ message: 'Campaign created successfully', data: campaignResponse });
  } catch (error) {
    console.error('Error details:', error.response ? error.response.body : error);
    res.status(500).json({
      message: 'Error creating campaign',
      error: error.response ? error.response.body : error.message
    });
  }
};
*/
//probando
/*
export const createCampaign = async (req, res) => {
  const { list_id, subject_line, title, from_name, reply_to } = req.body;

  try {
    // Crea la campaña
    const campaignResponse = await mailchimp.campaigns.create({
      type: 'regular',
      recipients: {
        list_id: list_id
      },
      settings: {
        subject_line: subject_line,
        title: title,
        from_name: from_name,
        reply_to: 'otrocorreo@valido.com' // Cambia temporalmente para pruebas
      }
    });

    const campaignId = campaignResponse.id;

    // Configura el contenido de la campaña
    const content = '<html><body><h1>Contenido de la campaña</h1></body></html>';
    await mailchimp.campaigns.setContent(campaignId, { html: content });

    res.status(200).json({ message: 'Campaign created successfully', data: campaignResponse });
  } catch (error) {
    console.error('Error details:', error.response ? error.response.body : error);
    res.status(500).json({
      message: 'Error creating campaign',
      error: error.response ? error.response.body : error.message
    });
  }
};






 // Envía una campaña previamente creada
 
export const sendCampaign = async (req, res) => {
  const campaignId = req.params.campaign_id;

  try {
    // Verifica que el campaignId no esté vacío
    if (!campaignId) {
      return res.status(400).json({ message: 'Campaign ID is required' });
    }

    // Obtener detalles de la campaña para verificar el estado
    const campaignDetails = await mailchimp.campaigns.get(campaignId);

    // Verificar que la campaña no haya sido enviada o no esté en proceso de envío
    if (campaignDetails.status === 'sent' || campaignDetails.status === 'sending') {
      return res.status(400).json({ message: 'Campaign is already sent or sending' });
    }

    // Enviar la campaña
    const response = await mailchimp.campaigns.send(campaignId);
    res.status(200).json({ message: 'Campaign sent successfully', data: response });
  } catch (error) {
    console.error('Error details:', error.response ? error.response.body : error);
    res.status(500).json({
      message: 'Error sending campaign',
      error: error.response ? error.response.body : error.message
    });
  }
};





 // Obtiene los detalles de una campaña
 
export const getCampaignDetails = async (req, res) => {
  const campaignId = req.params.campaign_id;

  try {
    const response = await mailchimp.campaigns.get(campaignId);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaign details', error: error.message });
  }
};
*/

// uso de axios para controlador


/**
 * Crea una nueva campaña en Mailchimp y la envía.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
export const createAndSendCampaign = async (req, res) => {
  try {
    const { list_id, subject_line, title, from_name, reply_to } = req.body;

    // Crear la campaña
    const createResponse = await mailchimpApi.post('campaigns', {
      type: 'regular',
      recipients: {
        list_id,
      },
      settings: {
        subject_line,
        title,
        from_name,
        reply_to,
      }
    });

    const campaignId = createResponse.data.id;

    // Revisar el estado de la campaña antes de enviarla
    const checkStatus = await mailchimpApi.get(`campaigns/${campaignId}`);
    if (checkStatus.data.status === 'save') {
      // Enviar la campaña
      const sendResponse = await mailchimpApi.post(`campaigns/${campaignId}/actions/send`);
      res.status(200).json({
        message: 'Campaign created and sent successfully',
        campaign: sendResponse.data,
      });
    } else {
      res.status(400).json({ message: 'Campaign is not ready to be sent', status: checkStatus.data.status });
    }
  } catch (error) {
    console.error('Error creating or sending campaign:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Error creating or sending campaign', error: error.response.data });
  }
};





export const fetchListMembers = async (req, res) => {
  try {
    const { list_id } = req.params; // Asumiendo que pasas el list_id como parámetro
    const members = await getListMembers(list_id);
    
    if (members.length === 0) {
      return res.status(200).json({ message: 'No hay contactos en esta lista.' });
    }

    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching list members', error });
  }
};




export const fetchAllLists = async (req, res) => {
  try {
    const lists = await getAllLists();
    
    if (lists.length === 0) {
      return res.status(200).json({ message: 'No se encontraron listas en Mailchimp.' });
    }

    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lists', error });
  }
};


export const getAllListIds = async (req, res) => {
  try {
    const response = await mailchimpApi.get('/lists');
    const listIds = response.data.lists.map(list => list.id);
    res.json({ listIds });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};