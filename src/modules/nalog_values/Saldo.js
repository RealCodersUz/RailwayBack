const mongoose = require("mongoose");

const SaldoSchema = new mongoose.Schema(
  {
    branch_name: {
      type: mongoose.SchemaTypes.String,
    },
    date: {
      type: mongoose.SchemaTypes.String,
    },
    values: {
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

const Saldo = mongoose.model("Saldo", SaldoSchema);

module.exports = Saldo;
