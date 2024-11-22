import mongoose from "mongoose";

const template_schema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    footer: {
      type: String,
    },
    Variables: {
      type: Map,
      of: String,
    },
    buttons: {
      type: Map,
      of: String,
    },
  },
  { timestamps: true }
);

const template_model = mongoose.model("template", template_schema);
export default template_model;
