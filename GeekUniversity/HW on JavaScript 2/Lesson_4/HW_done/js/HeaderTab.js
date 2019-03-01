function HeaderTab(id) {
    Container.apply(this, arguments);
}

HeaderTab.prototype = Object.create(Container.prototype);
HeaderTab.prototype.constructor = HeaderTab;

HeaderTab.prototype.render = function () {
    var $headerItem = $('<div />', {
        class: 'tabs__header-item',
        'data-id': this.id
    });

    var $headerTitle = $('<div />', { class: 'tabs__header-title' });

    var $headerTitleH = $('<h2 />', { text: 'Новая вкладка' });

    var headerClose = $('<button />', { class: 'tabs__header-close', text: '+' });

    $headerTitle.append($headerTitleH);
    $headerItem.append($headerTitle);
    $headerItem.append(headerClose);

    return $headerItem;
};