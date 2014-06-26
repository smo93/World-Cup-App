var changeTime = function (matches) {
    matches.forEach(function (match, i) {
        var date = new Date(match.datetime);
        var newTime = date.toLocaleTimeString();
        newTime = newTime.slice(0, newTime.length - 3)
        matches[i].startTime = newTime;

    });
    return matches;
};

var editProgressTime = function (matches) {
    matches.forEach(function (match, i) {
        if (match.status === "in progress") {
            var date = new Date(match.datetime);
            var matchTime = date.getTime();
            var current = new Date();
            var currentTime = current.getTime();

            var progress = currentTime - matchTime;
            progress = parseInt(progress/(1000*60));
            matches[i].progressTime = progress;
        }
    });
    return matches;
}

var loadMatches = function(template, matches ){
    var result = "";
matches.forEach(function(match){
    result += template(match);
});
    return result;
};

$(document).ready(function () {
    var source   = $("#result-block").html();
    var template = Handlebars.compile(source);
    $.getJSON('http://worldcup.sfg.io/matches/today', function (matches) {
        matches = matches;
        matches = changeTime( matches);
        matches= editProgressTime(matches);
        console.log(matches);
        $("#main").append(loadMatches(template, matches));

        setInterval(function () {
         matches = editProgressTime(matches);
            console.log(matches);
        }, 1000*60);
    });


});
