import {Quote} from '../quotes.types';

export function buildQuoteString({text, author}: Quote) {
  if (text[text.length - 1] === '.') {
    text = text.slice(0, text.length - 1);
  }
  return `❗️${text}❗️️️${author ? '\n\n' : ''}${author}©️`;
}
