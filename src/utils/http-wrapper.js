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

const readTextFile = (file) => {
  if (activeRequest) {
    activeRequest.abort();
  }

  const rawFile = new XMLHttpRequest();
  activeRequest = rawFile;
  const promise = new Promise((resolve, reject) => {
    const errorText = 'Couldn\'t get data';

    rawFile.onload = () => {
      if (
        rawFile.readyState === 4 &&
        (rawFile.status === 200 || rawFile.status === 0)
      ) {
        activeRequest = null;
        resolve(rawFile.responseText);
      } else {
        reject(errorText); // extract
      }
    };

    rawFile.onerror = () => {
      reject(errorText);
    };
  });

  rawFile.open('GET', file, true);
  rawFile.send(null);
  return promise;
};

const httpWrapper = {
  httpGet,
  readTextFile,
};

export {
  httpWrapper as default,
  httpGet,
  readTextFile,
};
