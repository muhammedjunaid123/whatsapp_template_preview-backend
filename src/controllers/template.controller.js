import {
  create_template_repo,
  get_template_repo,
  getAll_template_repo,
  update_template_repo,
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
const get_template = asyncHandler(async (req, res) => {
  const data = await get_template_repo(req.query.id);
  res.json(new apiResponse(200, data));
});
const update_template = asyncHandler(async (req, res) => {
  const data = await update_template_repo(req.body);
  if (data) {
    res.json(new apiResponse(200, [], "message template updated successfully"));
  }
});
export { create_template, getAll_template, get_template, update_template };
