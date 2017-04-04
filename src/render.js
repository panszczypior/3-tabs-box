/* eslint no-underscore-dangle:0 */
import logs from './api/logs';
import feeds from './api/feeds';
import flickrApi from './api/flickr';
import { styles, tabContentIds, classNames } from './utils/consts';
import { createList, createGallery } from './utils/helpers';

const renderStaticContent = (container, content) => {
  const _container = container;
  _container.style.display = styles.block;
  _container.appendChild(content);
};

const renderDynamicContent = (container, content) => {
  const _container = container;
  _container.style.display = styles.block;
  _container.innerHTML = '';
  _container.appendChild(content);
};

const clearPrevTab = (containerId) => {
  const elem = document.getElementById(containerId);
  if (elem) {
    elem.style.display = 'none';
  }
};

const render = {
  renderStaticContent,
  renderDynamicContent,
  clearPrevTab,
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
    }, topFiles, tabContentIds.logs);
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
  flickrApi.get(text).then((data) => {
    const flickr = createGallery({
      gallery: classNames.photosGallery,
      photo: classNames.photo,
    }, data);
    renderStaticContent(container, flickr);
  });
};

export {
  render as default,
  clearPrevTab,
  renderLogs,
  renderFeeds,
  renderFlickr,
};
