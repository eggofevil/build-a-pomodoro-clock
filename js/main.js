var slider = document.getElementById('slider');
var infoScr = document.getElementById('infoScr');
var remainingTimeScr = document.getElementById('remainingTimeScr');
var start_pauseBtn = document.getElementById('startBtn');
var resetBtn = document.getElementById('resetBtn');
var sessionLenBtns = Array.prototype.slice.call(document.getElementsByClassName('sessionLenBtn'));
var breakLenBtns = Array.prototype.slice.call(document.getElementsByClassName('breakLenBtn'));
var longBreakLenBtns = Array.prototype.slice.call(document.getElementsByClassName('longBreakLenBtn'));
var breakLen = document.getElementById('breakLen');
var sessionLen = document.getElementById('sessionLen');
var longBreakLen = document.getElementById('longBreakLen');

var sliderWidth = 0;
var sessionTime;
var sessionTimeDeg;
var sessionCounter = 0;
var breakTime;
var breakTimeDeg;
var longBreakTime;
var longBreakDeg;
var session = true;
var deg;
var remainingTime;
var hours;
var minutes;
var seconds;
var startState;
var reset;

sessionLenBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        if (btn.textContent === '-') {
            if (parseInt(sessionLen.textContent) <= 1) return null;
            sessionLen.textContent = parseInt(sessionLen.textContent) - 1;
        } else {
            sessionLen.textContent = parseInt(sessionLen.textContent) + 1;
        }
    });
});

breakLenBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        if (btn.textContent === '-') {
            if (parseInt(breakLen.textContent) <= 1) return null;
            breakLen.textContent = parseInt(breakLen.textContent) - 1;
        } else {
            breakLen.textContent = parseInt(breakLen.textContent) + 1;
        }
    });
});

longBreakLenBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        if (btn.textContent === '-') {
            if (parseInt(longBreakLen.textContent) <= 1) return null;
            longBreakLen.textContent = parseInt(longBreakLen.textContent) - 1;
        } else {
            longBreakLen.textContent = parseInt(longBreakLen.textContent) + 1;
        }
    });
});

start_pauseBtn.addEventListener('click', function () {
    if (startState) {
        infoScr.textContent += ' paused';
        startState = false;
        return null;
    }
    if (startState === undefined) {
        sessionLenBtns.forEach(function (btn) {
            btn.setAttribute('disabled', true);
        });
        breakLenBtns.forEach(function (btn) {
            btn.setAttribute('disabled', true);
        });
        longBreakLenBtns.forEach(function (btn) {
            btn.setAttribute('disabled', true);
        });
        sessionTime = parseInt(sessionLen.textContent) * 60;
        sessionTimeDeg = 100 / sessionTime;
        breakTime = parseInt(breakLen.textContent) * 60;
        breakTimeDeg = 100 / breakTime;
        longBreakTime =  parseInt(longBreakLen.textContent) * 60;
        longBreakDeg = 100 / longBreakTime;
        startState = true;
    }
    if (!startState) {
        infoScr.textContent = infoScr.textContent.substr(0, infoScr.textContent.length - 6);
        startState = true;
        return null;
    }
    reset = false;
    runTimer();
});

resetBtn.addEventListener('click', function () {
    slider.textContent = '';
    sliderWidth = 0;
    slider.style.width = '0%';
    sessionLen.textContent = '25';
    breakLen.textContent = '5';
    longBreakLen.textContent = '15';
    infoScr.textContent = '';
    remainingTimeScr.textContent = '';
    session = true;
    sessionCounter = 0;
    startState = undefined;
    reset = true;
    sessionLenBtns.forEach(function (btn) {
        btn.removeAttribute('disabled');
    });
    breakLenBtns.forEach(function (btn) {
        btn.removeAttribute('disabled');
    });
    longBreakLenBtns.forEach(function (btn) {
        btn.removeAttribute('disabled');
    });
});

function showRemainingTime() {
    hours = parseInt(remainingTime / 3600);
    minutes = parseInt(remainingTime / 60);
    seconds = remainingTime % 60;
    remainingTimeScr.textContent = (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' +  (seconds < 10 ? '0' : '') + seconds;
    remainingTime -= 1;
}

function sliderGrowth() {
    if (reset) {
        reset = false;
        return null;
    }
    if (startState) {
        if (sliderWidth >= 100) {
            sliderWidth = 0;
            runTimer();
            return null;
        }
        sliderWidth += deg;
        showRemainingTime();
        slider.style.width = sliderWidth + '%';
    }
    setTimeout(sliderGrowth, 1000);
}

function runTimer() {
    slider.style.width = '0%';
    if (session) {
        deg = sessionTimeDeg;
        slider.style.background = 'red';
        remainingTime = sessionTime;
        sessionCounter += 1;
        infoScr.textContent = 'Work session № ' + sessionCounter;
        session = false;
    } else {
        if (sessionCounter === 4) {
            deg = longBreakDeg;
            slider.style.background = 'green';
            remainingTime = longBreakTime;
            infoScr.textContent = 'Long break';
            sessionCounter = 0;
        } else {
            deg = breakTimeDeg;
            slider.style.background = 'blue';
            remainingTime = breakTime;
            infoScr.textContent = 'Short break';
        }
        session = true;
    }
    sliderGrowth();
}