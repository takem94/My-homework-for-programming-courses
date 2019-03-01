function Menu(myId, myClass, myItems) {
    Container.call(this);

    this.id = myId;
    this.class = myClass;
    this.items = myItems;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.render = function () {
    let result = '<ul class="' + this.class + '">';

    for (let i = 0; i < this.items.length; i++) {
        //Посмотреть, а Submenu ли это
        if (this.items[i] instanceof Submenu) {
            // console.log('Это сабменю');
            let parseSubMenu = new DOMParser().parseFromString(this.items[i].render(), "text/xml").children[0];
            let parseItem = new DOMParser().parseFromString(this.items[i].mainItem.render(), "text/xml").children[0];

            parseItem.appendChild(parseSubMenu);
            parseItem.classList.add('menu__item_slider');

            let tempElem = document.createElement('div');
            tempElem.appendChild(parseItem);

            result += tempElem.innerHTML;
        }
        else if (this.items[i] instanceof MenuItem) {
            // console.log('Экземпляр MenuItem');
            result += this.items[i].render(); //render принадлежит пункту меню
        }
    }

    result += '</ul>';

    this.htmlCode = result; //Сохраняем HTML-код меню
    return result;
};