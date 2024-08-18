import express from 'express';
import { createCampaign, sendCampaign, getMailchimpLists } from '../controllers/campaignController.js';

const router = express.Router();

/**
 * @swagger
 * /api/lists:
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
 * /api/create-campaign:
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
 * /api/send-campaign:
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
