var Twitter = Class.create(Widget, {
  initialize: function($super, widget_id, config) {
    this.messages = [];
    return($super(widget_id, config));
  },
  receive: function(payload) {
    if(this.messages.length >= this.config.nitems) {
      this.messages.shift();
    }
    this.messages.push(payload);
    this.update();
  },
  update: function() {
    this.container.childElements().invoke('remove');
    this.container.appendChild(this.buildWidgetIcon());
    this.container.appendChild(this.buildHeader());
    this.messages.each(function(message) {
      var cont = new Element('p');
      cont.appendChild(new Element('img', { src: message.profile_image_url, width: 48, height: 48 }));
      cont.appendChild(new Element('a', { href: 'http://www.twitter.com/' + message.user, className: 'author' }).update(message.user));
      cont.appendChild(document.createTextNode(message.text));
      cont.appendChild(new Element('hr' ))
      this.container.appendChild(cont);
    }.bind(this));
  },

  buildHeader: function() {
    return(new Element("h2").update(this.title));
  },

  buildWidgetIcon: function() {
    return(new Element("img", {width: 32, height: 32, className: 'twitter_icon'}));
  }
});