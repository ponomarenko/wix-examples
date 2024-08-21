// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import {fetch} from 'wix-fetch';

// Event handler for the submit button
export function submitButton_click(event) {
  // Prevent the default form submission
  event.preventDefault();

  // Collect form data
  const formData = {
    name: $w('#input5').value,
    email: $w('#input4').value
  };

  // API endpoint URL
  const url = 'https://api.example.com/submit';

  // API request options
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  };

  // Send the form data to the external API
  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      // Handle the API response
      console.log('Success:', data);
      // You can also show a success message to the user here
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle errors here
    });
}

$w.onReady(function () {

	// Write your Javascript code here using the Velo framework API

	// Print hello world:
	// console.log("Hello world!");

	// Call functions on page elements, e.g.:
	// $w("#button1").label = "Click me!";

	// Click "Run", or Preview your site, to execute your code

});
