/**
 * Add char after the word if length is less than expected
 *
 * @param  {String} word         Starting word
 * @param  {Number} length       Expected length
 * @param  {String} [char=' ']  Char to pad
 * @return {String}
 *
 */
function wordPad(word = '', length, char = ' ') {
  const cur = word.length;
  if (length <= cur) {
    return word;
  }
  const masked = length - cur;
  let filler = char;
  while (filler.length < masked) {
    filler += filler;
  }
  const fillerSlice = filler.slice(0, masked);
  return word + fillerSlice;
}

function numberPad(text = '', max, mask = '0') {
  text = String(text);
  const cur = text.length;

  if (max <= cur) {
    return String(text);
  }

  const masked = max - cur;
  let filler = String(mask) || ' ';

  while (filler.length < masked) {
    filler += filler;
  }
  const fillerSlice = filler.slice(0, masked);

  return fillerSlice + text;
}

/**
 * Return a word of specified char and length
 * @param  {String} char        Char to fill
 * @param  {Number} [length=1]
 * @return {String}
 */
function fillWith(char, length = 1) {
  return Array(length).fill(char).join('');
}

/**
 * Return string filled with specified pattern
 *
 * @param  {String}  pattern  Filling pattern like "2X3N" is two space and three zero
 * @return {String}
 */
function fillWithPattern(pattern) {
  const result = [];
  pattern = pattern.match(/(\d+(?:X|N))/g);

  if (!pattern) {
    throw new Error('invalid pattern');
  }

  pattern.forEach((block) => {
    const op = block.match(/(\d+)(X|N)/);
    const size = parseInt(op[1], 10);
    const char = op[2] === 'X' ? ' ': '0';

    result.push(Array(size).fill(char).join(''));
  });

  return result;
}

export {
  fillWith,
  wordPad,
  numberPad,
  fillWithPattern
};
