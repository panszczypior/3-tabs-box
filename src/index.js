import parsedLogs from './logs';
import { createList } from './helpers';

const renderLogs = () => {
  const {
    hostnames,
    files,
  } = parsedLogs;
  const topHostnames = hostnames.slice(0, 5);
  const topFiles = files.slice(0, 5);
  const list = createList({
    list: 'list',
    item: 'item',
  }, topHostnames);

  render('logs', list);
};

const renderFeeds = () => {
};

const renderFlickr = () => {
};

const render = (containerId, content) => {
  const container = document.getElementById(containerId);
  container.appendChild(content);
};

const initialTabId = '#logs';

const hashChangeHandler = () => {
  if (!location.hash) {
    return location.assign(initialTabId);
  }
  switch (location.hash) {
  case '#feeds':
    return '';
  case '#flickr':
    return '';
  default:
    renderLogs();
    break;
  }
};

const DOMContentLoadedHadler = () => {
  hashChangeHandler();
};

window.addEventListener('DOMContentLoaded', DOMContentLoadedHadler);

window.addEventListener('hashchange', hashChangeHandler);
