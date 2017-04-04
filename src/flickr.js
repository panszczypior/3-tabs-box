import config from './config.json';
import events from './events';
import { httpGet } from './httpWrapper';

const getPhotos = (text = 'Kraków') => {
  events.emit('startFetching');
  return httpGet(`${config.flickUrl}&text=${text}`)
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
      events.emit('stopFetching');
      return photos;
    })
    .catch(() => {
      events.emit('errorFetching');
    });
};

export default {
  get: getPhotos,
};
