import mongoose from "mongoose";
import app from "../app";
import request from "supertest";
import dotenv from "dotenv";
import template_model from "../models/template.model";
dotenv.config({
  path: "../.env",
});

// Setup for testing
beforeAll(async () => {
  const uri = process.env.MONGODB_URI_TEST;
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});
let id;
afterAll(async () => {
  await mongoose.connection.dropDatabase(); // Drop test database after tests
  await mongoose.connection.close(); // Close the DB connection
});

describe("POST /template/create", () => {
  it("should create a new message template successfully", async () => {
    const requestBody = {
      title: "hello",
      description:
        "Hi {{name}}, We’re thrilled to offer you {{product}} on your next purchase.",
      footer: "limited offer",
      Variables: {
        "{{name}}": "junaid",
        "{{product}}": "shoe",
      },
      buttons: {
        1: "yes",
        2: "no",
      },
    };

    const response = await request(app)
      .post("/template/create")
      .send(requestBody);
    expect(response.body.statusCode).toBe(201);
    expect(response.body.message).toBe("message template created successfully");
    expect(response.body.success).toBe(true);
  });

  it("should return 400 for missing required fields", async () => {
    const invalidRequestBody = {
      title: "hello",
    };

    const response = await request(app)
      .post("/template/create")
      .send(invalidRequestBody);

    expect(response.body.statusCode).toBe(400);
    expect(response.body).toHaveProperty("statusCode", 400);
    expect(response.body).toHaveProperty("message", "Invalid input data");
  });
});

describe("GET /template", () => {
  it("should retrieve all message templates successfully", async () => {
    const requestBody = {
      title: "hello",
      description:
        "Hi {{name}}, We’re thrilled to offer you {{product}} on your next purchase.",
      footer: "limited offer",
      Variables: {
        "{{name}}": "junaid",
        "{{product}}": "shoe",
      },
      buttons: {
        1: "yes",
        2: "no",
      },
    };

    await template_model.create(requestBody);

    const response = await request(app).get("/template/getAll");
    // Test for a successful response (status 200)
    expect(response.status).toBe(200);
    expect(response.body.statusCode).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeGreaterThan(0); // Ensure there is at least one template
  });
});

describe("GET /template/get", () => {
  it("should retrieve a specific message template successfully", async () => {
    // Sample request body to create a template
    const requestBody = {
      title: "hello",
      description:
        "Hi {{name}}, We’re thrilled to offer you {{product}} on your next purchase.",
      footer: "limited offer",
      Variables: {
        "{{name}}": "junaid",
        "{{product}}": "shoe",
      },
      buttons: {
        1: "yes",
        2: "no",
      },
    };

    const createdTemplate = await template_model.create(requestBody);

    const response = await request(app)
      .get("/template/get")
      .query({ id: createdTemplate._id.toString() });
    console.log(createdTemplate._id, response.body);

    // Test for a successful response (status 200)
    expect(response.body.statusCode).toBe(200);
    expect(response.body.data).toHaveProperty("title");
    expect(response.body.data).toHaveProperty("description");
    expect(response.body.data).toHaveProperty("footer");
    expect(response.body.data).toHaveProperty("Variables");
    expect(response.body.data).toHaveProperty("buttons");
  });

  it("should return 400 for missing or invalid ID", async () => {
    // Test with no ID or invalid ID
    const response = await request(app).get("/template/get").query({});

    expect(response.status).toBe(400);
    expect(response.body.statusCode).toBe(400);
    expect(response.body.message).toBe("Invalid or missing ID parameter");
  });

  it("should return 404 for template not found", async () => {
    // Use a random ID that does not exist in the database
    const invalidId = "64cabc72f12e4567890abcdf"; // Modify to a non-existing ID
    const response = await request(app)
      .get("/template/get")
      .query({ id: invalidId });

    expect(response.status).toBe(404);
    expect(response.body.statusCode).toBe(404);
    expect(response.body.message).toBe("Template not found");
  });
});

describe("PUT /template/update", () => {
  let templateId;

  beforeAll(async () => {
    // Creating a template before running tests for updating
    const newTemplate = {
      title: "hello",
      description:
        "Hi {{name}}, We’re thrilled to offer you {{product}} on your next purchase.",
      footer: "limited offer",
      Variables: {
        "{{name}}": "junaid",
        "{{product}}": "shoe",
      },
      buttons: {
        1: "yes",
        2: "no",
      },
    };
    const createdTemplate = await template_model.create(newTemplate);

    templateId = createdTemplate._id.toString();
  });

  it("should update a message template successfully", async () => {
    const updatedTemplate = {
      _id: templateId,
      title: "Updated Template",
      description:
        "Hi {{name}}, We’re excited to offer you {{product}} on your next purchase with a discount.",
      footer: "New offer",
      Variables: {
        "{{name}}": "junaid",
        "{{product}}": "shoe",
      },
      buttons: {
        1: "yes",
        2: "no",
      },
    };

    const response = await request(app)
      .put("/template/update")
      .send(updatedTemplate);
    expect(response.body.statusCode).toBe(200);
    expect(response.body.message).toBe("message template updated successfully");
  });

  it("should return 400 for invalid or missing fields", async () => {
    const invalidTemplate = {
      title: "Updated Template", // Missing _id and other required fields
    };

    const response = await request(app)
      .put("/template/update")
      .send(invalidTemplate);

    expect(response.body.statusCode).toBe(400);
    expect(response.body.message).toBe("Invalid request body");
  });

    it("should return 404 for non-existing template ID", async () => {
      const nonExistingTemplateId = "64cabc72f12e4567890abcdef"; // Invalid template ID

      const invalidTemplate = {
        _id: nonExistingTemplateId,
        title: "Updated Template",
        description: "This template does not exist.",
        footer: "Error",
        Variables: {},
        buttons: {},
      };

      const response = await request(app)
        .put("/template/update")
        .send(invalidTemplate);

    
      expect(response.body.statusCode).toBe(400);
      expect(response.body.message).toBe("Invalid request body");
    });
});
