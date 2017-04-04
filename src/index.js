import logs from './logs';
import { createList, createGallery, debounce } from './helpers';
import feeds from './feeds';
import flickrApi from './flickr';
import { classNames, tabContentIds } from './consts';
import eventsSubs from './eventsSubscriptions'; /* eslint no-unused-vars:0 */

const clearPrevTab = (containerId) => {
  const elem = document.getElementById(containerId);
  if (elem) {
    elem.style.display = 'none';
  }
};

const renderStaticContent = (container, content) => {
  container.style.display = 'block';
  container.appendChild(content);
};

const renderDynamicContent = (container, content) => {
  container.style.display = 'block';
  container.innerHTML = '';
  container.appendChild(content);
};

const renderLogs = () => {
  const containerId = tabContentIds.logs;
  const container = document.getElementById(containerId);
  logs.get().then(({ hostnames, files }) => {
    const topHostnames = hostnames.slice(0, 5);
    const topFiles = files.slice(0, 5);
    const { list, listItem } = classNames;
    const hostsList = createList({
      list,
      item: listItem,
    }, topHostnames, tabContentIds.logs);

    const filesList = createList({
      list,
      item: listItem,
    }, topFiles, 'logs');
    container.innerHTML = '';
    renderStaticContent(container, hostsList);
    renderStaticContent(container, filesList);
  });
};

const renderFeeds = () => {
  const containerId = tabContentIds.feeds;
  const container = document.getElementById(containerId);
  feeds.get().then((data) => {
    const { list, listItem } = classNames;
    const feed = createList({
      list,
      item: listItem,
    }, data, tabContentIds.feeds);
    renderDynamicContent(container, feed);
  });
};

const renderFlickr = (text) => {
  const containerId = tabContentIds.flickr;
  const container = document.getElementById(containerId);
  // container.style.display = 'block';
  flickrApi.get(text).then((data) => {
    const flickr = createGallery({
      gallery: 'photos-container',
      photo: 'photo',
    }, data);
    renderStaticContent(container, flickr);
  });
};

const initialTabId = '#first';

let prevContainerId;

const hashChangeHandler = () => {
  clearPrevTab(prevContainerId);
  if (!location.hash) {
    return location.assign(initialTabId);
  }
  switch (location.hash) {
  case '#second':
    prevContainerId = tabContentIds.feeds;
    return renderFeeds();
  case '#third':
    prevContainerId = tabContentIds.flickr;
    return renderFlickr();
  default:
    prevContainerId = tabContentIds.logs;
    return renderLogs();
  }
};

const DOMContentLoadedHadler = () => {
  hashChangeHandler();
};

window.addEventListener('DOMContentLoaded', DOMContentLoadedHadler);

window.addEventListener('hashchange', hashChangeHandler);

const input = document.querySelector('.material-design-textarea-component__input');

const renderFlickrWrapper = (event) => {
  renderFlickr(event.target.value);
};

const handleKeyUp = debounce(renderFlickrWrapper, 400);
input.addEventListener('keyup', handleKeyUp.bind(this));

// document.querySelector('.tab-menu').addEventListener('click', (e) => {
//   if (e.target && e.target.nodeName === 'A') {
//     location.reload();
//   }
// });
