
import { useState } from "react";

export function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);

  async function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        try {
          // Replace `http://localhost:3000` with your server URL if different
          const response = await fetch("http://localhost:3000/save-position", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Set the content type to JSON
            },
            body: JSON.stringify({
              userId: "some-user-id", // Replace with actual user ID if applicable
              position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
            }),
          });

          if (!response.ok) {
            // Check if the response was not successful
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json(); // Parse the JSON response
          console.log("Position saved successfully", data);
        } catch (error) {
          console.error("Error saving position:", error);
        }
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}
