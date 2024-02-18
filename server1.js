function submitWord() {
  let word = document.getElementById("WordField").value;
  let definition = document.getElementById("DefinitionField").value;

  // Update the request to use the Heroku URL and HTTPS
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://kavinadamserver2lab4comp4537-077a78cd5518.herokuapp.com/api/definitions");
  xhr.setRequestHeader("Content-Type", "application/json");

  const body = JSON.stringify({
    word: word,
    definition: definition,
  });

  xhr.onload = () => {
    if (xhr.readyState == 4) {
      const response = JSON.parse(xhr.responseText);
      if (xhr.status == 200) {
        console.log(response);
        alert("Word submitted successfully!");
        document.dispatchEvent(
          new CustomEvent("wordSubmitted", { detail: { word: word } })
        );
      } else {
        // Updated to display error message from the server response
        alert(`Error: ${response.error}`);
      }
    }
  };
  xhr.send(body);
}

function searchWord() {
  let word = document.getElementById("WordField").value;

  // Update the request to use the Heroku URL and HTTPS
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `https://kavinadamserver2lab4comp4537-077a78cd5518.herokuapp.com/api/definitions?word=${word}`);

  xhr.onload = () => {
    if (xhr.readyState == 4) {
      const response = JSON.parse(xhr.responseText);
      if (xhr.status == 200) {
        console.log(response);
        const definition = response.definition;
        if (definition && definition !== "Word not found") {
          alert(`Definition: ${definition}`);
        } else {
          // Changed to display a more user-friendly message
          alert("Word not found. Please try another word.");
        }
      } else {
        // Updated to display error message from the server response
        alert(`Error: ${response.error}`);
      }
    }
  };
  xhr.send();
}

// Removed the console.log("sending") as it is not needed
