import { GOOGLE_MAPS_API } from "@env";

const API_KEY = GOOGLE_MAPS_API;

export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${lat},${lng}&key=${API_KEY}`;
  return imagePreviewUrl;
}

export async function getAdress(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch address. Please try again!");
  }

  const data = await response.json();
  const address = data.results[0].formatted_address;
  return address;
}
