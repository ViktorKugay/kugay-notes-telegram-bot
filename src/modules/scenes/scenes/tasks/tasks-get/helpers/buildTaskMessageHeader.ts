import {buildTaskEmoji} from './buildTaskEmoji';

export function buildTaskMessageHeader(isResolved: boolean) {
  return `${buildTaskEmoji(isResolved)} Задача:`;
}
