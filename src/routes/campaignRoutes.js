import express from 'express';
import { createCampaign, sendCampaign, getMailchimpLists, createCampaignWithTemplate ,checkTemplateExists,fetchTemplatesInfo} from '../controllers/campaignController.js';

const router = express.Router();

/**
 * @swagger
 * /lists:
 *   get:
 *     summary: Get Mailchimp lists
 *     description: Retrieve all Mailchimp lists available in your account.
 *     responses:
 *       200:
 *         description: Lists retrieved successfully.
 *       500:
 *         description: Failed to fetch lists.
 */
router.get('/lists', getMailchimpLists);

/**
 * @swagger
 * /create-campaign:
 *   post:
 *     summary: Create a Mailchimp campaign
 *     description: Create a new campaign in Mailchimp.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               list_id:
 *                 type: string
 *                 description: The ID of the list to send the campaign to.
 *               subject:
 *                 type: string
 *                 description: The subject line for the campaign.
 *               from_name:
 *                 type: string
 *                 description: The name to show in the "From" field.
 *               reply_to:
 *                 type: string
 *                 description: The reply-to email address.
 *               html_content:
 *                 type: string
 *                 description: The HTML content of the campaign email.
 *     responses:
 *       201:
 *         description: Campaign created and content added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Campaign created and content added
 *                 campaignId:
 *                   type: string
 *                   example: e5f1d9e3b1
 *       500:
 *         description: Failed to create campaign.
 */
router.post('/create-campaign', createCampaign);


/**
 * @swagger
 * /templates/{id}:
 *   get:
 *     summary: Verificar la existencia de un template por ID
 *     description: Recupera la información de un template específico usando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del template
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Información del template
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del template
 *                 name:
 *                   type: string
 *                   description: Nombre del template
 *                 date_created:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación del template
 *       404:
 *         description: Template no encontrado
 *       500:
 *         description: Error al verificar la existencia del template
 */
router.get('/templates/{id}',checkTemplateExists )




/**
 * @swagger
 * /templates-info:
 *   get:
 *     summary: Obtener información detallada de las plantillas de Mailchimp
 *     description: Recupera información detallada sobre las plantillas, incluyendo ID, nombre y fecha de creación.
 *     responses:
 *       200:
 *         description: Información detallada de las plantillas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID de la plantilla
 *                   name:
 *                     type: string
 *                     description: Nombre de la plantilla
 *                   date_created:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de creación de la plantilla
 *       500:
 *         description: Error al recuperar la información de las plantillas
 */

router.get('/templates-info', fetchTemplatesInfo);


/**
 * @swagger
 * /create-campaign-with-template:
 *   post:
 *     summary: Create a Mailchimp campaign with a template
 *     description: Create a new campaign in Mailchimp using a predefined template.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               list_id:
 *                 type: string
 *                 description: The ID of the list to send the campaign to.
 *               subject:
 *                 type: string
 *                 description: The subject line for the campaign.
 *               from_name:
 *                 type: string
 *                 description: The name to show in the "From" field.
 *               reply_to:
 *                 type: string
 *                 description: The reply-to email address.
 *               template_id:
 *                 type: integer
 *                 description: The ID of the template to use for the campaign.
 *             required:
 *               - list_id
 *               - subject
 *               - from_name
 *               - reply_to
 *               - template_id
 *             example:
 *               list_id: "8072b52f6f"
 *               subject: "ofertazonnn"
 *               from_name: "daniel s"
 *               reply_to: "pucara05@gmail.com"
 *               template_id: 10003958
 *     responses:
 *       201:
 *         description: Campaign created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Campaign created with template"
 *                 campaignId:
 *                   type: string
 *                   example: "some_campaign_id"
 *       400:
 *         description: Bad request. Missing or invalid fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required fields: list_id, subject, from_name, reply_to, template_id"
 *       500:
 *         description: Failed to create campaign.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to create campaign with template"
 */
router.post('/create-campaign-with-template', createCampaignWithTemplate);




/**
 * @swagger
 * /send-campaign:
 *   post:
 *     summary: Send a Mailchimp campaign
 *     description: Send an existing Mailchimp campaign.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               campaign_id:
 *                 type: string
 *                 description: The ID of the campaign to send.
 *     responses:
 *       200:
 *         description: Campaign sent successfully.
 *       500:
 *         description: Failed to send campaign.
 */
router.post('/send-campaign', sendCampaign);

export default router;
