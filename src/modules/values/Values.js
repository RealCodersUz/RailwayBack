const mongoose = require("mongoose");

const valuesSchema = new mongoose.Schema(
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
    values: {
      type: mongoose.SchemaTypes.Array,
    },
    names: {
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

const Values = mongoose.model("Values", valuesSchema);

module.exports = Values;
