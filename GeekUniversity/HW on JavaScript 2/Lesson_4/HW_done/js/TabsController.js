function TabsController($headerList,$bodyList) {
    this.activeTab = null;
    this.tabsList = [];
    this.tabsCount = 0;
    this.id = -1;

    this.headerList = $headerList;
    this.bodyList = $bodyList;
}

TabsController.prototype.addTab = function () {
    ++this.tabsCount;
    ++this.id;

    var Header = new HeaderTab(this.id),
        Body = new BodyTab(this.id);

    this.tabsList.push({
        header: Header.render(),
        body: Body.render()
    });

    return this;
};

TabsController.prototype.render = function () {
    if (this.tabsCount > 1)
        this.hideActiveTab();

    this.activeTab = this.tabsList[this.id];

    this.headerList.append(this.activeTab.header);
    this.bodyList.append(this.activeTab.body);

    this.activeTab.body.hide().fadeTo(1,0);
    this.showActiveTab();

    return this;
};

TabsController.prototype.hideActiveTab = function () {
    this.activeTab.header.removeClass('tabs__header-item_active');
    this.activeTab.body.fadeTo(500,0).hide();
};

TabsController.prototype.showActiveTab = function () {
    setTimeout(this.doActive.bind(this), 10);
    this.activeTab.body.show().fadeTo(250,1);
};

TabsController.prototype.doActive = function () {
    this.activeTab.header.addClass('tabs__header-item_active');
};