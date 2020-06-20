import {ProjectTelegrafContext} from '../../telegram/telegram.types';

interface ContextWithChatId {
  chat: {
    id: string;
  };
}

export function hasChat(ctx: ProjectTelegrafContext | ContextWithChatId): ctx is ContextWithChatId {
  return Boolean(ctx.chat && ctx.chat.id);
}
