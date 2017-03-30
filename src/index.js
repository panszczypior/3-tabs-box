import parse from 'clf-parser';


const readTextFile = (file) => {
  const rawFile = new XMLHttpRequest();
  const promise = new Promise((resolve, reject) => {
    rawFile.open('GET', file, false);
    rawFile.onreadystatechange = () => {
      if(rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status == 0)){
        resolve(rawFile.responseText.split(/\n/).map(parse).map(item => item.path));
      }
    }
    rawFile.send(null);
  });

  return promise;
}

const parsedLog = readTextFile('../assets/varnish.log')
  .then(data => {
    console.log(data);
  });
