import template_model from "../models/template.model.js";

const create_template_repo = (data) => {
  const { title, description, footer, Variables, buttons } = data;
  const template = new template_model({
    title: title,
    description: description,
    footer: footer,
    Variables: Variables,
    buttons: buttons,
  });
  return template.save();
};
const getAll_template_repo=()=>{
    return template_model.find()
}

export { create_template_repo,getAll_template_repo };
