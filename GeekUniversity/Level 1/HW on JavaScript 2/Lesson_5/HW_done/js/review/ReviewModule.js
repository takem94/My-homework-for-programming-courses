function ReviewModule(appendTo) {

    this.appendTo = appendTo;
    this.reviewsList = [];

    this.init();
}

ReviewModule.prototype.init = function () {
    $.get({
        url: 'review.list.json',
        dataType: 'json',
        context: this,
        success: function (data) {

            if (parseInt(data.result) !== 0) {

                for ( var key in data.comments) {
                    var item = data.comments[key],
                        time = new Date(parseInt(item['time'])),
                        newElem = new Review(item['id_comment'], item['text'], item['user_name'], item['user_id'], time, item['approved']);

                    this.reviewsList.push({item: item, htmlElem: newElem.render()});
                }
            }
        }
    });
};

ReviewModule.prototype.render = function () {

  for (var key in this.reviewsList) {
      this.appendTo.append(this.reviewsList[key].htmlElem);
  }
};

ReviewModule.prototype.refresh = function () {
    this.appendTo.empty();
    this.render();

    this.appendTo[0].scrollTop = this.appendTo[0].scrollHeight;
};

ReviewModule.prototype.add = function (sendData) {
    /* Как должно было быть.

    $.post({
        url: 'review.add.json',
        dataType: 'json',
        data: sendData,
        success: function (data) {
            if (parseInt(data.result) !== 0) {
                console.log(data.userMessage);
            } else {
                console.log(data.['error_message'])
            }
        }
    });
    */

    var time = new Date(parseInt(sendData['time'])),
        newElem = new Review(sendData['id_comment'], sendData['text'], sendData['user_name'], sendData['user_id'], time);

    this.reviewsList.push({ item: sendData, htmlElem: newElem.render()});

    this.refresh();
};

ReviewModule.prototype.remove = function (id) {
    var elemId;

    for(var key in this.reviewsList) {

        if (this.reviewsList[key].item['id_comment'] == id) {
            elemId = key;
            break;
        }
    }

    if (elemId !== undefined) {
        this.reviewsList.splice(elemId,1);

        this.appendTo.children().each(function () {

            if ($(this).data('id') == id) {
               $(this).remove();
               return 0;
            }
        });
    }
};

ReviewModule.prototype.submit = function (id) {

    for(var key in this.reviewsList) {

        if (this.reviewsList[key].item['id_comment'] == id) {
            this.reviewsList[key].item['aprroved'] = 1;
            return 0;
        }
    }
    return 1;
};