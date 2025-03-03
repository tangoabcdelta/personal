/**
 * Handle a stream of JSON responses from an API call
 * And form a sentence using a Postman post-response script.
 *
 * 1. The pm.response.json() function is used to get the response data from the API call.
 * 2. The response data is looped through using the forEach() method.
 * 3. In each iteration, the relevant data is extracted from the current item and added to the sentenceFragments array.
 * 4. After looping through all the items, the sentenceFragments array is joined into a single sentence using the join() method.
 * 5. The sentence is logged to the Postman console using the console.log() function.
 * 6. Finally, the sentence is set as a Postman variable using the pm.variables.set() function.
 *
 */

// Get the response data
const responseData = pm.response.json();

// Initialize an empty array to store the sentence fragments
let sentenceFragments = [];

// Loop through the response data
responseData.forEach((item) => {
  // Extract the relevant data from each item
  const fragment = item.fragment;

  // Add the fragment to the sentenceFragments array
  sentenceFragments.push(fragment);
});

// Join the sentence fragments into a single sentence
const sentence = sentenceFragments.join(" ");

// Log the sentence to the Postman console
console.log(sentence);

// Set the sentence as a Postman variable for future use
pm.variables.set("sentence", sentence);
