const mongoose = require("mongoose");

const archiveSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: true,
      unique: true,
    },
    type: {
      type: mongoose.SchemaTypes.String,
      enum: ["rasxod", "shyot"],
      default: "rasxod",
      required: true,
    },
    month: {
      type: mongoose.SchemaTypes.String,
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

const Archive = mongoose.model("Archive", archiveSchema);

module.exports = Archive;
