let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateStopwatch, 10);
    }
}

function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
        elapsedTime = Date.now() - startTime;
        clearInterval(timer);
    }
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(timer);
    startTime = null;
    elapsedTime = 0;
    document.getElementById('minutes').innerText = '00';
    document.getElementById('seconds').innerText = '00';
    document.getElementById('milliseconds').innerText = '00';
    document.getElementById('lapsList').innerHTML = '';
}

function lapStopwatch() {
    if (isRunning) {
        const lapTime = formatTime(Date.now() - startTime);
        const li = document.createElement('li');
        li.innerText = lapTime;
        document.getElementById('lapsList').appendChild(li);
    }
}

function updateStopwatch() {
    const now = Date.now();
    const difference = now - startTime;
    elapsedTime = difference;
    const time = formatTime(difference);

    document.getElementById('minutes').innerText = time.minutes;
    document.getElementById('seconds').innerText = time.seconds;
    document.getElementById('milliseconds').innerText = time.milliseconds;
}

function formatTime(ms) {
    const milliseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
    const seconds = Math.floor((ms / 1000) % 60).toString().padStart(2, '0');
    const minutes = Math.floor((ms / (1000 * 60)) % 60).toString().padStart(2, '0');
    return { minutes, seconds, milliseconds };
}
