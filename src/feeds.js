import config from './config.json';

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

export default feednami.load(config.vgUrl) /* eslint no-undef: 0 */
  .then((feed) => {
    populateFeeds(feed.entries);
    return feednami.load(config.registerUrl);
  })
  .catch(() => feednami.load(config.registerUrl))
  .then((feed) => {
    populateFeeds(feed.entries);
    return feednami.load(config.arstechnica);
  })
  .catch(() => feednami.load(config.arstechnica))
  .then((feed) => {
    populateFeeds(feed.entries);
    const arr = sortFeeds(feeds);
    return arr;
  })
  .catch((err) => console.log(err));
