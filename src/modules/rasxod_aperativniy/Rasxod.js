const mongoose = require("mongoose");

const RasxodSchema = new mongoose.Schema(
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
      unique: false,
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

const Rasxod = mongoose.model("Rasxod", RasxodSchema);

module.exports = Rasxod;
