import config from './config.json';

const feeds = [];

feednami.load(config.vgUrl) /* eslint no-undef: 0 */
  .then((feed) => {
    for (const entry of feed.entries) {
      const { title, date_ms } = entry;
      feeds.push({ title, date_ms });
    }
    return feednami.load(config.registerUrl);
  })
  .then((feed) => {
    for (const entry of feed.entries) {
      const { title, date_ms } = entry;
      feeds.push({ title, date_ms });
    }
    return feednami.load(config.arstechnica);
  })
  .then((feed) => {
    for (const entry of feed.entries) {
      const { title, date_ms } = entry;
      feeds.push({ title, date_ms });
    }
    const arr = feeds.sort((a, b) => b.date_ms - a.date_ms).map(item => {
      const isoDate = new Date(item.date_ms);
      return {
        ...item,
        isoDate,
      };
    });
  });


//  catch error
