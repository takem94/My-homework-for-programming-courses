function Container() {
    this.htmlCode = '';
}

Container.prototype.render = function () {
    return this.htmlCode;
};

Container.prototype.remove = function () {
    delete this.htmlCode;

    document.querySelector("." + this.class).remove();

    return false;
};