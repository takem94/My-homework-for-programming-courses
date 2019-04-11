function Submenu(myId, myClass, myItems, myMainItem) {
    Menu.apply(this, arguments);

    this.mainItem = myMainItem;
    this.id = myId;
    this.class = myClass;
    this.items = myItems;

}

Submenu.prototype = Object.create(Menu.prototype);
Submenu.prototype.constructor = Submenu;