// second tab goes down after few click on it -> hash id problem
// requests only when hash change
// refresh feeds every time u hit refresh
//click on menu should refresh
// params page, per_page -> flickr
// search -> flickr
// spinner while loading pictures -> flickr
// load partially pictures ?
// add localstorage -> logs
// add alternative to get hostnames a.href -> logs
// clear asynchronus requests if tab is changed
// check document.querySelector, you shouldn't touch dom too much
// test on different browsers
// test on mobile devices
// restyle app

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
