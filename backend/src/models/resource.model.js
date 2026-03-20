import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: String,
    category: String,
    tags: [String],
    url: String
  },
  {
    timestamps: true
  }
);

resourceSchema.index({ title: "text" });

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;