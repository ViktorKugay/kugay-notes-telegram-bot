import {ProjectTelegrafContext} from '../../telegram/telegram.types';

interface ContextWithTextMessage {
  message: {
    text: string;
  };
}

export function hasTextMessage(ctx: ProjectTelegrafContext | ContextWithTextMessage): ctx is ContextWithTextMessage {
  return Boolean(ctx.message && ctx.message.text);
}
