import * as SQLite from "expo-sqlite";
import Place from "../models/place";

const database = SQLite.openDatabase("places.db");

function createPlaceFromRow(dp) {
  place = new Place(
    dp.title,
    dp.imageUri,
    {
      address: dp.address,
      lat: dp.lat,
      lng: dp.lng,
    },
    dp.id
  );

  return place;
}

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `
        CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
      )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (
          title,
          imageUri,
          address,
          lat,
          lng
        ) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          const places = [];

          for (const dp of result.rows._array) {
            place = createPlaceFromRow(dp);
            places.push(place);
          }
          resolve(places);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaceDetails(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places WHERE id = ?`,
        [id],
        (_, result) => {
          const dp = result.rows._array[0];

          place = createPlaceFromRow(dp);

          resolve(place);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
