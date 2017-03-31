import config from './config.json';

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

httpGet(config.flickUrl)
  .then((data) => {
  console.log(data);
  });


//  add eslinter
//  construct link to picture, note that size matters
//  reject
