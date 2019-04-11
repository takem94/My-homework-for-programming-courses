function MenuItem(href, title, className) {
    this.href = href;
    this.title = title;
    this.class = 'menu__item' || className;
}

MenuItem.prototype.render = function () {
    return '<li class="' + this.class + '"><a href="' + this.href + '">' + this.title + '</a></li>';
};