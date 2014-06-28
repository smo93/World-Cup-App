$(document).ready(function() {
    var teams, jsonObj,
        selected_teams = [],
        selectors = 0,
        keys = ['wins', 'losses', 'draws', 'points'],
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

            var selector = $(selector_tmpl({ id: selectors, teams: teams }));

            main.children().last().prev().append(selector);

            selected_teams.push({ id: selectors });

            selector.on('change', 'select', function() {
                var $this = $(this),
                    country_code = $this.val(),
                    selected_team = teams.filter(function(elem) {
                            return elem.fifa_code === country_code;
                        })[0],
                    $id = $this.parent().attr('id');

                selected_teams[$id].team = selected_team;

                $this.parent().find('p').remove();

                if(country_code !== "NULL") {
                    $this.parent().append(team_info_tmpl(selected_team));
                    console.log(country_code);
                }

                compare_teams();
            });

            console.log(selected_teams);

            selectors += 1;
        });
    }

    function compare_teams() {
        if(selected_teams.filter( function(e) { return e.team !== undefined; }).length >= 2) {
            $('p').removeClass('alert-success').removeClass('alert-warning').addClass('alert-danger');
            keys.forEach(function(key) {
                var ids = [];

                if(key === 'losses') { ids = min(key); }
                else { ids = max(key); }

                if(ids.length > 1) {
                    ids.forEach(function(id) {
                        $('#' + id).find('.' + key).addClass('alert-warning').removeClass('alert-danger');
                    });
                } else {
                    $('#' + ids[0]).find('.' + key).addClass('alert-success').removeClass('alert-danger');
                }
            });
        } else {
            $('p').removeClass('alert-danger').addClass('alert-success');
        }
    }

    function max(prop) {
        var max_val = 0,
            max_ids = [];

        selected_teams.forEach(function(elem) {
            if(elem.team[prop] === max_val) {
                max_ids.push(elem.id);
            } else if (elem.team[prop] > max_val) {
                max_ids = [];
                max_val = elem.team[prop];
                max_ids.push(elem.id);
            }
        });

        return max_ids;
    }

    function min(prop) {
        var min_val = selected_teams[0].team[prop],
            min_ids = [];

        selected_teams.forEach(function(elem) {
            if(elem.team[prop] === min_val) {
                min_ids.push(elem.id);
            } else if (elem.team[prop] < min_val) {
                min_ids = [];
                min_val = elem.team[prop];
                min_ids.push(elem.id);
            }
        });

        return min_ids;
    }

    console.log(jsonObj);
});
