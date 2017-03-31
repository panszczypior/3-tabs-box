import parse from 'clf-parser';

const readTextFile = (file) => {
  const rawFile = new XMLHttpRequest();
  const promise = new Promise((resolve, reject) => {
    rawFile.open('GET', file, false);
    rawFile.onload = () => {
      if (rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status === 0)) {
        resolve(rawFile.responseText.split(/\n/).map(parse).map(item => item.path));
      } else {
        reject(`Couldn't get data`);
      }
    };

    rawFile.onerror = () => {
      reject(`Couldn't get data`);
    }
    rawFile.send(null);
  });

  return promise;
};

const parsedLog = readTextFile('../assets/varnish.log')
  .then((data) => {
    const paths = data.reduce((acc, currVal) => {
      const matches = currVal ? currVal.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i) : [];
      const hostname = matches[1];
      acc.hostnames[hostname] = acc.hostnames[hostname] ? acc.hostnames[hostname] + 1 : 1
      acc.files[currVal] = acc.files[currVal] ? acc.files[currVal] + 1 : 1;
      return acc;
    }, { files: {}, hostnames: {} });
    return paths;
  })
  .then((paths) => {
    const { hostnames, files } = paths;
    const hostnamesSorted = Object.keys(hostnames).sort((a, b) => hostnames[b] - hostnames[a]);
    const filesSorted = Object.keys(files).sort((a, b) => files[b] - files[a]);
    console.log(filesSorted);
  });


// add localstorage
// add alternative to get hostnames a.href
// check rawFile.status === 0
