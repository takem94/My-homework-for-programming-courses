function MenuItem(href, title) {
    this.href = href;
    this.title = title;
}

MenuItem.prototype.render = function () {
    return '<li><a href="' + this.href + '">' + this.title + '</a></li>';
};