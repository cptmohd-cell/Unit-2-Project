const mongoose = require("mongoose");

const partSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  partNumber: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Engine', 'Transmission', 'Brakes', 'Suspension', 'Electrical', 'Body', 'Interior', 'Exhaust', 'Cooling', 'Other']
  },
  manufacturer: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  condition: {
    type: String,
    required: true,
    enum: ['New', 'Used', 'Refurbished']
  },
  vehicleCompatibility: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, {
  timestamps: true,
});

const Part = mongoose.model("Part", partSchema);

module.exports = Part;
