/*!
 * tabs-manager-light 
 * v1.0.0
 * (https://github.com/gionatan-lombardi/tabs-manager-light)
 * Based on Remy Sharp's post, "How tabs should work" - https://24ways.org/2015/how-tabs-should-work/
 * Copyright (c) 2016 Gionatan Lombardi
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Tabs Manager Light requires jQuery')
}

(function($) {

  'use strict';

  $.fn.tabsManagerLight = function( options ) {
   
    var self = this;

    // Extend the default options with those provided.
    self.opts = $.extend( {}, $.fn.tabsManagerLight.defaults, options );

    this.each( function () {

      // Tabs jQuery collection
      var $tabs = $(this).find('a[href^="#"]');

      // a temp value to cache *what* we're about to show
      var target = null;

      // collect all the tabs
      var tabs = $tabs.on('click', function() {
        console.log('click')
        target = $(this.hash).removeAttr('id');
        if (location.hash === this.hash) {
          setTimeout(update);
        }
      }).attr('tabindex', '0');

      // get an array of the panel ids (from the anchor hash)
      var targets = tabs.map(function() {
        return this.hash;
      }).get();

      // use those ids to get a jQuery collection of panels
      var panels = $(targets.join(',')).each(function() {
        // keep a copy of what the original el.id was
        $(this).data('old-id', this.id);
      });

      function update() {
        console.log('update')
        if (target) {
          target.attr('id', target.data('old-id'));
          target = null;
        }

        var hash = window.location.hash;
        if (targets.indexOf(hash) !== -1) {
          return show(hash);
        }

        // Fixes going "back" on the browser nav to an empty state
        if (!hash) {
          show();
        }
      }

      function show(id) {
        // if no value was given, let's take the first panel
        if (!id) {
          id = targets[0];
        }
        // remove the selected class from the tabs,
        // and add it back to the one the user selected
        tabs.removeClass(self.opts.tabCurrentClass).attr('aria-selected', 'false').filter(function() {
          return (this.hash === id);
        }).addClass(self.opts.tabCurrentClass).attr('aria-selected', 'true');

        // now hide all the panels, then filter to
        // the one we're interested in, and show it
        panels.removeClass(self.opts.panelOpenClass).attr('aria-hidden', 'true').filter(id).addClass(self.opts.panelOpenClass).attr('aria-hidden', 'false');
      }

      // Public function
      function init() {

        window.addEventListener('hashchange', update);

        // initialise
        if (targets.indexOf(window.location.hash) !== -1) {
          update();
        } else {
          show();
        }
      };

      init();

    });

  };

  // Default Plugin Options
  $.fn.tabsManagerLight.defaults = {
    tabCurrentClass: 'is-current',
    panelOpenClass: 'is-open'
  };

})(jQuery);