import parsedLogs from './logs';
import { createList, createGallery } from './helpers';
import feeds from './feeds';
import events from './events';
import flickrApi from './flickr';

const spinner = document.querySelector('.spinner');
events.on('startFetching', () => {
  spinner.classList.remove('hide');
});
events.on('stopFetching', () => {
  spinner.classList.add('hide');
});

const renderStaticContent = (container, content) => {
  container.appendChild(content);
};

const renderDynamicContent = (container, content) => {
  container.innerHTML = '';
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

    renderStaticContent(container, hostsList);
    renderStaticContent(container, filesList);
  }
};

const renderFeeds = () => {
  const containerId = 'feeds';
  const container = document.getElementById(containerId);
  feeds.get().then((data) => {
    const feed = createList({
      list: 'list',
      item: 'item',
    }, data, 'feeds');
    renderDynamicContent(container, feed);
  });
};

const renderFlickr = (text) => {
  const containerId = 'flickr';
  const container = document.getElementById(containerId);
  flickrApi.get(text).then((data) => {
    const flickr = createGallery({
      gallery: 'photos-container',
      photo: 'photo',
    }, data);
    renderStaticContent(container, flickr);
  });
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
    return renderFlickr();
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

const input = document.getElementById('input');
input.addEventListener('change', (e) => {
  renderFlickr(e.target.value);
  e.target.value = '';
});
