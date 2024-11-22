import { Router } from "express";
import { create_template, getAll_template } from "../controllers/template.controller.js";
const route = Router();

route.route('/create').post(create_template)
route.route('/getAll').get(getAll_template)

export default route;
