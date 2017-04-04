import config from './config.json';
import events from './events';
import { httpGet } from './httpWrapper';

const feeds = [];

const populateFeeds = (feed) => {
  for (const entry of feed) {
    const { title, date_ms } = entry;
    feeds.push({ title, date_ms });
  }
};

const sortFeeds = feed => (
  feed
    .sort((first, second) => second.date_ms - first.date_ms)
    .map(item => ({ ...item, isoDate: new Date(item.date_ms) }))
);

const getFeeds = () => {
  feeds.length = 0;
  events.emit('startFetching');
  return httpGet(`https://api.feednami.com/api/v1.1/feeds/load?url=${config.vgUrl}`) /* eslint no-undef: 0 */
    .then(({ feed }) => {
      populateFeeds(feed.entries);
      return httpGet(`https://api.feednami.com/api/v1.1/feeds/load?url=${config.registerUrl}`);
    })
    .catch(() => httpGet(`https://api.feednami.com/api/v1.1/feeds/load?url=${config.registerUrl}`))
    .then(({ feed }) => {
      populateFeeds(feed.entries);
      return httpGet(`https://api.feednami.com/api/v1.1/feeds/load?url=${config.arstechnica}`);
    })
    .catch(() => httpGet(`https://api.feednami.com/api/v1.1/feeds/load?url=${config.arstechnica}`))
    .then(({ feed }) => {
      populateFeeds(feed.entries);
      const arr = sortFeeds(feeds);
      events.emit('stopFetching');
      return arr;
    })
    .catch(() => {
      events.emit('errorFetching');
    });
}

export default {
  get: getFeeds,
};
