import logs from './logs';

logs.parsed.then(data => console.log(data));

const initialTabId = '#logs';

const hashChangeHandler = () => {
  if (!location.hash) {
    return location.assign(initialTabId);
  }
  switch (location.hash) {
  case '#feeds':
    return '';
  case '#flickr':
    return '';
  default:
    return '';
  }
};

const DOMContentLoadedHadler = () => {
  hashChangeHandler();
};

window.addEventListener('DOMContentLoaded', DOMContentLoadedHadler);

window.addEventListener('hashchange', hashChangeHandler);
