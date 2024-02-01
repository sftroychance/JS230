document.addEventListener('DOMContentLoaded', async function() {
  const slideArea = document.querySelector('#slides');
  const commentArea = document.querySelector('#comments ul');

  let photoData;
  const templates = {};

  compileTemplates();
  registerPartials();
  await loadPhotos();
  await loadPhotoDetails();
  bindEvents();

  function compileTemplates() {
    const allTemplates = document.querySelectorAll(`[type='text/x-handlebars']`);

    for (const {id, innerHTML} of allTemplates) {
      templates[id] = Handlebars.compile(innerHTML);
    }
  }

  function registerPartials() {
    const allPartials = document.querySelectorAll(`[data-type='partial']`);

    for (const {id, innerHTML} of allPartials) {
      Handlebars.registerPartial(id, innerHTML);
    }
  }

  function bindEvents() {
    document.querySelector('a.prev')
      .addEventListener('click', (e) => {
        e.preventDefault();
        advanceSlide();
      });

    document.querySelector('a.next')
      .addEventListener('click', (e) => {
        e.preventDefault();
        reverseSlide();
      });

    document.querySelector('section > header').addEventListener('click', (e) => {
      e.preventDefault();

      if (e.target.tagName !== 'A') {
        return;
      }

      submitUpvote(e.target);
    });

    document.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      submitForm(e.target);
    })
  }

  async function submitForm(form) {
    const url = form.getAttribute('action');
    const method = form.getAttribute('method');

    const formData = new FormData(form);

    if (Array.from(formData).some(([_, value]) => value === '')) {
      alert('You must fill in all fields!');
      return;
    }

    let response;
    try {
      response = await fetch(url, {
        method,
        body: new URLSearchParams(formData),
        headers: {
          'Content-Type':  'application/x-www-form-urlencoded; charset=utf-8',
        },
      });
    } catch(error) {
      console.log('Error submitting comment:', error);
    }

    const newData = await response.json();

    const newPost = templates.photo_comment(newData);
    commentArea.insertAdjacentHTML('beforeend', newPost);

    form.reset();
  }

  async function submitUpvote(target) {
    const ID = +target.dataset.id;
    const property = target.dataset.property;
    const url = target.attributes.href.value;

    let response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({photo_id: ID}),
      });
    } catch(error) {
      console.log('Error with the upvote:', error);
    }

    const stats = await response.json();
    updateStats(ID, property, stats.total);
  }

  function updateStats(ID, property, newValue) {
    const photoDetails = photoData.filter(({id}) => id === ID).at(0);
    photoDetails[property] = newValue;

    const button = document.querySelector(`[data-property='${property}'`)
    const buttonText = button.textContent;

    button.textContent = buttonText.replace(/\d+/, newValue);
  }

  function advanceSlide() {
    slideArea.insertAdjacentElement('afterbegin', slideArea.lastElementChild);
    loadPhotoDetails();
  }

  function reverseSlide() {
    slideArea.insertAdjacentElement('beforeend', slideArea.firstElementChild);
    loadPhotoDetails();
  }

  async function loadPhotos() {
    let response;
    try {
      response = await fetch('/photos');
    } catch(error) {
      console.log('Error retrieving photos:', error);
    }

    photoData = await response.json();

    slideArea.innerHTML = templates.photos({photos: photoData});
  }

  async function loadPhotoDetails() {
    const currentID = slideArea.firstElementChild.dataset.id;

    loadPhotoInfo(+currentID);
    loadComments(currentID);
  }

  function loadPhotoInfo(photoID) {
    const photoInfoArea = document.querySelector('section > header');

    const photo = photoData.filter(obj => obj.id === photoID).at(0);
    photoInfoArea.innerHTML = templates.photo_information(photo);
  }

  async function loadComments(photoID) {
    let response;
    try {
      response = await fetch(`/comments?photo_id=${photoID}`);
    } catch(error) {
      console.log('Error retrieving comments', error);
    }

    const commentData = await response.json();

    commentArea.innerHTML = templates.photo_comments({comments: commentData});
  }
});
