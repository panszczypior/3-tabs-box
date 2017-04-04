import events from './events';
import { classNames } from './utils/consts';
import { spinner } from './domElements';

events.on('startFetching', () => {
  spinner.classList.remove(classNames.hide);
});
events.on('stopFetching', () => {
  spinner.classList.add(classNames.hide);
});
events.on('errorFetching', () => {
  spinner.classList.add(classNames.hide);
});
