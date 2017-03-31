const httpGet = (url) => {
  const xmlHttp = new XMLHttpRequest();
  const promise = new Promise((resolve, reject) => {
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        resolve(JSON.parse(xmlHttp.responseText));
      }
    };
  });

  xmlHttp.open('GET', url, true);
  xmlHttp.send(null);
  return promise;
};

httpGet('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=91bace887faabf57a704cea71a25eaf2&format=json&nojsoncallback=1&text=Krak%C3%93w&min_taken_date=2017-01-01&sort=date-posted-desc')
  .then((data) => {
  console.log(data);
  });


//  add eslinter
//  construct link to picture, note that size matters
//  reject
