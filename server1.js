function submitWord(event) {
  event.preventDefault(); // Prevent form from submitting the traditional way
  let word = document.getElementById("WordField").value;
  let definition = document.getElementById("DefinitionField").value;

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
  let word = document.getElementById("WordFieldSearch").value;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", `https://kavinadamserver2lab4comp4537-077a78cd5518.herokuapp.com/api/definitions?word=${word}`);

  xhr.onload = () => {
    const response = JSON.parse(xhr.responseText);
    const resultElement = document.getElementById('searchResult');
    if (xhr.status === 200) {
      const definition = response.definition;
      if (definition !== "Word not found") {
        resultElement.innerHTML = `Definition: ${definition} <br> Total Requests: ${response.totalRequests} <br> Total Entries: ${response.totalEntries}`;
      } else {
        resultElement.textContent = "Word not found. Please try another word.";
      }
    } else {
      resultElement.textContent = `Error: ${response.error}`;
    }
  };

  xhr.onerror = () => {
    document.getElementById('searchResult').textContent = "An error occurred during the request.";
  };

  xhr.send();
}
