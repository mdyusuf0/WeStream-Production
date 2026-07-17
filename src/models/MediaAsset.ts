import mongoose, { Schema } from "mongoose";

const MediaAssetSchema = new Schema({
  slotKey: { type: String, required: true, unique: true, index: true }, // e.g. "hero.backgroundVideo", "services.videoProduction.image"
  type: { type: String, enum: ["IMAGE", "VIDEO"], required: true },
  cloudinaryId: { type: String, required: true }, // Cloudinary public_id
  url: { type: String, required: true }, // Cloudinary secure_url
  altText: { type: String, default: "" },
  label: { type: String, required: true }, // human-readable name shown in admin UI
  pageContext: { type: String, required: true }, // e.g. "Home", "Services", "Work", "Team"
  updatedBy: { type: String, default: null }, // admin user email
}, { timestamps: true });

// Compound index for grouping and references
MediaAssetSchema.index({ pageContext: 1, slotKey: 1 });

export const MediaAsset = mongoose.models.MediaAsset || mongoose.model("MediaAsset", MediaAssetSchema);
export default MediaAsset;
