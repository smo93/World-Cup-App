var groceries = [{
    type: "fruit",
    name: "banana",
    image: "http://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/166px-Banana-Single.jpg"
  }, {
    type: "fruit",
    name: "apple",
    image: "http://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/160px-Red_Apple.jpg"
  }, {
    type: "fruit",
    name: "grape",
    image: "http://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Table_grapes_on_white.jpg/217px-Table_grapes_on_white.jpg"
  }, {
    type: "fruit",
    name: "watermelon",
    image: "http://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Taiwan_2009_Tainan_City_Organic_Farm_Watermelon_FRD_7962.jpg/96px-Taiwan_2009_Tainan_City_Organic_Farm_Watermelon_FRD_7962.jpg"
  }, {
    type: "vegetable",
    name: "potato",
    image: "http://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Patates.jpg/220px-Patates.jpg"
  }, {
    type: "vegetable",
    name: "carrot",
    image: "http://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/13-08-31-wien-redaktionstreffen-EuT-by-Bi-frie-037.jpg/218px-13-08-31-wien-redaktionstreffen-EuT-by-Bi-frie-037.jpg"
  }, {
    type: "vegetable",
    name: "turnip",
    image: "http://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Turnip_2622027.jpg/218px-Turnip_2622027.jpg"
  }, {
    type: "vegetable",
    name: "lettuce",
    image: "http://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Iceberg_lettuce_in_SB.jpg/320px-Iceberg_lettuce_in_SB.jpg"
  }];

$(document).ready(function() {
  var block= _.template([
      '<div class="col-sm-3 block <%= type %>">',
      '<img src="<%= image %>">',
      '<h3 class="text-center"><%= name %></h3>',
      '</div>'
    ].join('')),
    label = _.template('<div class="row"><div class="col-sm-12 alert alert-warning"><h3><%= label %></h3></div></div>');

  var groupedGroceries = _.groupBy(groceries, function(item) { return item.type; });

  for(var key in groupedGroceries) {
    $('#main').append(label({label: key}));

    groupedGroceries[key].forEach(function(item, i) {
      if(i % 4 === 0) {
        $('#main').append('<div class="row"></div');
      }

      $('#main').find('.row').last().append(block(item));
    });
  }
});
