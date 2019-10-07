// Currency formatter for $USD for bid totals and donation amounts.
const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
});

// Converts milliseconds to a time string.
function msToTime(duration, noHour) {
    let seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    let timeString = '';

    if (!noHour)
        timeString += hours+':';
    timeString += minutes + ':' + seconds;

    return timeString;
}

// Fix pronoun wrapping on certain layouts.
// Put a thin space after each slash if the layout needs wrapping.
const layoutsToWrapPronouns = [
    '16_9-2p',
    '4_3-1p',
    '4_3-2p',
    '4_3-3p',
    '4_3-4p',
    'gb-1p',
    'gba-1p',
    'ds-1p',
    'ff4r',
    'z1r',
    'z3r',
];

function fixPronounWrapping(layoutInfo) {
    if (layoutsToWrapPronouns.includes(layoutInfo.code)) {
        let pronounElements = $('.pronouns');
        pronounElements.each((i, elem) => {
            // Use .html() so it doesn't get doubly escaped.
            $(elem).html($(elem).text().replace(/([-/_])/g,'$&&hairsp;'));
        });
    }
}

function getProgressBarColor(current, max){
    let progress;
    if (max) {
        progress = current / max;
    } else {
        progress = 0;
    }
    let color = '#b52911';

    if(progress > 0.6)
    {
        color = '#03b000';
    }
    else if(progress > 0.3)
    {
        color = '#da7500';
    }

    return color;
}

// Get team info from run data.
function getRunnersFromRunData(runData) {
    let currentTeamsData = [];
    runData.teams.forEach(team => {
        let teamData = {players: []};
        team.players.forEach(player => {teamData.players.push(createPlayerData(player));});
        currentTeamsData.push(teamData);
    });
    return currentTeamsData;
}

// Easy access to create member data object used above.
function createPlayerData(player) {
    // Gets username from URL.
    let twitchUsername = '';
    if (player.social && player.social.twitch) {
        twitchUsername = player.social.twitch;
    }

    // Parse pronouns from the runner name, if they're present.
    let name = player.name.split('-');
    let pronouns = '';
    if (name.length > 1) {
        pronouns = name[1].trim();
    }
    name = name[0].trim();

    return {
        name: name,
        pronouns: pronouns,
        twitch: twitchUsername,
        region: player.region
    };
}
