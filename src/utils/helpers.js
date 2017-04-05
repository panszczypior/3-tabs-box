import { classNames as _classNames, tabContentIds } from './consts';

const createElement = (type, className, data) => {
  const elem = document.createElement(type);
  const text = document.createTextNode(data);
  elem.className = className || 'list-item';
  elem.appendChild(text);
  return elem;
};

const createList = (classNames, items, tabId) => {
  const list = document.createElement('ul');
  list.className = classNames.list
    ? classNames.list
    : 'list';
  items.forEach((item) => { // item przekaz i pracuj na nim to sa dane
    let text;
    switch (tabId) {
    case tabContentIds.logs:
      text = `Count: ${item.value}, Name: ${item.key}`;
      break;
    case tabContentIds.feeds:
      text = `Date: ${item.formatedDate}, Title: ${item.title}`;
      break;
    default:
      break;
    }
    const elem = createElement('li', classNames.item, text);
    list.appendChild(elem);
  });

  return list;
};

const createPhoto = (type, className, url) => {
  const elem = document.createElement(type);
  elem.className = className || 'photos-container__photo';
  elem.style.backgroundImage = `url(${url})`;
  return elem;
};

const createGallery = (classNames, items) => {
  const gallery = document.querySelector(`.${_classNames.photosGallery}`);
  if (gallery.hasChildNodes()) {
    gallery.innerHTML = '';
  }
  gallery.className = classNames.gallery || 'photos-container';
  items.forEach((item) => {
    const elem = createPhoto('div', classNames.photo, item.medium);
    gallery.appendChild(elem);
  });

  return gallery;
};

const debounce = (fn, wait) => {
  let timeout;
  return (...args) => {
    const later = () => {
      timeout = null;
      fn(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const createHeader = (data, className) => {
  const header = document.createElement('h3');
  const text = document.createTextNode(data);
  header.className = className || '';
  header.appendChild(text);
  return header;
};

const formatDate = date => date.toISOString().substring(0, 19).replace('T', ' ');

const helpers = {
  createList,
  createGallery,
  debounce,
  formatDate,
  createHeader,
};

export {
  helpers as default,
  createList,
  createGallery,
  debounce,
  formatDate,
  createHeader,
};
