import config from './config.json';

const httpGet = (url) => {
  const xmlHttp = new XMLHttpRequest();
  const promise = new Promise((resolve, reject) => {
    xmlHttp.onload = () => {
      if (xmlHttp.status >= 200 && xmlHttp.status < 300) {
        resolve(JSON.parse(xmlHttp.responseText));
      } else {
        const { status, statusText } = xmlHttp;
        reject({
          status,
          statusText,
        });
      }
    };

    xmlHttp.onerror = () => {
      const { status, statusText } = xmlHttp;
      reject({
        status,
        statusText,
      });
    };
  });

  xmlHttp.open('GET', url, true);
  xmlHttp.send(null);
  return promise;
};

httpGet(config.flickUrl)
  .then((data) => {
  console.log(data);
  })
  .catch(err => console.log(err));

//  construct link to picture, note that size matters
