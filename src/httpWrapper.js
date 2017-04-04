let activeRequest;

const httpGet = (url) => {
  if (activeRequest) {
    activeRequest.abort();
  }

  const xmlHttp = new XMLHttpRequest();
  activeRequest = xmlHttp;
  const promise = new Promise((resolve, reject) => {
    xmlHttp.onload = () => {
      if (xmlHttp.status >= 200 && xmlHttp.status < 300) {
        activeRequest = null;
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

const httpWrapper = {
  httpGet,
};

export {
  httpWrapper as default,
  httpGet,
};
