import { Router } from "express";
import { create_template, get_template, getAll_template, update_template } from "../controllers/template.controller.js";
const route = Router();

/**
 * @swagger
 * /template/create:
 *   post:
 *     summary: Create a new message template
 *     description: Endpoint to create a new message template with dynamic variables and buttons.
 *     tags:
 *       - Templates
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the message template.
 *                 example: "hello"
 *               description:
 *                 type: string
 *                 description: Description of the message template, supporting dynamic variables.
 *                 example: "Hi {{name}}, We’re thrilled to offer you {{product}} on your next purchase."
 *               footer:
 *                 type: string
 *                 description: Footer text for the template.
 *                 example: "limited offer"
 *               Variables:
 *                 type: object
 *                 description: A map of dynamic variables used in the template, with keys matching placeholders in the description.
 *                 example:
 *                   {{name}}: "junaid"
 *                   {{product}}: "shoe"
 *               buttons:
 *                 type: object
 *                 description: A map of buttons, where keys are identifiers and values are button labels.
 *                 example:
 *                   1: "yes"
 *                   2: "no"
 *     responses:
 *       201:
 *         description: Message template created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                   example: []
 *                 message:
 *                   type: string
 *                   example: "message template created successfully"
 *       400:
 *         description: Bad Request. Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Invalid input data"
 *       500:
 *         description: Internal Server Error. Something went wrong.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

route.route('/create').post(create_template)

/**
 * @swagger
 * /template:
 *   get:
 *     summary: Retrieve all message templates
 *     description: Fetch all message templates from the database.
 *     tags:
 *       - Templates
 *     responses:
 *       200:
 *         description: A list of message templates.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         description: Title of the message template.
 *                         example: "hello"
 *                       description:
 *                         type: string
 *                         description: Description of the message template.
 *                         example: "Hi {{name}}, We’re thrilled to offer you {{product}} on your next purchase."
 *                       footer:
 *                         type: string
 *                         description: Footer text for the template.
 *                         example: "limited offer"
 *                       Variables:
 *                         type: object
 *                         description: Dynamic variables used in the template.
 *                         example:
 *                           {{name}}: "junaid"
 *                           {{product}}: "shoe"
 *                       buttons:
 *                         type: object
 *                         description: Buttons associated with the template.
 *                         example:
 *                           1: "yes"
 *                           2: "no"
 *       500:
 *         description: Internal Server Error. Something went wrong.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
route.route('/getAll').get(getAll_template)

/**
 * @swagger
 * /template/get:
 *   get:
 *     summary: Retrieve a specific message template
 *     description: Fetch a single message template based on the provided `id` query parameter.
 *     tags:
 *       - Templates
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the template to retrieve.
 *         example: "64cabc72f12e4567890abcde"
 *     responses:
 *       200:
 *         description: Successfully retrieved the message template.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       description: Title of the message template.
 *                       example: "hello"
 *                     description:
 *                       type: string
 *                       description: Description of the message template.
 *                       example: "Hi {{name}}, We’re thrilled to offer you {{product}} on your next purchase."
 *                     footer:
 *                       type: string
 *                       description: Footer text for the template.
 *                       example: "limited offer"
 *                     Variables:
 *                       type: object
 *                       description: Dynamic variables used in the template.
 *                       example:
 *                         {{name}}: "junaid"
 *                         {{product}}: "shoe"
 *                     buttons:
 *                       type: object
 *                       description: Buttons associated with the template.
 *                       example:
 *                         1: "yes"
 *                         2: "no"
 *       400:
 *         description: Bad Request. The `id` parameter is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Invalid or missing ID parameter"
 *       404:
 *         description: Template not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Template not found"
 *       500:
 *         description: Internal Server Error. Something went wrong.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

route.route('/get').get(get_template)

/**
 * @swagger
 * /template/update:
 *   put:
 *     summary: Update a message template
 *     description: Update an existing message template by providing the template ID and updated fields.
 *     tags:
 *       - Templates
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               _id:
 *                 type: string
 *                 description: Unique identifier of the template to update.
 *                 example: "64cabc72f12e4567890abcde"
 *               title:
 *                 type: string
 *                 description: Title of the message template.
 *                 example: "hello"
 *               description:
 *                 type: string
 *                 description: Description of the template with placeholders.
 *                 example: "Hi *{{name}}*,\nWe’re thrilled to offer you _*{{product}}*_ on your next purchase."
 *               footer:
 *                 type: string
 *                 description: Footer text of the template.
 *                 example: "super cool"
 *               Variables:
 *                 type: object
 *                 description: Dynamic variables for the template.
 *                 additionalProperties:
 *                   type: string
 *                 example:
 *                   "{{name}}": "junaid"
 *                   "{{product}}": "shoe"
 *               buttons:
 *                 type: object
 *                 description: Button text options for the template.
 *                 additionalProperties:
 *                   type: string
 *                 example:
 *                   "1": "yes"
 *                   "2": "no"
 *     responses:
 *       200:
 *         description: Template updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Message template updated successfully"
 *       400:
 *         description: Invalid or missing fields in the request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Invalid request body"
 *       404:
 *         description: Template not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Template not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

route.route('/update').put(update_template)

export default route;
