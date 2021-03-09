import images from './gallery-items.js';

const refs = {
  gallery: document.querySelector('ul.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightboxImg: document.querySelector('.lightbox__image'),
  lightboxClose: document.querySelector('button[data-action="close-lightbox"]'),
};

const galleryItem = ({preview, original, description }) => {
  const elementLiRef = document.createElement('li');
  elementLiRef.classList.add('gallery__item');
    
  const elementLinkRef = document.createElement('a');
  elementLinkRef.classList.add('gallery__link');
  elementLinkRef.href = original;   

  const elementImgRef = document.createElement('img');
  elementImgRef.classList.add('gallery__image');
  [elementImgRef.src, elementImgRef.alt] = [preview, description];
  elementImgRef.setAttribute('data-source', original);


    elementLinkRef.append(elementImgRef);
    elementLiRef.append(elementLinkRef);
    
  return elementLiRef; 
};

refs.gallery.append(...images.map(galleryItem));

function removeClass() {
  refs.modal.classList.remove('is-open');
  refs.lightboxImg.src = '';
}

function onModalClose(event) {
  if (event.target.nodeName === 'BUTTON' || event.target.nodeName !== 'IMG') {
    removeClass();
  }
}

refs.modal.addEventListener('click', onModalClose);

let currentIndex = 0;
const imgArr = images.map(item => item.original);

function onImgOpen(event) {
  event.preventDefault();
  if (event.target.nodeName === 'IMG') {
    refs.modal.classList.add('is-open');
    refs.lightboxImg.src = event.target.dataset.source;
    currentIndex = imgArr.indexOf(refs.lightboxImg.src);
  }
}

refs.gallery.addEventListener('click', onImgOpen);


function onEscKeyDown(evet) {
  if (refs.modal.classList.contains('is-open') && evet.code === 'Escape') {
    removeClass();
  }
}

window.addEventListener('keydown', onEscKeyDown);

function carousel(event) {
    if (event.code === 'ArrowRight') {
    if (currentIndex === imgArr.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex += 1;
    }
    refs.lightboxImg.src = imgArr[currentIndex];
  }
  if (event.code === 'ArrowLeft') {
    if (currentIndex === 0) {
      currentIndex = imgArr.length - 1;
    } else {
      currentIndex -= 1;
    }
    refs.lightboxImg.src = imgArr[currentIndex];
  }
}

window.addEventListener('keydown', carousel );
