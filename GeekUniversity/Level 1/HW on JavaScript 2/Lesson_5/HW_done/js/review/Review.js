function Review(id, text, user, userId, time, status) {
    Container.call(this, id);

    this.text = text;
    this.user = user;
    this.userId = userId;
    this.time = time;
    this.status = 0 || parseInt(status);

    this.init();
}

Review.prototype = Object.create(Container.prototype);
Review.prototype.constructor = Review;

Review.prototype.init = function () {
    var textTime = this.time.getDate() + '.' + (this.time.getMonth()+1) + '.' + this.time.getFullYear();
    textTime += ' ' + this.time.getHours() + ':' + this.time.getMinutes() + ':' + this.time.getSeconds();

    var $newElem = $('<div />', { class: 'review-list__elem', 'data-id': this.id});

    var $elemText = $('<p />', { class: 'review-list__elem-text', text: this.text}),
        $elemUser = $('<p />', { class: 'review-list__elem-user', text: this.user}),
        $elemUserId = $('<span />', { class: 'review-list__elem-user-id', text: ' #' + this.userId}),
        $elemTime = $('<span />', { class: 'review-list__elem-time', text: textTime});

    var $elemControll = $('<div />', { class: 'review-list__elem-control'}),
        $btnAppear = $('<button />', {class: 'review-list__elem-approve', text: 'Одобрить'}),
        $btnDelete = $('<button />', {class: 'review-list__elem-delete', text: 'X'});

    if (this.status) {
        $btnAppear.addClass('review-list__elem-approve_confirmed').text('Одобрено');
    }

    $elemControll.append($btnAppear).append($btnDelete);

    $newElem.append($elemText).append($elemUser.append($elemUserId)).append($elemTime).append($elemControll);

    var $holder = $('<div />');

    $holder.append($newElem);

    this.htmlCode = $holder.html();
};

Review.prototype.render = function () {
    return this.htmlCode;
};