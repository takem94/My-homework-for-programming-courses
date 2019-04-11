function Menu(myId, myClass, myItems) {
    Container.call(this);

    this.id = myId;
    this.class = myClass;
    this.items = myItems;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.render = function () {
    var result = '<ul class="' + this.class + '">';

    for (var i = 0; i < this.items.length; i++) {
        //Посмотреть, а Submenu ли это
        if (this.items[i] instanceof Submenu) {
            console.log('Это сабменю');
            result += this.items[i].mainItem.render();
            result += this.items[i].render();
        }
        if (this.items[i] instanceof MenuItem) {
            console.log('Экземпляр MenuItem');
            result += this.items[i].render(); //render принадлежит пункту меню
        }
    }

    result += '</ul>';

    this.htmlCode = result; //Сохраняем HTML-код меню
    return result;
};