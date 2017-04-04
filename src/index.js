/* eslint no-unused-vars:0 */
import { debounce } from './helpers';
import { tabContentIds, hash } from './consts';
import eventsSubs from './eventsSubscriptions';
import { input } from './domElements';
import { clearPrevTab, renderLogs, renderFeeds, renderFlickr } from './render';

let prevContainerId;

const hashChangeHandler = () => {
  clearPrevTab(prevContainerId);
  if (!location.hash) {
    return location.assign(hash.first);
  }
  switch (location.hash) {
  case hash.second:
    prevContainerId = tabContentIds.feeds;
    return renderFeeds();
  case hash.third:
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

const renderFlickrWrapper = (event) => {
  renderFlickr(event.target.value);
};

const handleKeyUp = debounce(renderFlickrWrapper, 400);
input.addEventListener('keyup', handleKeyUp.bind(this));

window.addEventListener('DOMContentLoaded', DOMContentLoadedHadler);
window.addEventListener('hashchange', hashChangeHandler);
