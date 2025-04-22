const brailleMap = {
  'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓',
  'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏',
  'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭',
  'y': '⠽', 'z': '⠵',
  'A': '⠠⠁', 'B': '⠠⠃', 'C': '⠠⠉', 'D': '⠠⠙', 'E': '⠠⠑', 'F': '⠠⠋', 'G': '⠠⠛',
  'H': '⠠⠓', 'I': '⠠⠊', 'J': '⠠⠚', 'K': '⠠⠅', 'L': '⠠⠇', 'M': '⠠⠍', 'N': '⠠⠝',
  'O': '⠠⠕', 'P': '⠠⠏', 'Q': '⠠⠟', 'R': '⠠⠗', 'S': '⠠⠎', 'T': '⠠⠞', 'U': '⠠⠥',
  'V': '⠠⠧', 'W': '⠠⠺', 'X': '⠠⠭', 'Y': '⠠⠽', 'Z': '⠠⠵',
  ' ': ' ', '\n': '\n', ',': '⠂', '.': '⠲', '?': '⠦', '!': '⠖', '-': '⠤', '\'': '⠄',
  ':': '⠒', ';': '⠆', '(': '⠐⠣', ')': '⠐⠜', '/': '⠸⠌', '"': '⠶', '@': '⠈⠁',
  '#': '⠼', '$': '⠈⠎', '%': '⠨⠴', '&': '⠯', '*': '⠔', '^': '⠨⠌', '_': '⠤⠤',
  '—': '⠐⠤', '0': '⠚', '1': '⠁', '2': '⠃', '3': '⠉', '4': '⠙', '5': '⠑',
  '6': '⠋', '7': '⠛', '8': '⠓', '9': '⠊'
};

const contractions = [
  { word: "could've", braille: '⠉⠙⠧' },
  { word: "shouldn't", braille: '⠩⠝⠞' },
  { word: "we'll", braille: '⠺⠑⠇⠇' },
  { word: "you", braille: '⠽⠕⠥' },
  { word: "we", braille: '⠺⠑' },
  { word: "and", braille: '⠯' },
  { word: "for", braille: '⠿' },
  { word: "the", braille: '⠮' },
  { word: "with", braille: '⠷' },
  { word: "of", braille: '⠷' },
  { word: "to", braille: '⠞' },
  { word: "by", braille: '⠃⠽' },
  { word: "be", braille: '⠃' },
  { word: "his", braille: '⠓' },
  { word: "was", braille: '⠺' },
  { word: "in", braille: '⠔' },
  { word: "it", braille: '⠊⠞' },
  { word: "Dr.", braille: '⠠⠙⠗⠲' },
  { word: "Mr.", braille: '⠠⠍⠗⠲' },
  { word: "St.", braille: '⠠⠎⠞⠲' }
];

const corrections = {
  "recieved": "received",
  "accomodate": "accommodate"
};

function correctSpelling(text) {
  for (let misspelled in corrections) {
    const regex = new RegExp(`\\b${misspelled}\\b`, 'gi');
    text = text.replace(regex, corrections[misspelled]);
  }
  return text;
}

function applyContractions(text) {
  const sortedContractions = contractions.sort((a, b) => b.word.length - a.word.length);
  for (let { word, braille } of sortedContractions) {
    const regex = new RegExp(`\\b${word.replace('.', '\\.')}\\b`, 'g');
    text = text.replace(regex, braille);
  }
  return text;
}

function translateToBraille(input) {
  if (!input.trim()) {
    throw new Error("Please enter text to convert.");
  }

  input = correctSpelling(input);

  input = input.replace(/\b(\d+\.\d+)\b/g, (match) => {
    const [integer, decimal] = match.split('.');
    let braille = '⠼';
    braille += integer.split('').map(d => brailleMap[d]).join('');
    braille += '⠲';
    braille += decimal.split('').map(d => brailleMap[d]).join('');
    return braille;
  });

  input = input.replace(/\b(\d+)\b/g, (match) => {
    return '⠼' + match.split('').map(d => brailleMap[d]).join('');
  });

  input = input.replace(/\b(\d+)\/(\d+)\b/g, (match, num, denom) => {
    let braille = '⠼';
    braille += num.split('').map(d => brailleMap[d]).join('');
    braille += '⠌';
    braille += denom.split('').map(d => brailleMap[d]).join('');
    return braille;
  });

  input = applyContractions(input);

  let brailleOutput = '';
  for (let char of input) {
    brailleOutput += brailleMap[char] || '⍰';
  }

  return brailleOutput;
}

document.getElementById('convertButton').addEventListener('click', () => {
  const input = document.getElementById('englishText').value;
  const outputDiv = document.getElementById('brailleOutput');
  const errorDiv = document.getElementById('errorMessage');

  errorDiv.textContent = '';
  outputDiv.textContent = '';

  try {
    const braille = translateToBraille(input);
    outputDiv.textContent = braille;
  } catch (error) {
    errorDiv.textContent = error.message;
  }
});
