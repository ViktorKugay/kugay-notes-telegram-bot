import {User} from '../../users.entity';

export function prepareUser(user: User): User {
  user.tasks = user.tasks ? user.tasks : [];
  user.aliases = user.aliases ? user.aliases : [];

  return user;
}
