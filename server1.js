function submitWord() {
  let word = document.getElementById("WordField").value;
  let definition = document.getElementById("DefinitionField").value;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8083/words");
  xhr.setRequestHeader("Content-Type", "application/json");

  const body = JSON.stringify({
    word: word,
    definition: definition,
  });

  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(JSON.parse(xhr.responseText));
      alert("Word submitted successfully!");
      document.dispatchEvent(
        new CustomEvent("wordSubmitted", { detail: { word: word } })
      );
    } else {
      console.log(`Error: ${xhr.status}`);
      alert("Error submitting word. Please try again.");
    }
  };
  xhr.send(body);
}

function searchWord() {
  let word = document.getElementById("WordField").value;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost:8083/words?word=${word}`);

  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(JSON.parse(xhr.responseText));
      const response = JSON.parse(xhr.responseText);
      const definition = response.definition;
      if (definition) {
        alert(`Definition: ${definition}`);
      } else {
        alert("Word not found.");
      }
    } else {
      console.log(`Error: ${xhr.status}`);
      alert("Error searching for word. Please try again.");
    }
  };
  xhr.send();
}

console.log("sending");
