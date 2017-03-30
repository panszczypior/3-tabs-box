const RSS_URL_VG = 'http://www.vg.no/rss/feed/?categories=1068,1069,1070&keywords=&limit=25&format=rss';
const RSS_URL_REGISTER = 'http://www.theregister.co.uk/headlines.atom';
const RSS_URL_ARSTECHNICA = 'http://feeds.arstechnica.com/arstechnica/index?format=xml';

const feeds = [];

feednami.load(RSS_URL_VG)
  .then(feed => {
    for(let entry of feed.entries){
        const {title, date_ms} = entry;
        feeds.push({title, date_ms})
    }
    return feednami.load(RSS_URL_REGISTER);
  })
  .then(feed => {
    for(let entry of feed.entries){
        const {title, date_ms} = entry;
        feeds.push({title, date_ms})
    }
    return feednami.load(RSS_URL_ARSTECHNICA);
  })
  .then(feed => {
    for(let entry of feed.entries){
        const {title, date_ms} = entry;
        feeds.push({title, date_ms})
    }
    const arr = feeds.sort((a, b) => b.date_ms - a.date_ms).map(item => {
      const isoDate = new Date(item.date_ms);
      return {
        ...item,
        isoDate,
      }
    });
  });


//catch error
