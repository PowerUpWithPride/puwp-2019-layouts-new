// Timer control functionality
'use strict';

$(() => {
    if (offlineMode) {
        loadOffline();
    }
    else{
        loadFromSpeedControl();
    }

    function loadOffline() {
        // JQuery selectors.
        let timer = $('#timer');

        timer.html("02:11:21");
    }

    function loadFromSpeedControl() {
        // The bundle name where all the run information is pulled from.
        const speedcontrolBundle = 'nodecg-speedcontrol';

        // Declaring other variables.
        let backupTimerTO;

        // This is where the timer information is received.
        // The "change" event is triggered whenever the time changes or the state changes.
        let timer = nodecg.Replicant('timer', speedcontrolBundle);
        timer.on('change', (newVal, oldVal) => {
            if (!newVal) {
                return;
            }
            updateTimer(newVal, oldVal);

            // Backup Timer
            clearTimeout(backupTimerTO);
            backupTimerTO = setTimeout(backupTimer, 1000);
        });

        // Backup timer that takes over if the connection to the server is lost.
        // Based on the last timestamp that was received.
        // When the connection is restored, the server timer will recover and take over again.
        function backupTimer() {
            backupTimerTO = setTimeout(backupTimer, 200);
            if (timer.value.state === 'running') {
                let missedTime = Date.now() - timer.value.timestamp;
                let timeOffset = timer.value.milliseconds + missedTime;
                updateTimer({time: msToTime(timeOffset), teamFinishTimes: null});
            }
        }

        // Update the run timer when changed.
        function updateTimer(newVal, oldVal) {
            let time = newVal.time || '88:88:88';
            let timer = $('#timer');

            // Change class on the timer to change the colour if needed.
            if (oldVal) {
                timer.removeClass('timer_' + oldVal.state);
            }
            timer.addClass('timer_'+newVal.state);
            timer.html(time);

            // Check for finished times.
            let finishedTimes = newVal.teamFinishTimes;
            if (finishedTimes !== undefined && finishedTimes !== null) {
                updateFinishedTimes(finishedTimes);
            }
        }

        // Set the finished times for runners based on team IDs.
        function updateFinishedTimes(finishedTimes) {
            $('.finish-time').text("").hide();

            // Update finish time in each runner detail block based on team ID.
            $(".runner-details").each((index, detail) => {
                let finishedTime = finishedTimes[$(detail).data('teamID')];
                if (finishedTime) {
                    $(detail).find('.finish-time').html(finishedTime.time).show();
                }
            });
        }
    }
});

