import {
  create_template_repo,
  getAll_template_repo,
} from "../repositories/template.repository.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const create_template = asyncHandler(async (req, res) => {
  const template = await create_template_repo(req.body);
  if (template) {
    res.json(new apiResponse(201, [], "message template created successfully"));
  }
});
const getAll_template = asyncHandler(async (req, res) => {
  const allData = await getAll_template_repo();
  res.json(new apiResponse(200, allData));
});

export { create_template, getAll_template };
