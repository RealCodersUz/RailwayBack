const mongoose = require("mongoose");

const AdmDataSchema = new mongoose.Schema(
  {
    month: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    year: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    values: {
      type: mongoose.SchemaTypes.Array,
      required: true,
    },
    names: {
      type: mongoose.SchemaTypes.Array,
      required: true,
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

const AdmData = mongoose.model("AdmData", AdmDataSchema);

module.exports = AdmData;
