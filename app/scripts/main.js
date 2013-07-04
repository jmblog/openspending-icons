/*global spendingjpIcons, $*/
'use strict';

var defailtFillColor = '#000';

window.spendingjpIcons = {
    Models: {},
    Collections: {},
    Views: {},
    Data: {},
    init: function () {
      var iconList = new spendingjpIcons.Collections.IconList(),
          extraIconList = new spendingjpIcons.Collections.IconList(),
          iconListView = new spendingjpIcons.Views.IconList({ collection: iconList }),
          extraIconListView = new spendingjpIcons.Views.IconList({ collection: extraIconList });

      // Add models to the collections
      _.each(spendingjpIcons.Data.Icons, function(path) {
        var filename = path.replace(/^(.+)\//, ''),
            basename = filename.replace(/\.svg/, '');
        if (path.match(/extras/)) {
          extraIconList.add({ path: path, filename: filename, basename: basename });
        } else {
          iconList.add({ path: path, filename: filename, basename: basename });
        }
      });
      
      // Render a page
      setTimeout(function() {
        $('#icon-list').html(iconListView.render().el);
        $('#extra-icon-list').html(extraIconListView.render().el);
      }, 1500);
      
      // Prepare a color-picker
      $('#spectrum').spectrum({
        preferredFormat: 'hex',
        showInput: true,
        showPalette: true,
        showSelectionPalette: true,
        palette: ['#830242'],
        localStorageKey: 'spectrum.spendingjpicons',
        color: defailtFillColor,
        change: function(color) {
          iconList.each(function(icon) {
            icon.set('fillColor', color.toHexString());
          });
          extraIconList.each(function(icon) {
            icon.set('fillColor', color.toHexString());
          });
        }
      });
      
      // Prepare a flip-icon manager
      $('#flip-icons').on('click', 'a', function(e) {
        e.preventDefault();
        iconList.each(function(icon) {
          icon.set('active', !icon.get('active'));
        });
        extraIconList.each(function(icon) {
          icon.set('active', !icon.get('active'));
        });
      });
      
      // Fixed header manager
      var $window = $(window),
          $body = $('body');
      
      $window.scroll(function() {
        var scrollTop = $window.scrollTop();
        if (scrollTop > 10) {
          $body.addClass('fixed');
        } else {
          $body.removeClass('fixed');
        }
      });
    }
};

// Models
spendingjpIcons.Models.Icon = Backbone.Model.extend({
  defaults: function() {
    return {
      fillColor: defailtFillColor,
      active: false
    };
  }
});

// Collections
spendingjpIcons.Collections.IconList = Backbone.Collection.extend({
  model: spendingjpIcons.Models.Icon
});

// Views
spendingjpIcons.Views.Icon = Backbone.View.extend({
  className: 'icon-list-item',
  initialize: function() {
    this.$el.attr('original-title', this.model.get('filename'));
    this.listenTo(this.model, 'change:fillColor', this.refill); // アイコンの色が変わったら再描画
    this.listenTo(this.model, 'change:active', this.toggle); // アイコンの色が変わったら再描画
  },
  events: {
    //'click svg': 'toggle'
  },
  render: function() {
    var iconRad = 35,
        paper;
    
    this.$el.empty();
    
    paper = new Raphael(this.el, iconRad + iconRad, iconRad + iconRad + 5);
    paper.circle(iconRad,iconRad,iconRad).attr({ fill: this.model.get('fillColor'), stroke: 'none' });
    paper.circle(iconRad,iconRad,iconRad-2).attr({ fill: 'none', stroke: '#eee', opacity: 0.8, 'stroke-dasharray': '- ' });
    $.get(this.model.get('path'), function(svg) {
      if (typeof(svg) === 'string') {
        svg = $(svg);
        svg = svg[svg.length-1];
      }
      var j,
          icon,
          joined='',
          paths = svg.getElementsByTagName('path');
      for (j=0; j<paths.length; j++) {
        joined += paths[j].getAttribute('d') + ' ';
      }
      icon = paper.path(joined);
      icon.attr({ fill: 'white', stroke: 'none' });
      icon.scale(iconRad/50, iconRad/50, 0, 0);
    });
    this.$el.append('<div><a href="https://raw.github.com/spendingjp-icons/spendingjp-icons.github.com/master/' + this.model.get('path') + '" download="' + this.model.get('filename') + '" target="_blank">' + this.model.get('basename') + '</a></div>');
    return this;
  },
  toggle: function() {
    if (this.model.get('active') === true) {
      this.$el.find('svg circle').css({ fill: '#fff' });
      this.$el.find('svg circle').last().css({ stroke: 'none' });
      this.$el.find('svg path').css({ fill: this.model.get('fillColor'), stroke: 'none' });
    } else {
      this.refill();
    }
  },
  refill: function() {
    this.model.set('active', false);
    this.$el.find('svg circle').css({ fill: this.model.get('fillColor') });
    this.$el.find('svg circle').last().css({ stroke: '#eee' });
    this.$el.find('svg path').css({ fill: '#fff', stroke: 'none' });
  }
});

spendingjpIcons.Views.IconList = Backbone.View.extend({
  render: function(color) {
    var iconViewElements = [];
    this.$el.empty();
    this.collection.each(function(icon) {
      var iconView = new spendingjpIcons.Views.Icon({ model: icon });
      iconViewElements.push(iconView.render(color).el);
    }, this);
    this.$el.append(iconViewElements);
    return this;
  }
});

/* Order and include as you please. */
require('app/scripts/data/*');

$(document).ready(function () {
  spendingjpIcons.init();
  
  
});
