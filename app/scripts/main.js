/*global openSpendingIcons, $*/
'use strict';

var defailtFillColor = '#000';

window.openSpendingIcons = {
    Models: {},
    Collections: {},
    Views: {},
    Data: {},
    init: function () {
      var iconList = new openSpendingIcons.Collections.IconList(),
          iconListView = new openSpendingIcons.Views.IconList({ collection: iconList });

      // Add models to the collections
      _.each(openSpendingIcons.Data.Icons, function(path) {
        var filename = path.replace(/^(.+)\//, ''),
            basename = filename.replace(/\.svg/, ''),
            subdir = path.match(/^icons\/(.+)\/.+\.svg/);
        iconList.add({ path: path, filename: filename, basename: basename, subdir: subdir ? subdir[1] : '' });
      });
      
      // Render a page
      setTimeout(function() {
        $('#icon-list').html(iconListView.render().el);
      }, 1500);
      
      // Prepare a color-picker
      $('#spectrum').spectrum({
        preferredFormat: 'hex',
        showInput: true,
        showPalette: true,
        showSelectionPalette: true,
        palette: ['#830242'],
        localStorageKey: 'spectrum.openSpendingIcons',
        color: defailtFillColor,
        change: function(color) {
          iconList.each(function(icon) {
            icon.set('fillColor', color.toHexString());
          });
        }
      });
      
      // Prepare a toggle switch
      $('#toggle-switch').on('change', function() {
        iconList.each(function(icon) {
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
openSpendingIcons.Models.Icon = Backbone.Model.extend({
  defaults: function() {
    return {
      fillColor: defailtFillColor,
      active: false
    };
  }
});

// Collections
openSpendingIcons.Collections.IconList = Backbone.Collection.extend({
  model: openSpendingIcons.Models.Icon
});

// Views
openSpendingIcons.Views.Icon = Backbone.View.extend({
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
    this.$el.append('<div><a href="https://raw.github.com/jmblog/spendingjp-icons/master/app/' + this.model.get('path') + '" download="' + this.model.get('filename') + '" target="_blank">' + this.model.get('basename') + '</a></div>');
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

openSpendingIcons.Views.IconList = Backbone.View.extend({
  render: function(color) {
    var iconViewElements = [];
    this.$el.empty();
    var originals = this.collection.where({ subdir: '' });
    var groupBySubdir = this.collection.groupBy(function(icon) {
      return icon.get('subdir');
    });
    
    // Render original icons
    iconViewElements.push('<h2>Originals</h2>');
    _.each(originals, function(icon) {
      var iconView = new openSpendingIcons.Views.Icon({ model: icon });
      iconViewElements.push(iconView.render(color).el);
    });
    
    // Render extra icons
    _.each(groupBySubdir, function(icons, subdir) {
      if (subdir) {
        iconViewElements.push('<hr />\n<h2>' + subdir + '</h2>');
        _.each(icons, function(icon) {
          var iconView = new openSpendingIcons.Views.Icon({ model: icon });
          iconViewElements.push(iconView.render(color).el);
        });
      }
    });
    this.$el.append(iconViewElements);
    return this;
  }
});

/* Order and include as you please. */
require('app/scripts/data/*');

$(document).ready(function () {
  openSpendingIcons.init();
  
  
});
