// Get the SOS button element
const sosButton = document.getElementById('sos-button');

// Add an event listener to the SOS button
sosButton.addEventListener('click', () => {
  // Get the user's current location using geolocation API
  navigator.geolocation.getCurrentPosition((position) => {
    const userLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    // Calculate the distance between the user and nearby users
    const nearbyUsers = getNearbyUsers(userLocation);

    // Send notifications to nearby users
    sendNotifications(nearbyUsers);
  });
});

// Function to get nearby users
function getNearbyUsers(userLocation) {
  // Query the database to get nearby users
  // For example, using MongoDB:
  const nearbyUsers = db.collection('users').find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [userLocation.lng, userLocation.lat],
        },
        $maxDistance: 1000, // 1 km radius
      },
    },
  });

  return nearbyUsers;
}

// Function to send notifications to nearby users
function sendNotifications(nearbyUsers) {
  // Use a notification library like Socket.IO or FCM to send notifications
  // For example, using Socket.IO:
  io.emit('sos-notification', {
    message: 'SOS alert from nearby user!',
    location: userLocation,
  });
}