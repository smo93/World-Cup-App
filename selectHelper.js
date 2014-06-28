Handlebars.registerHelper('select', function(items, options) {
    var out = '<select class="form-control">';

    items.forEach(function(item) {
        out += ['<option value="', options.fn(item), '">', options.fn(item), '</option>'].join('');
    });

    out += '</select>';
    return out;
});
