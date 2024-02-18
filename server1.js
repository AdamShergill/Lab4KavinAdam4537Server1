function submitWord(event) {
  event.preventDefault(); // Prevent form from submitting the traditional way
  let word = document.getElementById("WordField").value.trim();
  let definition = document.getElementById("DefinitionField").value.trim();

  // Input validation: Check if inputs are non-empty and not just numbers
  if (!word || !definition || !isNaN(word) || !isNaN(definition)) {
    document.getElementById('submitResult').textContent = "Error: Word and definition must be non-empty strings and cannot be just numbers.";
    return; // Stop the function if validation fails
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://kavinadamserver2lab4comp4537-077a78cd5518.herokuapp.com/api/definitions");
  xhr.setRequestHeader("Content-Type", "application/json");

  const body = JSON.stringify({ word, definition });

  xhr.onload = () => {
    const response = JSON.parse(xhr.responseText);
    const resultElement = document.getElementById('submitResult');
    if (xhr.status === 200 || xhr.status === 201) {
      resultElement.innerHTML = `Word submitted successfully! <br> Total Requests: ${response.totalRequests} <br> Total Entries: ${response.totalEntries}`;
    } else {
      resultElement.textContent = `Error: ${response.error}`;
    }
  };

  xhr.onerror = () => {
    document.getElementById('submitResult').textContent = "An error occurred during the request.";
  };

  xhr.send(body);
}


function searchWord(event) {
  event.preventDefault(); // Prevent form from submitting the traditional way
  let word = document.getElementById("WordFieldSearch").value.trim();

  if (!word || !isNaN(word)) {
    document.getElementById('searchResult').textContent = "Error: Please enter a valid word (non-empty, non-numeric).";
    return; // Stop the function if validation fails
  }

  const xhr = new XMLHttpRequest();
  xhr.open("GET", `https://kavinadamserver2lab4comp4537-077a78cd5518.herokuapp.com/api/definitions?word=${word}`);

  xhr.onload = () => {
    const response = JSON.parse(xhr.responseText);
    const resultElement = document.getElementById('searchResult');
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

  xhr.onerror = () => {
    document.getElementById('searchResult').textContent = "An error occurred during the request.";
  };

  xhr.send();
}


