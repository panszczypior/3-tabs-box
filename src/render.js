/* eslint no-underscore-dangle:0 */
import logs from './api/logs';
import feeds from './api/feeds';
import flickrApi from './api/flickr';
import { styles, tabContentIds, classNames, headers } from './utils/consts';
import { createList, createGallery, createHeader } from './utils/helpers';

const render = (container, content, header) => {
  const _container = container;
  _container.style.display = styles.block;
  const _header = header || document.createElement('div');
  _container.appendChild(_header);
  _container.appendChild(content);
};

const clearPrevTab = (containerId) => {
  const elem = document.querySelector(`#${containerId}`);
  if (elem) {
    elem.style.display = 'none';
  }
};

const renderLogs = () => {
  const containerId = tabContentIds.logs;
  const container = document.querySelector(`#${containerId}`);
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
    const headerHostnames = createHeader(headers.logs.hostnames);
    const headerFiles = createHeader(headers.logs.files);
    render(container, hostsList, headerHostnames);
    render(container, filesList, headerFiles);
  });
};

const renderFeeds = () => {
  const containerId = tabContentIds.feeds;
  const container = document.querySelector(`#${containerId}`);
  feeds.get().then((data) => {
    const { list, listItem } = classNames;
    const feed = createList({
      list,
      item: listItem,
    }, data, tabContentIds.feeds);
    const header = createHeader(headers.feeds);
    render(container, feed, header);
  });
};

const renderFlickr = (text) => {
  const containerId = tabContentIds.flickr;
  const container = document.querySelector(`#${containerId}`);
  flickrApi.get(text).then((data) => {
    const flickr = createGallery({
      gallery: classNames.photosGallery,
      photo: classNames.photo,
    }, data);
    render(container, flickr);
  });
};

export {
  clearPrevTab,
  renderLogs,
  renderFeeds,
  renderFlickr,
  render,
};
