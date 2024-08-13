// controllers/campaignController.js
import mailchimp, { getLists } from '../config/mailchimp.js';

/**
 * Obtiene todas las listas (audiences) de Mailchimp
 */
export const fetchLists = async (req, res) => {
  try {
    const lists = await getLists();
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lists', error });
  }
};





/**
 * Crea una nueva campaña en Mailchimp
 */
export const createCampaign = async (req, res) => {
  const { list_id, subject_line, title, from_name, reply_to } = req.body;

  try {
    const response = await mailchimp.campaigns.create({
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

    res.status(200).json({ message: 'Campaign created successfully', data: response });
  } catch (error) {
    console.error('Error details:', error.response ? error.response.body : error);
    res.status(500).json({
      message: 'Error creating campaign',
      error: error.response ? error.response.body : error.message
    });
  }
};

/**
 * Envía una campaña previamente creada
 */
export const sendCampaign = async (req, res) => {
  const campaignId = req.params.campaign_id;

  try {
    // Verifica que el campaignId no esté vacío
    if (!campaignId) {
      return res.status(400).json({ message: 'Campaign ID is required' });
    }

    const response = await mailchimp.campaigns.send(campaignId);
    res.status(200).json({ message: 'Campaign sent successfully', data: response });
  } catch (error) {
    // Captura y muestra más detalles del error
    console.error('Error details:', error.response ? error.response.body : error);
    res.status(500).json({
      message: 'Error sending campaign',
      error: error.response ? error.response.body : error.message
    });
  }
};


/**
 * Obtiene los detalles de una campaña
 */
export const getCampaignDetails = async (req, res) => {
  const campaignId = req.params.campaign_id;

  try {
    const response = await mailchimp.campaigns.get(campaignId);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaign details', error: error.message });
  }
};