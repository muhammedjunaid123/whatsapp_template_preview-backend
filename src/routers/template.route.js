import { Router } from "express";
import { create_template, get_template, getAll_template, update_template } from "../controllers/template.controller.js";
const route = Router();

route.route('/create').post(create_template)
route.route('/getAll').get(getAll_template)
route.route('/get').get(get_template)
route.route('/update').put(update_template)

export default route;
