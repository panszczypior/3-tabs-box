import parse from 'clf-parser';
import logs from '../assets/varnish.log';

const readTextFile = (file) => {
  const rawFile = new XMLHttpRequest();
  const promise = new Promise((resolve, reject) => {
    const errorText = 'Couldn\'t get data';

    rawFile.open('GET', file, false);
    rawFile.onload = () => {
      if (
        rawFile.readyState === 4 &&
        (rawFile.status === 200 || rawFile.status === 0)
      ) {
        resolve(rawFile.responseText);
      } else {
        reject(errorText); // extract
      }
    };

    rawFile.onerror = () => {
      reject(errorText);
    };
    rawFile.send(null);
  });

  return promise;
};

const parseLogs = (data) => {
  const initialAcc = {
    files: {},
    hostnames: {},
  };
  const matchRegEx = /^https?:\/\/([^/?#]+)(?:[/?#]|$)/i;
  const splitedData = data
    .split(/\n/)
    .map(parse)
    .map(item => item.path);
  const paths = splitedData.reduce((acc, currVal) => {
    const matches = currVal
      ? currVal.match(matchRegEx)
      : [];
    const hostname = matches[1];

    const newAcc = {
      hostnames: {
        ...acc.hostnames,
        [hostname]: acc.hostnames[hostname]
          ? acc.hostnames[hostname] + 1
          : 1,
      },
      files: {
        ...acc.files,
        [currVal]: acc.files[currVal]
          ? acc.files[currVal] + 1
          : 1,
      },
    };

    return newAcc;
  }, initialAcc);

  return paths;
};

const sortLogs = (data) => {
  const {
    hostnames,
    files,
  } = data;
  const hostnamesSorted = Object.keys(hostnames)
    .sort((a, b) => hostnames[b] - hostnames[a])
    .map(hostname => ({
      key: hostname,
      value: hostnames[hostname],
    }));
  const filesSorted = Object.keys(files)
    .sort((a, b) => files[b] - files[a])
    .map(file => ({
      key: file,
      value: files[file],
    }));

  return {
    hostnames: hostnamesSorted,
    files: filesSorted,
  };
};

// export default {
//   parsed: readTextFile('../assets/varnish.log')
//     .then(parseLogs)
//     .then(sortLogs),
// };

export default sortLogs(parseLogs(logs));
