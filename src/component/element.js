/* global document */
class Element {
  constructor(tag, className = '') {
    if (typeof tag === 'string') {
      this.el = document.createElement(tag);
      this.el.className = className;
    } else {
      this.el = tag;
    }
    this.data = {};
  }

  data(key, value) {
    if (value !== undefined) {
      this.data[key] = value;
      return this;
    }
    return this.data[key];
  }

  on(eventName, handler) {
    const [fen, ...oen] = eventName.split('.');
    // console.log('fen:', fen, oen);
    this.el.addEventListener(fen, (evt) => {
      handler(evt);
      for (let i = 0; i < oen.length; i += 1) {
        const k = oen[i];
        if (k === 'left' && evt.button !== 0) {
          return;
        } if (k === 'right' && evt.button !== 2) {
          return;
        } if (k === 'stop') {
          evt.stopPropagation();
        }
      }
    });
    return this;
  }

  offset(value) {
    if (value !== undefined) {
      Object.keys(value).forEach((k) => {
        this.css(k, `${value[k]}px`);
      });
      return this;
    }
    const {
      offsetTop, offsetLeft, offsetHeight, offsetWidth,
    } = this.el;
    return {
      top: offsetTop,
      left: offsetLeft,
      height: offsetHeight,
      width: offsetWidth,
    };
  }

  scroll(v) {
    const { el } = this;
    if (v !== undefined) {
      if (v.left !== undefined) {
        el.scrollLeft = v.left;
      }
      if (v.top !== undefined) {
        el.scrollTop = v.top;
      }
    }
    return { left: el.scrollLeft, top: el.scrollTop };
  }

  box() {
    return this.el.getBoundingClientRect();
  }

  parent() {
    return new Element(this.el.parentNode);
  }

  children(...eles) {
    eles.forEach(ele => this.child(ele));
    return this;
  }

  child(arg) {
    let ele = arg;
    if (typeof arg === 'string') {
      ele = document.createTextNode(arg);
    } else if (arg instanceof Element) {
      ele = arg.el;
    }
    this.el.appendChild(ele);
    return this;
  }

  contains(ele) {
    return this.el.contains(ele);
  }

  className(v) {
    if (v !== undefined) {
      this.el.className = v;
      return this;
    }
    return this.el.className;
  }

  addClass(name) {
    this.el.classList.add(name);
    return this;
  }

  hasClass(name) {
    return this.el.classList.contains(name);
  }

  removeClass(name) {
    this.el.classList.remove(name);
    return this;
  }

  toggle(cls = 'active') {
    this.toggleClass(cls);
    return this;
  }

  toggleClass(name) {
    this.el.classList.toggle(name);
    return this;
  }

  active(flag = true) {
    if (flag) this.addClass('active');
    else this.removeClass('active');
    return this;
  }

  disabled(flag = true) {
    if (flag) this.addClass('disabled');
    else this.removeClass('disabled');
    return this;
  }

  // key, value
  // key
  // {k, v}...
  attr(key, value) {
    if (value !== undefined) {
      this.el.setAttribute(key, value);
    } else {
      if (typeof key === 'string') {
        return this.el.getAttribute(key);
      }
      Object.keys(key).forEach((k) => {
        this.el.setAttribute(k, key[k]);
      });
    }
    return this;
  }

  removeAttr(key) {
    this.el.removeAttribute(key);
    return this;
  }

  html(content) {
    if (content !== undefined) {
      this.el.innerHTML = content;
      return this;
    }
    return this.el.innerHTML;
  }

  val(v) {
    if (v !== undefined) {
      this.el.value = v;
      return this;
    }
    return this.el.value;
  }

  cssRemoveKeys(...keys) {
    keys.forEach(k => this.el.style.removeProperty(k));
    return this;
  }

  // css( propertyName )
  // css( propertyName, value )
  // css( properties )
  css(name, value) {
    if (value === undefined && typeof name !== 'string') {
      Object.keys(name).forEach((k) => {
        this.el.style[k] = name[k];
      });
      return this;
    }
    if (value !== undefined) {
      this.el.style[name] = value;
      return this;
    }
    return this.el.style[name];
  }

  show() {
    this.css('display', 'block');
    return this;
  }

  hide() {
    this.css('display', 'none');
    return this;
  }
}

const h = (tag, className = '') => new Element(tag, className);

export {
  Element,
  h,
};
