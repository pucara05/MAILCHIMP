import mailchimpApi, { getLists } from '../config/mailchimp.js';

export const getMailchimpLists = async (req, res) => {
  try {
    const lists = await getLists();
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lists' });
  }
};


export const createCampaign = async (req, res) => {
  try {
    const { list_id, subject, from_name, reply_to, html_content } = req.body;

    // Crear la campaña
    const campaignResponse = await mailchimpApi.post('/campaigns', {
      type: 'regular',
      recipients: { list_id },
      settings: {
        subject_line: subject,
        from_name,
        reply_to,
      },
    });

    const campaignId = campaignResponse.data.id;

    // Añadir contenido a la campaña
    const contentResponse = await mailchimpApi.put(`/campaigns/${campaignId}/content`, {
      html: html_content,
    });

    res.status(201).json({ 
      message: 'Campaign created and content added', 
      campaignId,
      contentResponse: contentResponse.data,
    });

  } catch (error) {
    console.error('Error creating campaign:', error.response?.data || error.message || error);

    // Capturar detalles específicos del error de Mailchimp si están disponibles
    const errorDetails = error.response?.data?.errors || error.response?.data?.detail || 'Unknown error';

    res.status(500).json({ 
      error: 'Failed to create campaign', 
      details: errorDetails 
    });
  }
};




export const sendCampaign = async (req, res) => {
  try {
    const { campaign_id } = req.body;

    const sendResponse = await mailchimpApi.post(`/campaigns/${campaign_id}/actions/send`);

    res.status(200).json({ message: 'Campaign sent successfully' });
  } catch (error) {
    console.error('Error sending campaign:', error);
    res.status(500).json({ error: 'Failed to send campaign' });
  }
};
