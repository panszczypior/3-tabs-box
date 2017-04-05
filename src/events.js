// refresh feeds every time u hit again tab button
// params page, per_page -> flickr
// spinner while loading pictures -> flickr
// load partially pictures ? related ^
// add localstorage -> logs
// add alternative to get hostnames a.href -> logs
// test on different browsers
// faster loading time for pictures
// headers
// md input bem convention
// input listener off

const events = {};

const on = (eventName, fn) => {
  events[eventName] = events[eventName] || [];
  events[eventName].push(fn);
};

const off = (eventName, fn) => {
  if (events[eventName]) {
    for (let i = 0; i < events[eventName].length; i += 1) {
      if (events[eventName][i] === fn) {
        events[eventName].splice(i, 1);
        break;
      }
    }
  }
};

const emit = (eventName, data) => {
  if (events[eventName]) {
    events[eventName].forEach((fn) => {
      fn(data);
    });
  }
};

export default {
  on,
  off,
  emit,
};
