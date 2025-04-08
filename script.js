// Braille alphabet mapping
const brailleAlphabet = {
  'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑',
  'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚',
  'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕',
  'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞',
  'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵',
  ' ': '⠄', '.': '⠲', ',': '⠂', '?': '⠦', "'": '⠄⠴',
  '"': '⠄⠲⠂', '(': '⠪', ')': '⠫', '!': '⠖', '-': '⠤',
  ':': '⠉⠲', ';': '⠆', '/': '⠌', '\\': '⠸', '_': '⠍⠆'
};

// Function to handle capitalization and convert text to Braille
function textToBraille(text) {
  function convertToBrailleCharacter(char) {
    if (char === char.toUpperCase() && char !== ' ' && brailleAlphabet[char.toLowerCase()]) {
      return '⠠' + brailleAlphabet[char.toLowerCase()]; // Capital sign (⠠) + Braille letter
    }
    return brailleAlphabet[char] || '';  // Default conversion for lowercase and punctuation
  }

  // Convert each character in the input text to Braille
  return text.split('').map(convertToBrailleCharacter).join('');
}

// Event listener for button click to convert text input to Braille
document.getElementById("convertButton").addEventListener("click", function() {
  const inputText = document.getElementById("inputText").value; // Get input text
  const brailleText = textToBraille(inputText);  // Convert text to Braille
  document.getElementById("brailleOutput").innerText = brailleText;  // Display Braille output
});
