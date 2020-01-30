const getPosts = () => {
  return fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json());
};

const createMarkup = (data) => {
  return `<article class="post">
      <h3>${data.title.replace(/\W/g, ' ')}</h3>
      <p>${data.body.replace(/\W/g, ' ')}</p>
    </article>`
};

self.addEventListener(
  'message',
  e => {
    switch (e.data.type) {
      case 'getPostsRequest':
        //getPosts().then(json => self.postMessage(json));
        getPosts().then(json => {
          self.postMessage(json.map(item => createMarkup(item)).join(''));
        });
        break;
      default:
        console.log(e.data);
        break;
    }
  },
  false
);