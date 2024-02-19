function submitWord(event) {
  event.preventDefault(); // Prevent form from submitting the traditional way

    // Trims whitespace and retrieves input values for word and definition
  let word = document.getElementById("WordField").value.trim();
  let definition = document.getElementById("DefinitionField").value.trim();

  // Input validation: Check if inputs are non-empty and not just numbers
  if (!word || !definition || !isNaN(word) || !isNaN(definition)) {
    document.getElementById('submitResult').textContent = "Error: Word and definition must be non-empty strings and cannot be just numbers.";
    return; // Stop the function if validation fails
  }

    // Initializes a new XMLHttpRequest for asynchronous request
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://kavinadamserver2lab4comp4537-077a78cd5518.herokuapp.com/api/definitions");
  xhr.setRequestHeader("Content-Type", "application/json");

    // Converts word and definition into a JSON string for the request body
  const body = JSON.stringify({ word, definition });

    // Defines what happens on successful data submission
  xhr.onload = () => {
    const response = JSON.parse(xhr.responseText); // Parses the JSON response
    const resultElement = document.getElementById('submitResult');

        // Checks if the request was successful and updates the UI accordingly
    if (xhr.status === 200 || xhr.status === 201) {
      resultElement.innerHTML = `Word submitted successfully! <br> Total Requests: ${response.totalRequests} <br> Total Entries: ${response.totalEntries}`;
    } else {
      resultElement.textContent = `Error: ${response.error}`;
    }
  };

  // Defines what happens in case of an error during the request
  xhr.onerror = () => {
    document.getElementById('submitResult').textContent = "An error occurred during the request.";
  };

  // Sends the request with the word and definition as payload
  xhr.send(body);
}

// Prevents the default form submission to handle it with AJAX for search
function searchWord(event) {
  event.preventDefault(); // Prevent form from submitting the traditional way

    // Trims whitespace and retrieves the search input value
  let word = document.getElementById("WordFieldSearch").value.trim();

    // Validates the input to ensure it is non-empty and not numeric
  if (!word || !isNaN(word)) {
    document.getElementById('searchResult').textContent = "Error: Please enter a valid word (non-empty, non-numeric).";
    return; // Stop the function if validation fails
  }

    // Initializes a new XMLHttpRequest for asynchronous request
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `https://kavinadamserver2lab4comp4537-077a78cd5518.herokuapp.com/api/definitions?word=${word}`);

  // Defines what happens when the response is successfully received
  xhr.onload = () => {
    const response = JSON.parse(xhr.responseText); // Parses the JSON response
    const resultElement = document.getElementById('searchResult');
     // Displays definition if found, else shows a not found message
    if (xhr.status === 200) {
      if (response.definition !== undefined && response.definition !== "Word not found") {
        // Display the definition if the word is found
        resultElement.innerHTML = `Definition: ${response.definition}`;
      } else {
        // Show a not found message along with request details
        resultElement.textContent = `Request# ${response.totalRequests}: Word '${word}' not found.`;
      }
    } else {
      // Handle other errors
      resultElement.textContent = `Error: ${response.error}`;
    }
  };

  // Defines what happens in case of an error during the request
  xhr.onerror = () => {
    document.getElementById('searchResult').textContent = "An error occurred during the request.";
  };
  
// Sends the request to search for the word
  xhr.send();
}


