function BodyTab(id) {
    Container.call(this, id);
}

BodyTab.prototype = Object.create(Container.prototype);
BodyTab.prototype.constructor = BodyTab;

BodyTab.prototype.createFormWrapper = function () {
    return $('<div />', { class: 'tab-form__wrapper' });
};

BodyTab.prototype.createFormLabelTitle = function (text,forId) {
    return $('<label />', { class: 'tab-form__title', for: forId, text: text });
};

BodyTab.prototype.createFormInput = function (elemType, elemClass, inputType, elemId, placeholder) {
    $formInput = $('<' + elemType + '/>',{class: elemClass});

    if (inputType !== '') {
        $formInput.attr({
            id: elemId,
            name: elemId,
            placeholder: placeholder,
            type: inputType
        });
    } else {
        $formInput.attr({
            id: elemId,
            name: elemId,
            placeholder: placeholder
        });
    }

    return $formInput;
};

BodyTab.prototype.render = function () {
    var $bodyItem = $('<div />', {
        class: 'tabs__body-item',
        'data-id': this.id
    });

    var $bodyForm = $('<form />', {
        class: 'tabs__body-form tab-form',
        action: '#',
        id: 'tabForm',
        name: 'tabForm'
    });

    $bodyForm.append(
        this.createFormWrapper().append(
            this.createFormLabelTitle('Тема:','tabName')
        ).append(
            this.createFormInput('input','tab-form__input','text','tabName','Новая вкладка')
        )
    ).append(
        this.createFormWrapper().append(
            this.createFormLabelTitle('Содержимое:','tabText')
        ).append(
            this.createFormInput('textarea','tab-form__text','', 'tabText', 'Введите текст...')
        )
    );

    return $bodyItem.append($bodyForm);
};