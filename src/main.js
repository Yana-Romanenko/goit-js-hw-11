'use strict'

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.picture-search-form');
const searchInput = document.querySelector('.picture-search-name');
const loaderContainer = document.querySelector('.loader-container');

const API_KEY = '41764451-f0ee5e8d00846e21c9f97a054';

function showLoader() {
  loaderContainer.style.display = 'block';
}
function hideLoader() {
  loaderContainer.style.display = 'none';
}

let requestParams = {
  key: API_KEY,
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

function searchImages(query) {
  requestParams.q = query;
  const searchParams = new URLSearchParams(requestParams);

  showLoader();

  fetch(`https://pixabay.com/api/?${searchParams}`)
    .then(response => {
      hideLoader();

      if (!response.ok) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      }
      return response.json();
    })

    .then(({ hits }) => {
      const gallery = document.querySelector('.gallery');

      if (hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }

      const lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
        captionsData: 'alt',
        close: true,
      });

      gallery.innerHTML = '';

      const galleryHtml = hits.reduce(
        (html, image) =>
          html +
          `<a class="gallery-link" href="${image.largeImageURL}">
            <img
                class="gallery-image"
                src="${image.webformatURL}"
                alt="${image.tags}"
            />
           <ul class="info-list">
              <li class="info-item">
                  <p class="info-title">Likes</p>
                  <p class="info-value">${image.likes}</p>
              </li>
              <li class="info-item">
                  <p class="info-title">Views</p>
                  <p class="info-value">${image.views}</p>
              </li>
              <li class="info-item">
                  <p class="info-title">Comments</p>
                  <p class="info-value">${image.comments}</p>
              </li>
              <li class="info-item">
                  <p class="info-title">Downloads</p>
                  <p class="info-value">${image.downloads}</p>
              </li>
            </ul>
        </a>`,
        ''
      );
      gallery.insertAdjacentHTML('beforeend', galleryHtml);
      lightbox.refresh();
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: error.message,
        position: 'topRight',
      });
    });
}

searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const searchQuery = searchInput.value.trim();
  searchImages(searchQuery);
  searchForm.reset();
});