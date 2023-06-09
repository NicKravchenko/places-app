export class Place {
  constructor(title, imageUri, location, id) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng }; // {lat: 37.78825, lng: -122.4324}
    this.id = id; //new Date().getTime().toString() + Math.random().toString();
  }
}

export default Place;
