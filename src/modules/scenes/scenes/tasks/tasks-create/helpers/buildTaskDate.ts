import locales from '../../../../locales/ru.json';

export function buildTaskDate(date: any) {
  switch (date) {
    case locales.keyboards.date.today: {
      return new Date().toDateString();
    }

    case locales.keyboards.date.tomorrow: {
      const date = new Date();
      date.setDate(new Date().getDate() + 1);
      return date.toDateString();
    }

    case locales.keyboards.date.after_tomorrow: {
      const date = new Date();
      date.setDate(new Date().getDate() + 2);
      return date.toDateString();
    }

    default: {
      return new Date().toDateString();
    }
  }
}
