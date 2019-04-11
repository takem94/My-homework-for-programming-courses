$(window).on('load',function () {

    // Global Variables
    var $tabs = $($('#tabs .container')[0]),
        $headerWrapper = $('<div />', { class: 'tabs__header-wrapper' }),
        $headerList = $('<div />', { class: 'tabs__header-list' }),
        $headerAddBtn = $('<button />', { class: 'tabs__header-btn', text: '+' }),
        $bodyList = $('<div />', { class: 'tabs__body-list' }),
        $changeBtn = $('<button />', { class: 'tabs__change-direction' });

    $headerWrapper.append($headerList).append($headerAddBtn);
    $tabs.append($changeBtn).append($headerWrapper).append($bodyList);

    var tabsController = new TabsController($headerList,$bodyList);

    $changeBtn.on('click', function (e) {
        var target = $(e.target);

        if(target.data('toggle') === 'true'){
            target.data('toggle','false');
            $changeBtn.removeClass('tabs__change-direction_rotate');
            $tabs.removeClass('container_vertical')
        } else {
            target.data('toggle','true');
            $changeBtn.addClass('tabs__change-direction_rotate');
            $tabs.addClass('container_vertical')
        }
    });

    $headerAddBtn.on('click',function () {
        if (tabsController.tabsCount < 4)
            tabsController.addTab().render();
    });

    $bodyList.on('keyup', function (e) {
        if ($(e.target).attr('name') === 'tabName'){

            var target = e.target,
                targetId;

            while (target !== this) {
                if ($(target).hasClass('tabs__body-item')) {
                    targetId = $(target).data('id');
                    break;
                }

                target = target.parentNode;
            }

            if($(e.target).val() !== '' && $(e.target).val() !== ' ') {
                tabsController.tabsList[targetId].header.find('h2').text($(e.target).val());
            } else {
                tabsController.tabsList[targetId].header.find('h2').text('Новая вкладка');
            }
        }
    });

    $headerList.on('click',function (e) {

        if ($(e.target).hasClass('tabs__header-close')) {

            if (tabsController.tabsCount > 1) {
                // Reset count, because from this moment this value will not actual.
                tabsController.tabsCount = 0;
                var idElem = $(e.target).parent().data('id'),
                    // toggle need for except case, when we wont delete active element.
                    toggle = tabsController.activeTab.header.data('id') !== idElem;

                // Do remove element, which we wont delete.
                tabsController.tabsList[idElem].header.css('width', '0').fadeTo(200,0);
                tabsController.tabsList[idElem].body.remove();
                tabsController.tabsList[idElem].header.remove();
                tabsController.tabsList[idElem] = undefined;

                // This need for searching next element, which will be active.
                for (var i = idElem + 1; i < tabsController.tabsList.length; ++i) {
                    if (tabsController.tabsList[i] !== undefined) {
                        ++tabsController.tabsCount;

                        if(!toggle) {
                            tabsController.activeTab = tabsController.tabsList[i];
                            toggle = true;
                        }
                    }
                }
                // This need for searching previous element, which will be active.
                for (var i = idElem - 1; i >= 0; --i){
                    if (tabsController.tabsList[i] !== undefined) {
                        ++tabsController.tabsCount;

                        if(!toggle) {
                            tabsController.activeTab = tabsController.tabsList[i];
                            toggle = true;
                        }
                    }
                }
                tabsController.showActiveTab();
            } else {
                alert('Ошибка!<br>' + 'Нельзя удалить последнюю вкладку.');
            }
        } else {
            // This code respond to change active element.
            var target = e.target;

            while (target !== this) {

                if ($(target).hasClass('tabs__header-item') && !$(target).hasClass('tabs__header-item_active')) {
                    var idElem = $(target).data('id');

                    tabsController.hideActiveTab();
                    tabsController.activeTab = tabsController.tabsList[idElem];
                    tabsController.showActiveTab();

                    break;
                }
                target = target.parentNode;
            }
        }
    });

    tabsController.addTab().render();
});