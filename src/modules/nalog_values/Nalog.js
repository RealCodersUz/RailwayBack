const mongoose = require("mongoose");

const nalogSchema = new mongoose.Schema(
  {
    branch_name: {
      type: mongoose.SchemaTypes.String,
    },
    month: {
      type: mongoose.SchemaTypes.String,
    },
    year: {
      type: mongoose.SchemaTypes.String,
    },
    file: {
      type: mongoose.SchemaTypes.Array,
    },
    debit: {
      type: mongoose.SchemaTypes.Array,
    },
    kredit: {
      type: mongoose.SchemaTypes.Array,
    },
    is_deleted: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Nalog = mongoose.model("Nalog", nalogSchema);

module.exports = Nalog;
