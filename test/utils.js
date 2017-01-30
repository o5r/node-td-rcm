import test from 'ava';
import {numberPad, wordPad, fillWith, fillWithPattern} from '../lib/utils.js';

[{
  word: 'start',
  length: 10,
  fill: 'x',
  result: 'startxxxxx'
}, {
  word: 'start',
  length: 4,
  fill: 'x',
  result: 'start'
}, {
  word: 'start',
  length: 5,
  fill: 'x',
  result: 'start'
}, {
  word: 'start',
  length: 10,
  fill: undefined,
  result: 'start     '
}].forEach(({ word, length, fill, result }) => {
  test(`wordPad should return '${result}' with args '${word}', '${length}', '${fill}'`, t => {
    t.is(wordPad(word, length, fill), result);
  });
});

[{
  word: 'end',
  length: 10,
  fill: '0',
  result: '0000000end'
}, {
  word: 'end',
  length: 2,
  fill: '0',
  result: 'end'
}, {
  word: 'end',
  length: 3,
  fill: '0',
  result: 'end'
}, {
  word: 'end',
  length: 10,
  fill: undefined,
  result: '0000000end'
}].forEach(({ word, length, fill, result }) => {
  test(`numberPad should return '${result}' with args '${word}', '${length}', '${fill}'`, t => {
    t.is(numberPad(word, length, fill), result);
  });
});

[{
  length: 2,
  result: '  '
}, {
  length: undefined,
  result: ' '
}].forEach(({length, result}) => {
  test(`fillWith should return '${result}' with length = ${length}`, t => {
    t.is(fillWith(' ', length), result);
  });
});

[{
  pattern: '2N',
  result: '00'
}, {
  pattern: '2X',
  result: '  '
}, {
  pattern: '2X3N',
  result: '  000'
}, {
  pattern: '2N3X',
  result: '00   '
}].forEach(({pattern, result}) => {
  test(`fillWithPattern should return '${result}' with '${pattern}' pattern`, t => {
    t.is(fillWithPattern(pattern).join(''), result);
  });
});

test('fillWithPattern throw error with incorrect pattern', t => {
  const error = t.throws(() => {
    fillWithPattern('yolo');
  });

  t.is(error.message, 'invalid pattern');
});
