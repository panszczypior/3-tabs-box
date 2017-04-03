const createElement = (type, className, data) => {
  const elem = document.createElement(type);
  const text = document.createTextNode(data);
  elem.className = elem.className
    ? elem.className
    : 'list-item';
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
    case 'logs':
      text = `Count: ${item.value}, Name: ${item.key}`;
      break;
    case 'feeds':
      text = `Date: ${item.isoDate}, Title: ${item.title}`;
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
  elem.className = elem.className
    ? elem.className
    : 'photo';
  elem.src = url;
  return elem;
};

const createGallery = (classNames, items) => {
  const gallery = document.querySelector('.photos-container');
  if (gallery.hasChildNodes()) {
    gallery.innerHTML = '';
  }
  gallery.className = classNames.gallery
    ? classNames.gallery
    : 'photos-container';
  items.forEach((item) => {
    const elem = createPhoto('img', classNames.photo, item.medium);
    gallery.appendChild(elem);
  });

  return gallery;
};

const helpers = {
  createList,
  createGallery,
};

export {
  helpers as default,
  createList,
  createGallery,
};
