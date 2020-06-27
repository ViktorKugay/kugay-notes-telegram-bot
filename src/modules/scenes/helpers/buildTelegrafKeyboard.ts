import {Markup} from 'telegraf';

export function buildTelegrafKeyboard(markup: string[][] | string[]) {
  return Markup.keyboard(markup)
    .oneTime()
    .resize()
    .extra();
}

export function buildTelegrafMessageKeyboard(markup: string[]) {
  return Markup.inlineKeyboard(markup.map(value => Markup.callbackButton(value, value))).extra();
}
