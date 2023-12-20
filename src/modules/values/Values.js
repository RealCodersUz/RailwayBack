const mongoose = require("mongoose");

const valuesSchema = new mongoose.Schema(
  {
    branch_name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },

    month: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    year: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    data: {
      type: mongoose.SchemaTypes.Array,
      unique: true,
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