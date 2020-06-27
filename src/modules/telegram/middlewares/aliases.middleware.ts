import {ProjectTelegrafContext, TelegrafScene} from '../telegram.types';
import {Injectable} from '@nestjs/common';

enum AliasesAction {
  a_d = 'a_d',
}

interface ActionsData {
  act: AliasesAction,
  aliasId: string;
}

@Injectable()
export class AliasesMiddleware {
  public use = async (ctx: ProjectTelegrafContext, next: () => Promise<void>): Promise<void> => {
    const {aliases} = ctx.session.user;
    if (ctx.message && ctx.message.text) {
      const message = ctx.message.text;
      const alias = aliases.find(({alias}) => alias === message);
      if (alias) {
        ctx.scene.enter(alias.scene);
      }
    }

    if (ctx.update && ctx.update.callback_query && ctx.update.callback_query.data) {
      const actionData = jsonParse(ctx.update.callback_query.data);
      if (actionData) {
        await ctx.scene.enter(TelegrafScene.alias_delete_alias, {
          aliasId: actionData.aliasId,
          action: getAliasAction(actionData.act)
        })
      }
    }

    next();
  };
}

function getAliasAction(action: AliasesAction) {
  switch (action) {
    case AliasesAction.a_d: {
        return 'delete_alias';
    }

    default: {
      console.log('Unrecognize alias action');
    }
  }  
}

function jsonParse(string: string): ActionsData | null {
  try {
    return JSON.parse(string);
  } catch {
    return null;
  }
}