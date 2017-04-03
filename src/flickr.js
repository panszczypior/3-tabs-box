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
      const {
        status,
        statusText,
      } = xmlHttp;
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

const getPhotos = () => {
  return httpGet(config.flickUrl)
    .then((data) => {
      const photos = data.photos.photo.map((photo) => {
        const { farm, server, id, secret } = photo;
        const url = `http://farm${farm}.staticflickr.com/${server}/${id}_${secret}`;
        return {
          ...photo,
          small: `${url}_s.jpg`,
          medium: `${url}_z.jpg`,
          large: `${url}_b.jpg`,
        };
      });
      return photos;
    })
    .catch(err => console.log(err));
};

export default {
  get: getPhotos,
};


// params page, per_page
