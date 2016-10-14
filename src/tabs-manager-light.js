/*!
 * tabs-manager-light
 * v2.0.0
 * (https://github.com/gionatan-lombardi/tabs-manager-light)
 * Based on Remy Sharp's post, "How tabs should work" - https://24ways.org/2015/how-tabs-should-work/
 * Copyright (c) Remy Sharp - http://remysharp.com
 */

( function(window) {

'use strict';

// Utility Functions

//http://youmightnotneedjquery.com/#deep_extend
function extend(out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];

    if (!obj)
      continue;

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object')
          out[key] = extend(out[key], obj[key]);
        else
          out[key] = obj[key];
      }
    }
  }

  return out;
}

var buildObj = {

  // a temp value to cache *what* we're about to show
  target: null,
  prevTab: null,
  currentTab: null,
  prevPanel: null,
  currentPanel: null,

  // Plugin Specific Functions

  update: function update() {
    var self = this;

    if (self.target) {
      self.target.id = self.target.getAttribute('data-old');
      self.target = null;
    }

    var hash = window.location.hash;
    if (self.targets.indexOf(hash) !== -1) {
      return self.show(hash);
    }

    // Fixes going "back" on the browser nav to an empty state
    if (!hash) {
      self.show();
    }
  },

  show: function show(id) {
    var self = this;
    var openTab = false;
    var openPanel = false;

    // if no value was given, let's take the first panel
    if (!id) {
      id = self.targets[0];
    }

    // Loops over the tabs
    for (var i = 0; i < self.allTabs.length; ++i) {
      var el = self.allTabs[i];

      if (el.classList.contains(self.options.tabCurrentClass)) {
        self.prevTab = el;
      }

      // remove the selected class from the tabs
      el.classList.remove(self.options.tabCurrentClass)
      el.setAttribute('aria-selected', 'false');

      // and add it to the one the user selected
      if (el.hash === id) {
        self.currentTab = el;
        openTab = true;
      }
    }

    // Loops over the panels
    for (var i = 0; i < self.panels.length; ++i) {
      var el = self.panels[i];

      if (el.classList.contains(self.options.panelOpenClass)) {
        self.prevPanel = el;
      }
      // Remove open class to all the panels
      el.classList.remove(self.options.panelOpenClass);
      el.setAttribute('aria-hidden', 'true');

      // adds open class the the target panel
      if (('#'+el.id) === id) {
        self.currentPanel = el;
        openPanel = true;
      }
    }

    if (openTab) {
      self.currentTab.classList.add(self.options.tabCurrentClass)
      self.currentTab.setAttribute('aria-selected', 'true');
    }

    if (openPanel) {
      self.currentPanel.classList.add(self.options.panelOpenClass);
      self.currentPanel.setAttribute('aria-hidden', 'false');
      // Public callback
      if (self.options.onPanelChange) {
        self.options.onPanelChange(self.currentTab, self.currentPanel, self.prevTab, self.prevPanel);
      }
    }

  },

  // Public exposed methods

  onPanelChange: function onPanelChange(fn) {
    fn();
  },

  init: function init(element) {
    var self = this;

    // An empty array
    self.targets = []

    // Collects all the tabs in a NodeList
    self.allTabs = document.querySelectorAll(element);

    // Loops over the tab's NodeList
    for (var i = 0; i < self.allTabs.length; ++i) {
      var el = self.allTabs[i];
      // Adds a click event to every tab link
      el.addEventListener('click', function() {
        self.target = document.querySelector(this.hash);
        self.target.removeAttribute("id");
        if (location.hash === this.hash) {
          setTimeout(self.update.bind(self));
        }
      });

      // Sets the tabindex attribute
      el.setAttribute('tabindex', 0);

      // populates an array of the panel ids (from the anchor hash)
      self.targets.push(el.hash);
    }

    // use those ids to get a NodeList collection of panels
    self.panels = document.querySelectorAll(self.targets.join(','));

    // Loops over the panel's NodeList to set the data-old attribute
    for (var i = 0; i < self.panels.length; ++i) {
      var el = self.panels[i];
      el.setAttribute('data-old', el.id);
    }

    window.addEventListener( 'hashchange', self.update.bind(self) );

    // initialise
    if (self.targets.indexOf(window.location.hash) !== -1) {
      self.update();
    } else {
      self.show();
    }

    return {
      tabs: self.allTabs,
      panels: self.panels,
      get currentTab() {
        return self.currentTab
      },
      get currentPanel() {
        return self.currentPanel
      },
    }
  },

};

// The Plugin Exposed Function (init)
function tabsManagerLight(element, cstOptions) {
  var defaultOptions = {
    tabCurrentClass: 'is-current',
    panelOpenClass: 'is-open'
  }
  var options = extend(defaultOptions, cstOptions);
  var o = Object.create(buildObj);
  o.options = options;
  return o.init(element);
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( tabsManagerLight );
} else if ( typeof exports === 'object' ) {
  // CommonJS
  module.exports = tabsManagerLight;
} else {
  // browser global
  window.tabsManagerLight = tabsManagerLight;
}

})( window );
