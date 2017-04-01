const createElement = (type, className, data) => {
  const elem = document.createElement(type);
  const text = document.createTextNode(data);
  elem.className = elem.className
    ? elem.className
    : 'list-item';
  elem.appendChild(text);
  return elem;
};

const createList = (classNames, items) => {
  const list = document.createElement('ul');
  list.className = classNames.list
    ? classNames.list
    : 'list';
  items.forEach((item) => { // item przekaz i pracuj na nim to sa dane
    const text = `Count: ${item.value}, name: ${item.key}`
    const elem = createElement('li', classNames.item, text);
    list.appendChild(elem);
  });

  return list;
};

const helpers = {
  createList,
};

export {
  helpers as default,
  createList,
};
