var changeTime = function (matches) {
    matches.forEach(function (match, i) {
        var date = new Date(match.datetime),
            newTime = date.toLocaleTimeString();

        newTime = newTime.slice(0, newTime.length - 3);
        matches[i].startTime = newTime;

    });
    return matches;
};

var editProgressTime = function (matches) {
    matches.forEach(function (match, i) {
        if (match.status === "in progress") {
            var date = new Date(match.datetime),
                matchTime = date.getTime(),
                current = new Date(),
                currentTime = current.getTime(),
                progress = currentTime - matchTime;

            progress = parseInt(progress/(1000*60));
            matches[i].progressTime = progress;

            $("#minutesLeft").text(progress);
        } else if (match.status === "completed") {
            matches[i].completed = true;
        }
    });
    return matches;
};

var loadMatches = function(template, matches ){
    var result = "";
matches.forEach(function(match){
    result += template(match);
});
    return result;
};

$(document).ready(function () {
    var source   = $("#result-block").html(),
        template = Handlebars.compile(source),
        pop = $('#info-pop').html(),
        pop_template = Handlebars.compile(pop);

    $.getJSON('http://worldcup.sfg.io/matches/today', function (matches) {
        matches = changeTime( matches);
        matches= editProgressTime(matches);

        $("#main").append(loadMatches(template, matches));

        updateProgressBars(matches);

        $.getJSON('http://worldcup.sfg.io/teams/results', function(teams) {
            $('.flag').each(function() {
                var $this = $(this),
                    country = $this.data('country'),
                    popover_content = pop_template(teams.filter(function(x) {
                        return x.country == country; })[0]);

                $this.data('content', popover_content);
                $this.popover({toggle : 'click'});
            });
            setInterval(function () {
                matches = editProgressTime(matches);
            }, 60000);

        });

    });

    function updateProgressBars(matches) {
        matches.filter(function(match) { return match.status === 'in progress'; })
            .forEach(function(match) {
                if(match.progressTime <= 90) {
                    $('#' + match.match_number).find('.progress-bar').width(((match.progressTime / 90) * 100).toString() + '%');
                } else {
                    $('#' + match.match_number).find('.progress-bar').width('100%');
                }
            });
    }
});
