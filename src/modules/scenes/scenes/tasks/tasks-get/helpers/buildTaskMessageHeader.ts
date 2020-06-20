import {buildTaskEmoji} from './buildTaskEmoji';

export function buildTaskMessageHeader(isActiveTask: boolean) {
  return `${buildTaskEmoji(isActiveTask)} Задача:`;
}
