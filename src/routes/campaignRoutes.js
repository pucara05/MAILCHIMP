// routes/campaignRoutes.js
import express from 'express';
import { fetchLists, createCampaign, sendCampaign, getCampaignDetails } from '../controllers/mailchimpController.js';


const router = express.Router();

/**
 * @openapi
 * /api/lists:
 *   get:
 *     summary: Obtener todas las listas de Mailchimp
 *     description: Obtiene la información de todas las listas (audiences) de Mailchimp.
 *     responses:
 *       200:
 *         description: Lista de listas de Mailchimp
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lists:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID de la lista
 *                       name:
 *                         type: string
 *                         description: Nombre de la lista
 *       500:
 *         description: Error al obtener las listas
 */
router.get('/lists', fetchLists);

/**
 * @openapi
 * /api/campaigns:
 *   post:
 *     summary: Crear una nueva campaña
 *     description: Crea una nueva campaña en Mailchimp.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               list_id:
 *                 type: string
 *                 description: ID de la lista de Mailchimp
 *               subject_line:
 *                 type: string
 *                 description: Línea de asunto de la campaña
 *               title:
 *                 type: string
 *                 description: Título de la campaña
 *               from_name:
 *                 type: string
 *                 description: Nombre del remitente
 *               reply_to:
 *                 type: string
 *                 description: Correo de respuesta
 *     responses:
 *       200:
 *         description: Campaña creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Campaign created successfully'
 *                 data:
 *                   type: object
 *       500:
 *         description: Error al crear la campaña
 */
router.post('/campaigns', createCampaign);


// routes/campaignRoutes.js
/**
 * @openapi
 * /api/campaigns/{campaign_id}/send:
 *   post:
 *     summary: Enviar una campaña
 *     description: Envía una campaña previamente creada.
 *     parameters:
 *       - in: path
 *         name: campaign_id
 *         required: true
 *         description: ID de la campaña
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Campaña enviada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Error al enviar la campaña
 */
router.post('/campaigns/:campaign_id/send', sendCampaign);


/**
 * @openapi
 * /api/campaigns/{campaign_id}:
 *   get:
 *     summary: Obtener detalles de una campaña
 *     description: Obtiene los detalles de una campaña en Mailchimp.
 *     parameters:
 *       - in: path
 *         name: campaign_id
 *         required: true
 *         description: ID de la campaña
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles de la campaña
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Error al obtener los detalles de la campaña
 */
router.get('/campaigns/:campaign_id', getCampaignDetails);

export default router;
