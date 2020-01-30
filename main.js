let worker;
const posts = document.querySelector('.posts');
const button = document.querySelector('.button');

if (window.Worker) {
  worker = new Worker('./worker.js');
}

button.addEventListener('click', e => {
  e.preventDefault();
  worker.postMessage({
    type: 'getPostsRequest'
  });
});

worker.addEventListener(
  'message',
  e => {
    button.remove();
    posts.innerHTML = e.data;
  },
  false
);