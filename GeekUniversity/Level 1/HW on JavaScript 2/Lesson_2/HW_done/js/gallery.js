"use strict";

(function () {
    function Preview(src, alt) {
        this.galleryPreview = document.createElement('div');
        this.galleryPreviewPicture = document.createElement('div');
        this.galleryPreviewImage = document.createElement('img');

        this.galleryPreview.classList.add('gallery-preview');
        this.galleryPreviewPicture.classList.add('gallery-preview__picture');
        this.galleryPreviewImage.src = src || '';
        this.galleryPreviewImage.alt = alt || '';
    }

    Preview.prototype.getResult = function () {
        this.galleryPreviewPicture.appendChild(this.galleryPreviewImage);
        this.galleryPreview.appendChild(this.galleryPreviewPicture);

        return this.galleryPreview;
    };


    function GalleryItem(id,src,alt) {
        this.galleryItem = document.createElement('div');
        this.galleryItemWrapper = document.createElement('div');
        this.galleryItemImg = document.createElement('img');

        this.galleryItem.classList.add('gallery__item');
        this.galleryItemWrapper.classList.add('gallery__item-wrapper');
        this.galleryItemImg.classList.add('gallery__item-picture');

        this.galleryItemImg.src = src || '';
        this.galleryItemImg.alt = alt || '';
        this.itemId = id || '';
    }

    GalleryItem.prototype.getResult = function () {
        this.galleryItemWrapper.appendChild(this.galleryItemImg);
        this.galleryItem.appendChild(this.galleryItemWrapper);

        return this.galleryItem;
    };

    function Gallery() {
        this.galleryList = document.createElement('div');
        this.activeItem = '';
        this.listArray = [];

        this.galleryList.classList.add('gallery__list');
    }

    Gallery.prototype.fillArray = function (list) {

        for (let i = 0; i < list.length; ++i) {

            if (list[i] !== undefined) {
                let item = new GalleryItem(i,'.'+list[i].photo_small, 'text');
                item.itemId = i;

                if (i === 0) {
                    item.galleryItem.classList.add('gallery__item_active');
                    this.activeItem = i;
                }

                item.galleryItemImg.setAttribute('data-num',i+'');

                this.listArray.push(item);
                this.galleryList.appendChild(item.getResult());
            }
        }
    };

    function getPhotos() {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'photos.json', true);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) return;

            if (xhr.status !== 200) {
                console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
            } else {
                let jsonAnswer = JSON.parse(xhr.responseText);

                //  Gallery

                if(jsonAnswer[0][0].photo_big !== undefined) {
                    jsonAnswer = jsonAnswer[0];

                    let preview = new Preview('.'+jsonAnswer[0].photo_big,'test');
                    let galleryList = new Gallery();

                    let gallery = document.getElementById('gallery');

                    if(gallery !== undefined){
                        gallery.appendChild(preview.getResult());

                        galleryList.fillArray(jsonAnswer);

                        gallery.appendChild(galleryList.galleryList);

                        galleryList.galleryList.addEventListener("click", function (e) {

                            if (!e.target.classList.contains('gallery__item_active')
                                && e.target.classList.contains('gallery__item-picture')) {
                                let dataNum = e.target.dataset.num;

                                preview.galleryPreviewImage.style.opacity = '0';

                                setTimeout( function () {
                                    preview.galleryPreviewImage.src = '.'+jsonAnswer[dataNum].photo_big;

                                    preview.galleryPreviewImage.onload = function () {
                                        preview.galleryPreviewImage.style.opacity = '1';
                                    };
                                }, 300);

                                galleryList.listArray[galleryList.activeItem].galleryItem.classList.remove('gallery__item_active');

                                galleryList.activeItem = dataNum;

                                galleryList.listArray[dataNum].galleryItem.classList.add('gallery__item_active');
                            }
                        });
                    }
                }
            }
        }
    }

    getPhotos();
})();