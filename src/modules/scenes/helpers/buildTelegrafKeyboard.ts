import {Markup} from 'telegraf';

export function buildTelegrafKeyboard(markup: string[][] | string[]) {
  return Markup.keyboard(markup)
    .oneTime()
    .resize()
    .extra();
}
