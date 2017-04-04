import parsedLogs from './logs';
import { createList, createGallery, debounce } from './helpers';
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
events.on('errorFetching', () => {
  spinner.classList.add('hide');
});

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
  const containerId = 'first-logs';
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
  const containerId = 'second-feeds';
  const container = document.getElementById(containerId);
  // container.style.display = 'block';
  feeds.get().then((data) => {
    const feed = createList({
      list: 'list',
      item: 'item',
    }, data, 'feeds');
    renderDynamicContent(container, feed);
  });
};

const renderFlickr = (text) => {
  const containerId = 'third-flickr';
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

// const anchors = document.querySelectorAll('.tab-menu-item-link');
// [...anchors].forEach(anchor => {
//   //
// });
// console.log(anchors);
let prevContainerId;

const hashChangeHandler = (a,b,c) => {
  clearPrevTab(prevContainerId);
  if (!location.hash) {
    return location.assign(initialTabId);
  }
  switch (location.hash) {
  case '#second':
    prevContainerId = 'second-feeds';
    renderFeeds();
    break;
  case '#third':
    prevContainerId = 'third-flickr';
    renderFlickr();
    break;
  default:
    prevContainerId = 'first-logs';
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

const renderFlickrWrapper = (event) => {
  renderFlickr(event.target.value);
};

const handleKeyUp = debounce(renderFlickrWrapper, 400);
input.addEventListener('keyup', handleKeyUp.bind(this));

// document.querySelector('.tab-menu').addEventListener('click', (e) => {
//   // if (e.target && e.target.nodeName === 'A') {
//   //   location.reload();
//   // }
//
//   // console.log(e.target.hash);
//   window.scrollTo(0,0);
// });
