let targetCount = 0;
let targets = 0;
let time;
let clicks = 0;

let difSlider = document.getElementById('dif-slider');

let isgameOpen = false;
document.addEventListener('mousedown', () => {
    if (isgameOpen) clicks++;
});
function generateTarget(size, gd, timeDisplay) {
    let target = ce('div');
    cla(target, 'target');
    target.style.width = `${size}px`;
    target.style.height = `${size}px`;
    target.style.backgroundColor = selectedColor;

    let randomx = Math.round(Math.random() * gd.offsetWidth);
    let randomy = Math.round(Math.random() * gd.offsetHeight);

    target.style.position = 'absolute';
    target.style.left = `${randomx}px`;
    target.style.top = `${randomy}px`;

    ac(gd, target);

    targets += 1;
    target.addEventListener('mousedown', () => {
        target.remove();
        targetCount += 1;
        timeDisplay.innerText = `${time}\t${targetCount}`;
    });
}
function startGame() {
    isgameOpen = true;

    go.style.border = 'none';
    settingsDiv.remove();

    let countdownNum = 3;
    time = selectedTime;

    let gameDiv = ce('div');
    gameDiv.id = 'game';
    ac(document.body, gameDiv);
    let countdown = ce('div');
    countdown.id = 'countdown';
    countdown.innerText = '3';
    ac(gameDiv, countdown);
    let timeDisplay = ce('div');
    timeDisplay.innerText = `${time}\t0`;
    timeDisplay.id = 'timed';
    ac(document.body, timeDisplay);
    countdown.classList.add('t');
    timeDisplay.classList.add('t');

    let size = 60;
    switch (selectedSize) {
        case 'big':
            size = 100;
            break;
        case 'small':
            size = 30;
            break;
    }
    function count() {
        setTimeout(() => {
            countdownNum -= 1;
            countdown.innerText = countdownNum;
            if (countdownNum == 0) countdown.remove();
            else count();
        }, 1000);
    }
    function gen() {
        setTimeout(() => {
            if (countdownNum == 0) generateTarget(size, gameDiv, timeDisplay);
            gen();
        }, dD(difSlider.value));
    }
    function passTime() {
        setTimeout(() => {
            if (countdownNum == 0) time -= 1;
            timeDisplay.innerText = `${time}\t${targetCount}`;
            if (time == 0) showResults(gameDiv);
            if (time) passTime();
        }, 1000);
    }
    passTime();
    count();
    gen();
}
function showResults(gameDiv) {
    isgameOpen = false;
    document.body.innerHTML = '';
    let resultsE = ce('div');
    resultsE.id = 'result';
    resultsE.innerHTML = `
    <div class="bigt">SETTINGS</div>
    <div class="bigt category">Difficulty: ${difSlider.value}</div>
    <div class="bigt category">Time: ${selectedTime} seconds</div>
    <div class="bigt">RESULTS</div>
    <div class="bigt category">Targets Per Second: ${(
        targetCount / selectedTime
    ).toFixed(2)}</div>
    <div class="bigt category">Clicks: ${clicks}</div>
    <div class="bigt category">Targets Hit: ${targetCount}</div>
    <div class="bigt category">Click Accuracy: ${Math.round(
        (targetCount / clicks) * 100
    )}%</div>
    <div class="bigt category">Misses: ${clicks - targetCount}</div>
    <img
        src="forward.jpeg"
        id="go"
        onmouseover="this.style.border = '0.2vw solid red';"
        onmouseout="this.style.border = '';"
        onclick="regenHub(document.getElementById('result'));"
    ></img>
    `;
    clicks = 0;
    targetCount = 0;
    targets = 0;
    ac(document.body, resultsE);
}
function regenHub(resultsE) {
    ac(document.body, settingsDiv);
    resultsE.remove();
}
