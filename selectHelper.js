Handlebars.registerHelper('select', function(items, options) {
    var out = '<select class="form-control"><option value="NULL">Select team...</option>';

    items.forEach(function(item) {
        out += ['<option value="', item.fifa_code, '">', item.country, '</option>'].join('');
    });

    out += '</select>';
    return out;
});
