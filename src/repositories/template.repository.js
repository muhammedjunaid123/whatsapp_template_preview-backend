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
const getAll_template_repo = () => {
  return template_model.find();
};
const get_template_repo = (id) => {
  return template_model.findById({ _id: id });
};
const update_template_repo = (data) => {

  const { title, description, footer, Variables, buttons, _id } = data;
  return template_model.findByIdAndUpdate(
    { _id: _id },
    {
      $set: {
        title: title,
        description: description,
        footer: footer,
        Variables: Variables,
        buttons: buttons,
      },
    }
  );
};
export {
  create_template_repo,
  getAll_template_repo,
  get_template_repo,
  update_template_repo,
};
