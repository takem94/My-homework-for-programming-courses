class DnD {
  constructor (settings) {
    this.from = settings.fromZone;
    this.to = settings.toZone;

    this.fromId = settings.fromId;
    this.toId = settings.toId;

    this.elemClass = settings.elemClass;
    this.toWrapperClass = settings.toZoneWrapperClass;

    this.transformBtn = settings.transformBtn;

    this.clone = null;
    this.original = null;
    this.offsetY = null;
    this.offsetX = null;
  }

  init () {
    let that = this;

    this.from.addEventListener('mousedown', onDragStart);

    // Это не очень продуманный дизайн класса, изначально, я хотел сделать функции
    // связанные с DnD как методы объекты, но не учел проблему контекста, в данном
    // случае, частично это можно было решить с использованием bind, но тогда
    // возникала проблема с удалением событий с элементов DOM.

    // Также, я решил не использовать DnD HTML5, т.к. его реализация сильно отличается
    // в разных браузерах, особенно в FireFox, где событие "Drag" не имеет свойства
    // с кординатами курсора, в то время как Google Chrome это свойство имеет. Нужно это
    // для смещения клонированного элемента под курсором мыши.

    function onDragStart (e) {
      if (!e.target.classList.contains(that.elemClass)) { return; }

      let positionElem = e.target.getBoundingClientRect();

      that.offsetY = e.pageY - positionElem.top;
      that.offsetX = e.pageX - positionElem.left;

      that.clone = e.target.cloneNode(true);
      that.clone.classList.add('clone');

      that.clone.style.top = positionElem.top + 'px';
      that.clone.style.left = positionElem.left + 'px';

      document.body.appendChild(that.clone);

      that.original = e.target;
      that.original.style.opacity = 0;

      that.original.ondragstart = that.clone.ondragstart = () => {
        return false;
      };

      controlListeners('addEventListener');
    }

    function onDragMove (e) {
      let positionElem = that.clone.getBoundingClientRect();

      let offsetY = e.pageY - that.offsetY;
      let offsetX = e.pageX - that.offsetX;

      if (offsetY < 0) {
        offsetY = 0;
      } else if ((offsetY + positionElem.height) > window.innerHeight) {
        offsetY = window.innerHeight - positionElem.height;
      }

      if (offsetX < 0) {
        offsetX = 0;
      } else if ((offsetX + positionElem.width) > window.innerWidth) {
        offsetX = window.innerWidth - positionElem.width;
      }

      that.clone.style.top = offsetY + 'px';
      that.clone.style.left = offsetX + 'px';
    }

    function onDragEnd (e) {
      controlListeners('removeEventListener');

      that.original.style.opacity = 1;
      that.clone.outerHTML = '';

      that.clone = null;
      that.original = null;
    }

    function onOverDrop (e) {
      if (e.target.classList.contains(that.elemClass)) {
        e.target.style.borderTop = '60px solid white';
        e.target.addEventListener('mouseleave', onLeaveDrop);
      }
    }

    function onLeaveDrop (e) {
      if (e.target.classList.contains(that.elemClass)) {
        e.target.style.borderTop = '0 solid white';
        e.target.removeEventListener('mouseleave', onLeaveDrop);
      }
    }

    function onDrop (e) {
      const toZone = e.target === that.to;
      const elemContains = e.target.classList.contains(that.elemClass);

      let status = false; let target = e.target;

      if (elemContains) {
        while (!target.classList.contains(that.toWrapperClass)) {
          if (target.id && target.id === that.toId) {
            status = true;
            break;
          }

          target = target.parentElement;
        }
      }

      if (toZone || elemContains) {
        let btn = that.original.lastElementChild;

        that.transformBtn(btn);

        if (status) {
          let temp = e.target.style.transition;

          e.target.style.transition = 'border 0s';
          e.target.style.borderTop = '0px';
          e.target.offsetHeight;

          e.target.parentNode.insertBefore(that.original, e.target);

          e.target.style.transition = temp;
        } else {
          e.target.appendChild(that.original);
        }
      }
    }

    function controlListeners (action) {
      document[action]('mousemove', onDragMove);
      document[action]('mouseup', onDragEnd);

      that.to[action]('mouseover', onOverDrop);
      that.to[action]('mouseleave', onLeaveDrop);
      that.to[action]('mouseup', onDrop);
    }
  }
}

export { DnD };
