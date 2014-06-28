$(document).ready(function() {
    var teams, jsonObj,
        selectors = 0,
        selector_tmpl_source = $('#selector').html(),
        selector_tmpl = Handlebars.compile(selector_tmpl_source),
        team_info_tmpl_source = $('#team-info').html(),
        team_info_tmpl = Handlebars.compile(team_info_tmpl_source);

    jsonObj = $.getJSON('http://worldcup.sfg.io/teams/results', function(data) {
        teams = data;
    })
        .done(addButton);

    function addButton() {
        var main = $('#main'),
            btn = main.append('<div class="col-xs-12 center"><button class="btn btn-primary">Add team</button></div>');
        btn.on('click', 'button', function() {
            if(selectors % 2 === 0) {
                main.children().last().before('<div class="row"><div class="col-xs-2"></div></div>');
            }

            var selector = $(selector_tmpl({ teams: teams }));

            main.children().last().prev().append(selector);

            selector.on('change', 'select', function() {
                var $this = $(this),
                    country_code = $this.val();

                $this.parent().find('p').remove();

                if(country_code !== "NULL") {
                    $this.parent().append(team_info_tmpl(teams.filter(function(elem) {
                            return elem.fifa_code === country_code;
                        })[0]));
                    console.log(country_code);
                }
            });

            selectors += 1;
        });
    }

    console.log(jsonObj);
});
