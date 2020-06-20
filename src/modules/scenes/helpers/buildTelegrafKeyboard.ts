import {Markup, Extra} from 'telegraf';

export function buildTelegrafKeyboard(markup: string[][] | string[]) {
  return Markup.keyboard(markup)
    .oneTime()
    .resize()
    .extra();
}

export function buildTelegrafMessageKeyboard(markup: string[]) {
  return Extra.HTML().markup((m: any) => m.inlineKeyboard(markup.map(message => m.callbackButton(message, message))));
}
