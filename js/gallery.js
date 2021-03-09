import images from './gallery-items.js';

const refs = {
  gallery: document.querySelector('ul.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightboxImg: document.querySelector('.lightbox__image'),
  lightboxClose: document.querySelector('button[data-action="close-lightbox"]'),
};

const galleryList = ({preview, original, description }) => {
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

refs.gallery.append(...images.map(galleryList));

function onClick(elem) {
  if (elem.target.nodeName === 'BUTTON' || elem.target.nodeName !== 'IMG') {
    refs.modal.classList.remove('is-open');
    refs.lightboxImg.src = '';
  }
}

refs.modal.addEventListener('click', onClick);

let currentIndex = 0;

function onClickImg(elem) {
const imgArr = images.map(item => item.original);

  elem.preventDefault();
  if (elem.target.nodeName === 'IMG') {
    refs.modal.classList.add('is-open');
    refs.lightboxImg.src = elem.target.dataset.source;
    currentIndex = imgArr.indexOf(refs.lightboxImg.src);
  }
}

refs.gallery.addEventListener('click', onClickImg);


function onEscKeyDown(elem) {
  if (refs.modal.classList.contains('is-open') && elem.code === 'Escape') {
    refs.modal.classList.remove('is-open');
    refs.lightboxImg.src = '';
  }
}

window.addEventListener('keydown', onEscKeyDown);

function carousel(elem) {
  this.Array = images.map(item => item.original);
  
  if (elem.code === 'ArrowRight') {
    if (currentIndex === 8) {
      currentIndex = 0;
    } else {
      currentIndex += 1;
    }
    refs.lightboxImg.src = Array[currentIndex];
  }
  if (elem.code === 'ArrowLeft') {
    if (currentIndex === 0) {
      currentIndex = Array.length - 1;
    } else {
      currentIndex -= 1;
    }
    refs.lightboxImg.src = Array[currentIndex];
  }
}

window.addEventListener('keydown', carousel );
