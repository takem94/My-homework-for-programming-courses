function Carousel(settings) {
    // DOM Elements
    this.$listWrapper = $(settings.listWrapper);
    this.$listItems = $(settings.listItems);
    this.$items = $(this.$listItems.children());

    this.itemsToView = settings.toView;
    this.itemsToScroll =  settings.toScroll;
    this.timeInterval = settings.timeInterval;

    this.infiniteScroll = false || settings.infiniteScroll;
    this.transitionDone = true;

    settings.anamationTime = '.6' || settings.anamationTime;

    this.$listItems.css('transition', 'left' + settings.anamationTime + 's ease');

    this.init();
}

Carousel.prototype.init = function () {

    this.wrapperWidth = this.$listWrapper.width() - 15;
    this.itemWidth = this.wrapperWidth / this.itemsToView;
    this.dynamicOffset = 0;
    this.offsetItem = 0;

    if (this.infiniteScroll) {
        // To make infinite effect.
        for (var i = (this.$items.length-1); i > ( (this.$items.length-1) - this.itemsToView); --i) {
            this.$listItems.prepend($(this.$items[i]).clone().addClass('cloned'));
        }
    }

    // Check if the list to view is full of items.
    var remainder = this.$items.length % this.itemsToView;

    if (remainder > 0 && (this.itemsToScroll > 1 || this.infiniteScroll)) {

        for (var i = 0; i < (this.itemsToView - remainder); ++i) {
            this.$listItems.append($(this.$items[i]).clone().addClass('cloned'));
        }
        this.remainder = remainder;
    }

    // Update properties to new values.
    this.$items = $(this.$listItems.children());
    this.offsetItem = -(this.itemWidth * this.itemsToView);

    // Count to scroll items.
    this.itemWidth = this.itemWidth * this.itemsToScroll;

    this.resize();

    // Change offset, if we made copy elements.
    if(this.infiniteScroll)
        this.$listItems.css('left', this.offsetItem + 'px');

    // Listeners
    this.$listItems.on('transitionend webkitTransitionEnd oTransitionEnd', function () {
        this.transitionDone = true;

        if(this.$listWrapper.css('opacity') !== '1')
            this.$listWrapper.css('opacity', '1');
    }.bind(this));

    // To freeze scroll when user mouse on good.
    this.$listWrapper.on('mouseover', function () {
       this.timePause = true;
    }.bind(this));

    this.$listWrapper.on('mouseout',function () {
        this.timePause = undefined;
    }.bind(this));

    $(window).on('resize',function () {
        this.resize();
    }.bind(this));

    // Interval to scroll
    if (this.timeInterval !== undefined) {
        this.timer = setInterval(function () {
            if(this.timePause === undefined)
                this.scrollRight();
        }.bind(this), this.timeInterval);
    }
};

Carousel.prototype.resize = function () {
    this.$listWrapper.css('opacity', '0');
    this.$listWrapper.css('opacity');

    var itemWidth = (this.$listWrapper.width() - 15) / this.itemsToView;
    var listWidth = itemWidth * this.$items.length;

    this.$listItems.width(listWidth);
    this.$items.width(itemWidth);

    // Update values.
    this.itemWidth = itemWidth * this.itemsToView;
    this.offsetItem = -this.itemWidth;

    this.$listItems.css('left', this.offsetItem + 0 + 'px');

    this.$listWrapper.css('opacity', '1');
};

Carousel.prototype.scrollRight = function () {

    if(this.transitionDone) {
        this.transitionDone = false;

        var currentLeft = parseInt(this.$listItems.css('left'));
        var currentWidth = this.$listItems.width();

        if( ((-currentLeft) + (this.$listWrapper.width() + 30)) < (currentWidth)
            && ((currentLeft + (-this.itemWidth)) + currentWidth) >= this.itemWidth)
            this.$listItems.css('left', (currentLeft + (-this.itemWidth)) + 'px');
        else if (!this.infiniteScroll)
            this.$listItems.css('left', '0px');
        else
            this.jump(true);
    }
};

Carousel.prototype.scrollLeft = function () {

    if(this.transitionDone) {
        this.transitionDone = false;

        var currentLeft = parseInt(this.$listItems.css('left'));
        var currentWidth = this.$listItems.width();

        if( currentLeft < 0 && -currentLeft >= this.itemWidth)
            this.$listItems.css('left', (currentLeft + this.itemWidth) );
        else if (!this.infiniteScroll)
            this.$listItems.css('left', - (currentWidth - this.itemWidth)  + 'px');
        else
            this.jump(false);
    }
};

Carousel.prototype.jump = function (direction) {
    var tempTransition = this.$listItems.css('transition');

    this.$listItems.css('transition', 'none');
    this.transitionDone = true;

    // This is the most difficult part of the code, it response for infinite scroll when list for view is not full of items.
    // --- I spent for this 2 days ---
    if(this.remainder !== undefined){

        this.offsetItem = this.offsetItem + (((this.itemWidth / this.itemsToScroll) * this.remainder));

        if (this.offsetItem > 0) {
            this.offsetItem = this.dynamicOffset;
        } else if (this.firstJump === undefined) {
            this.dynamicOffset = this.offsetItem;
            this.firstJump = true;
        }
    } else {
        this.offsetItem = 0;
    }

    // If direction true - scroll to right, else if it false - scroll to left.
    if (direction)
        this.$listItems.css('left', (0 + this.offsetItem) + 'px');
    else
        this.$listItems.css('left', (-(this.$listItems.width() - this.itemWidth) + -this.offsetItem + 'px' ));

    this.$listItems.css('left');
    this.$listItems.css('transition', tempTransition);

    direction ? this.scrollRight() : this.scrollLeft();
};