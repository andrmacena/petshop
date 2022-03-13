/*! UIkit 3.11.1 | https://www.getuikit.com | (c) 2014 - 2022 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitcountdown', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitCountdown = factory(global.UIkit.util));
})(this, (function (uikitUtil) { 'use strict';

    var Class = {
      connected() {
        !uikitUtil.hasClass(this.$el, this.$name) && uikitUtil.addClass(this.$el, this.$name);
      } };

    var Component = {
      mixins: [Class],

      props: {
        date: String,
        clsWrapper: String },


      data: {
        date: '',
        clsWrapper: '.uk-countdown-%unit%' },


      computed: {
        date(_ref) {let { date } = _ref;
          return Date.parse(date);
        },

        days(_ref2, $el) {let { clsWrapper } = _ref2;
          return uikitUtil.$(clsWrapper.replace('%unit%', 'days'), $el);
        },

        hours(_ref3, $el) {let { clsWrapper } = _ref3;
          return uikitUtil.$(clsWrapper.replace('%unit%', 'hours'), $el);
        },

        minutes(_ref4, $el) {let { clsWrapper } = _ref4;
          return uikitUtil.$(clsWrapper.replace('%unit%', 'minutes'), $el);
        },

        seconds(_ref5, $el) {let { clsWrapper } = _ref5;
          return uikitUtil.$(clsWrapper.replace('%unit%', 'seconds'), $el);
        },

        units() {
          return ['days', 'hours', 'minutes', 'seconds'].filter((unit) => this[unit]);
        } },


      connected() {
        this.start();
      },

      disconnected() {
        this.stop();
        this.units.forEach((unit) => uikitUtil.empty(this[unit]));
      },

      events: [
      {
        name: 'visibilitychange',

        el() {
          return document;
        },

        handler() {
          if (document.hidden) {
            this.stop();
          } else {
            this.start();
          }
        } }],



      update: {
        write() {
          const timespan = getTimeSpan(this.date);

          if (timespan.total <= 0) {
            this.stop();

            timespan.days = timespan.hours = timespan.minutes = timespan.seconds = 0;
          }

          for (const unit of this.units) {
            let digits = String(Math.floor(timespan[unit]));

            digits = digits.length < 2 ? "0" + digits : digits;

            const el = this[unit];
            if (el.textContent !== digits) {
              digits = digits.split('');

              if (digits.length !== el.children.length) {
                uikitUtil.html(el, digits.map(() => '<span></span>').join(''));
              }

              digits.forEach((digit, i) => el.children[i].textContent = digit);
            }
          }
        } },


      methods: {
        start() {
          this.stop();

          if (this.date && this.units.length) {
            this.$emit();
            this.timer = setInterval(() => this.$emit(), 1000);
          }
        },

        stop() {
          if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
          }
        } } };



    function getTimeSpan(date) {
      const total = date - Date.now();

      return {
        total,
        seconds: total / 1000 % 60,
        minutes: total / 1000 / 60 % 60,
        hours: total / 1000 / 60 / 60 % 24,
        days: total / 1000 / 60 / 60 / 24 };

    }

    if (typeof window !== 'undefined' && window.UIkit) {
      window.UIkit.component('countdown', Component);
    }

    return Component;

}));
