import events from './events';
import { classNames } from './consts';

const spinner = document.querySelector('.spinner');
events.on('startFetching', () => {
  spinner.classList.remove(classNames.hide);
});
events.on('stopFetching', () => {
  spinner.classList.add(classNames.hide);
});
events.on('errorFetching', () => {
  spinner.classList.add(classNames.hide);
});
