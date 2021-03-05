import images from './gallery-items.js';

const galleryRef = document.querySelector('ul.js-gallery');


const galleryList = ({preview, original, description }) => {
  const elementLiRef = document.createElement('li');
  elementLiRef.classList.add('gallery__item');
    
  const lementLinkRef = document.createElement('a');
  lementLinkRef.classList.add('gallery__link');
  lementLinkRef.href = original;   

  const lementImgRef = document.createElement('img');
  lementImgRef.classList.add('gallery__image');
  [lementImgRef.src, lementImgRef.alt] = [preview, description];
  lementImgRef.setAttribute('data-source', original);


    lementLinkRef.append(lementImgRef);
    elementLiRef.append(lementLinkRef);
    
  return elementLiRef; 
};

galleryRef.append(...images.map(galleryList));
