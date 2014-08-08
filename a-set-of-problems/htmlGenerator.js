var _ = require('lodash');

var htmlGenerator = {
  link : function(data) {
    var linkTemplate = '<a href="<%= href %>" title="<%= title %>"><%= label %></a>';

    if('href' in data && 'title' in data && 'label' in data) {
      return _.template(linkTemplate, data);
    }

    return false;
  },
  paragraph : function(data) {
    var paragraphTemplate = '<p><%= label %></p>';

    if('label' in data) {
      return _.template(paragraphTemplate, data);
    }

    return false;
  },
  list : function(data) {
    var listTemplate = [
      '<<%= type %>>',
      '<% _.forEach(children, function(item) { %><li><%- item.label %></li><% }); %>',
      '</<%= type %>>'
    ].join('');

    if('type' in data && 'children' in data) {
      return _.template(listTemplate, data);
    }

    return false;
  },
  tag : function(data) {
    var
      attrTemplate = '<% _.forEach(attributes, function(attr) { %> <%= attr.key %>="<%= attr.value %>"<% }); %>',
      tagTemplate = [
        '<<%= tagName %><%= attrString %>>',
        '<%= data %>',
        '</<%= tagName %>>'
      ].join('');

    if(!('tagName' in data)) { return false; }

    if('attributes' in data) {
      data.attrString = _.template(attrTemplate, {attributes : data.attributes});
    } else {
      data.attrString = '';
    }

    return _.template(tagTemplate, data);
  }
};

var
  paragraph = htmlGenerator.paragraph({label : 'Some paragraph.'}),
  link = htmlGenerator.link({href : 'google.bg', title : 'google', label : 'click me'}),
  list = htmlGenerator.list({type : 'ul', children : [{label : 'Item 1'}, {label : 'Item 2'}]}),
  tag = htmlGenerator.tag({
    tagName: "div",
    data: htmlGenerator.tag({
      tagName: "h1",
      data: "Hello!"
    }),
    attributes: [{
      key: "class",
      value: "container"
    }, {
      key: "id",
      value: "main-container"
    }]
  });

console.log(paragraph);
console.log(link);
console.log(list);
console.log(tag);
