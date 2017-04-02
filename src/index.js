import parsedLogs from './logs';
import { createList } from './helpers';
import feeds from './feeds';

const render = (container, content) => {
  container.appendChild(content);
};

const renderLogs = () => {
  const containerId = 'logs';
  const container = document.getElementById(containerId);
  if (!container.hasChildNodes()) {
    const {
      hostnames,
      files,
    } = parsedLogs;
    const topHostnames = hostnames.slice(0, 5);
    const topFiles = files.slice(0, 5);
    const hostsList = createList({
      list: 'list',
      item: 'item',
    }, topHostnames, 'logs');

    const filesList = createList({
      list: 'list',
      item: 'item',
    }, topFiles, 'logs');

    render(container, hostsList);
    render(container, filesList);
  }
};

const renderFeeds = () => {
  const containerId = 'feeds';
  const container = document.getElementById(containerId);
  if (!container.hasChildNodes()) {
    feeds.then((data) => {
      const feed = createList({
        list: 'list',
        item: 'item',
      }, data, 'feeds');
      render(container, feed);
    });
  }
};

const renderFlickr = () => {
};

const initialTabId = '#logs';

const hashChangeHandler = () => {
  if (!location.hash) {
    return location.assign(initialTabId);
  }
  switch (location.hash) {
  case '#feeds':
    return renderFeeds();
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
