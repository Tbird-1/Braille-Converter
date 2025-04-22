// Updated script.js with punctuation support

const brailleMap = {
  "a": "⠁", "b": "⠃", "c": "⠉", "d": "⠙", "e": "⠑",
  "f": "⠋", "g": "⠛", "h": "⠓", "i": "⠊", "j": "⠚",
  "k": "⠅", "l": "⠇", "m": "⠍", "n": "⠝", "o": "⠕",
  "p": "⠏", "q": "⠟", "r": "⠗", "s": "⠎", "t": "⠞",
  "u": "⠥", "v": "⠧", "w": "⠺", "x": "⠭", "y": "⠽", "z": "⠵",
  "1": "⠁", "2": "⠃", "3": "⠉", "4": "⠙", "5": "⠑",
  "6": "⠋", "7": "⠛", "8": "⠓", "9": "⠊", "0": "⠚",
  " ": " ", "\n": "\n",
  ",": "⠂", ".": "⠲", "?": "⠦", "!": "⠖",
  "-": "⠤", "'": "⠄", ":": "⠒", ";": "⠆",
  "(": "⠦", ")": "⠴", "/": "⠌", "\"": "⠶"
};

function convertToBraille(text) {
  return text
    .toLowerCase()
    .split("")
    .map(char => brailleMap[char] || char)
    .join("");
}

document.getElementById("convertButton").addEventListener("click", () => {
  const input = document.getElementById("inputText").value;
  const output = convertToBraille(input);
  document.getElementById("brailleOutput").textContent = output;
});
