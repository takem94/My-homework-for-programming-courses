async function load() {

    let map;

    let mapSection = document.querySelector('.map'),
        reviewModal = document.querySelector('.review-modal'),
        reviewModalTemplate = reviewModal.cloneNode(true),
        elemTemplate = document.getElementById('elemTemplate');

    elemTemplate = Handlebars.compile(elemTemplate.innerHTML);

    reviewModal.outerHTML = '';
    reviewModal = null;
    reviewModalTemplate.style.display = 'flex';
    reviewModalTemplate.style.opacity = 0;

    ymaps.ready(init);

    function init(){
        // Map init and settings
        map = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 10,
            behaviors: ['default', 'scrollZoom'],
            controls: []
        });

        let customItemContentLayout = ymaps.templateLayoutFactory.createClass(
            '<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
            '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>' +
            '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
        );

        let clusterer = new ymaps.Clusterer({
                preset: 'islands#invertedVioletClusterIcons',
                clusterBalloonContentLayout: 'cluster#balloonCarousel',
                clusterBalloonItemContentLayout: customItemContentLayout,
                clusterBalloonPanelMaxMapArea: 0,
                groupByCoordinates: false,
                clusterDisableClickZoom: true,
                clusterHideIconOnBalloonOpen: false,
                geoObjectHideIconOnBalloonOpen: false,
                clusterBalloonPagerSize: 5,
                clusterBalloonContentLayoutHeight: 250,
                clusterBalloonContentLayoutWidth: 250,
                gridSize: 80
            }),

            getPointData = function () {
                let id = 0;

                return function (data) {
                    data.id = id;

                    return {
                        balloonContentHeader: `<font size=3><b>${ data.place }</b></font>`,
                        balloonContentBody: `<p style="margin: 0;"><a href="#" data-id-cluster="${ id++ }" class="ballon-link">${ data.address }</a></p><br>` +
                        `<p style="margin: 0; word-break: break-word;">${ data.message }</p>`,
                        balloonContentFooter: `<font size=2><div style="position: relative; height: 18px;"><span style="position: absolute; right: 0;">${ data.time }</span></div></font>`,
                        clusterData: data
                    };
                };
            },
            // For using closure and counter like identification.
            generatePointData = getPointData(),

            getPointOptions = function () {
                return {
                    preset: 'islands#violetIcon'
                };
            };

        map.geoObjects.add(clusterer);

        // Global variables for transfer data in modal window.
        let coords, balloonData;

        // Events listeners
        clusterer.events.add('click', function (e) {
            if (reviewModal)
                closeModal();
            // It's the most weak part of my code, because Yandex Api have
            // very weird way to getting geoObjects from events and balloons.
            // Other solution to the problem may be reached by creating global
            // array, which will be contain all added geoObjects and using dataset
            // attribute inside link in balloons for getting index of the needed object.
            let target = e.get('target'),
                geoObjects = target.properties.get('geoObjects'),
                result = [];
            // Check on balloons collection or single place-mark.
            if (geoObjects) {
                // Fill array by inner data of each element
                for (let i = 0; i < geoObjects.length; ++i) {
                    result.push(geoObjects[i].properties.get('clusterData'));
                }
            } else {
                result.push(target.properties.get('clusterData'));
            }

            if (result.length)
                balloonData = result;
        });

        map.events.add('click', function (e) {
            if (reviewModal)
                return null;

            let coordsMouse = e.get('clientPixels');
            coords = e.get('coords');

            let myGeocoder = ymaps.geocode(coords);
            // Show modal when we get answer from server.
            myGeocoder.then( (res) => {
                openModal();

                let reviewModalTitle = reviewModal.querySelector('.review-modal__header-title span');
                reviewModalTitle.innerText = res.geoObjects.get(0).properties.get('text');

                setModalPosition(coordsMouse[0], coordsMouse[1]);
                reviewModal.style.opacity = '1';
            }, (err) => {
                console.error(err);
            });
        });

        mapSection.addEventListener('click', (e) => {
            let target = e.target;

            if (target.classList.contains('review-modal__body-form-btn') && coords) {
                // Getting all inputs inside modal.
                let inputName = reviewModal.querySelector('.review-modal__body-form-name'),
                    inputPlace = reviewModal.querySelector('.review-modal__body-form-place'),
                    inputMessage = reviewModal.querySelector('.review-modal__body-form-message');

                let dateStamp = new Date();
                // Checking inputs values length
                if (inputName.value.length > 2 && inputPlace.value.length > 2 && inputMessage.value.length > 2) {
                    let reviewModalTitle = reviewModal.querySelector('.review-modal__header-title span'),
                        reviewModalList = reviewModal.querySelector('.reviews-list');
                    // Data will be used in balloon-carousel on map.
                    let data = {
                        place: inputPlace.value,
                        name: inputName.value,
                        message: inputMessage.value,
                        time: dateStamp.toLocaleDateString() + ' ' + dateStamp.toLocaleTimeString(),
                        address: reviewModalTitle.innerText,
                        coords: coords
                    };

                    let reviewTemplate = elemTemplate(data);
                    // Add review in list inside modal window.
                    if (reviewModalList.querySelector('.reviews-list__empty'))
                        reviewModalList.innerHTML = reviewTemplate;
                    else
                        reviewModalList.innerHTML += reviewTemplate;
                    // Make auto scroll to bottom.
                    reviewModalList.scrollTop = reviewModalList.scrollHeight;
                    // Adding mark(balloon) in cluster, and then it will be shown on map.
                    clusterer.add(new ymaps.Placemark(coords, generatePointData(data), getPointOptions()));
                    // Clearing inputs.
                    inputName.value = inputPlace.value = inputMessage.value = '';
                } else {
                    window.alert('Заполните все поля формы!');
                }
            }
            // On click on link in balloon on map.
            if (target.classList.contains('ballon-link')) {
                e.preventDefault();

                map.balloon.close();
                clusterer.balloon.close();
                coords = null;

                openModal();
                setModalPosition(e.pageX, e.pageY);

                let title = null, elemsHtml = '';

                for (let i = 0; i < balloonData.length; ++i) {
                    if (!title && balloonData[i].id === parseInt(target.dataset.idCluster)) {
                        title = balloonData[i].address;
                        coords = balloonData[i].coords;
                        i = 0;
                    }

                    if (coords && coords[0] === balloonData[i].coords[0] && coords[1] === balloonData[i].coords[1]) {
                        elemsHtml += elemTemplate(balloonData[i]);
                    }
                }

                reviewModal.querySelector('.review-modal__header-title span').innerText = title;

                let reviewList = reviewModal.querySelector('.reviews-list');

                reviewList.scrollTop = reviewList.scrollHeight;
                reviewList.innerHTML = elemsHtml;

                reviewModal.style.opacity = 1;
            }
            // On close modal event.
            if (target.classList.contains('review-modal__header-close'))
                closeModal();
        });
        // Functions for interact with modal-review window.
        function openModal() {
            if (reviewModal)
                closeModal();

            map.behaviors.disable(['drag', 'scrollZoom', 'dblClickZoom']);
            reviewModal = reviewModalTemplate.cloneNode(true);
            mapSection.appendChild(reviewModal);
        }

        function closeModal() {
            map.behaviors.enable(['drag', 'scrollZoom', 'dblClickZoom']);
            reviewModal.outerHTML = '';
            reviewModal = null;
        }

        function setModalPosition(x,y) {
            let coordsModalY = reviewModal.clientHeight + y,
                coordsModalX = reviewModal.clientWidth + x;

            if (coordsModalX > window.innerWidth) {
                coordsModalX = window.innerWidth - reviewModal.clientWidth - 10;
            } else {
                coordsModalX = x;
            }

            if (coordsModalY > window.innerHeight) {
                coordsModalY = window.innerHeight - reviewModal.clientHeight - 10;
            } else {
                coordsModalY = y;
            }

            reviewModal.style.left = coordsModalX + 'px';
            reviewModal.style.top = coordsModalY + 'px';
        }
    }
}

window.addEventListener('DOMContentLoaded', load);