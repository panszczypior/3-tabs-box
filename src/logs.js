import parse from 'clf-parser';
import { readTextFile } from './httpWrapper'; // async way
import events from './events';

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

const getLogs = () => {
  events.emit('startFetching');
  return readTextFile('../assets/varnish.log')
    .then(parseLogs)
    .then((data) => {
      events.emit('stopFetching');
      return sortLogs(data);
    })
    .catch(() => {
      events.emit('errorFetching');
    });
};

export default {
  get: getLogs,
};

// export default sortLogs(parseLogs(logs));
