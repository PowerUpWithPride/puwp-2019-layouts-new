// Current music functionality.
'use strict';

// Refresh currently playing info every 5 seconds.
const refreshInterval = 5 * 1000;
const URL = 'https://music.powerupwithpride.org:42069/status-json.xsl';

function updateMusic() {
    $.getJSON(URL, function( data ) {
        $('#current-artist').text(data.icestats.source.artist);
        $('#current-song').text(data.icestats.source.title);
    });
}

updateMusic();
setInterval(updateMusic, refreshInterval);
