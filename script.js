document.getElementById("convertButton").addEventListener("click", function() {
  convertToBraille();
});

function convertToBraille() {
  const inputText = document.getElementById("inputText").value;
  const brailleOutput = document.getElementById("brailleOutput");
  const brailleText = textToBraille(inputText);
  brailleOutput.textContent = brailleText; // Display the Braille output
}

function textToBraille(text) {
  const brailleMap = {
    "a": "⠁", "b": "⠃", "c": "⠉", "d": "⠙", "e": "⠑", "f": "⠋", "g": "⠛", "h": "⠓", "i": "⠊", "j": "⠚",
    "k": "⠅", "l": "⠇", "m": "⠍", "n": "⠝", "o": "⠕", "p": "⠏", "q": "⠟", "r": "⠗", "s": "⠎", "t": "⠞",
    "u": "⠥", "v": "⠧", "w": "⠺", "x": "⠭", "y": "⠽", "z": "⠵", " ": "⠄", ".": "⠲", ",": "⠂", "!": "⠖",
    "?": "⠦", "-": "⠤", "_": "⠠"
  };
  
  let braille = "";
  for (let i = 0; i < text.length; i++) {
    let char = text[i].toLowerCase();
    braille += brailleMap[char] || ""; // Add Braille equivalent or empty if no match
  }
  return braille;
}
