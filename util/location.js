import { GOOGLE_MAPS_API } from "@env";

const API_KEY = GOOGLE_MAPS_API;

export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${lat},${lng}&key=${API_KEY}`;
  return imagePreviewUrl;
}
