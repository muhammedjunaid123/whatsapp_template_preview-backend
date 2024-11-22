import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger Express API",
      version: "1.0.0",
      description:
        "WhatsApp Template Management System Easily manage your WhatsApp templates with features to create new templates, list existing ones, and update them as needed. Use the search and pagination options for efficient navigation through your templates",
    },
    servers: [
      {
        url: `http://localhost:3000/`,
        description: "Development server",
      },
    ],
  },

  apis: ["./src/routers/*.js", "./src/models/*.js"],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
