let hrs = document.querySelector('.hours');
let min = document.querySelector('.minutes');
let sec = document.querySelector('.seconds');

// analogue clock elements
let clock = document.querySelector('.clock');
let display = document.querySelector('.display');
let clockBk = document.querySelector('.bk-display');

// digital clock elements
let digitalClock = document.querySelector('.display-digital__clock');
let alarm = document.querySelector('.alarm');
let alarmSwitchButton = document.querySelector('.checker');

// real time -time
let h; //hours
let m; // minutes
let s; // seconds

let time = () => {
    let date = new Date();
    h = date.getHours();
    m = date.getMinutes();

    if (m >= 0 && m <= 9) {
        m = '0' + m;
    }

    s = date.getSeconds();

// analogue clock
    hrs.style.transform = `rotate(${180 + (30 * h)}deg)`;
    min.style.transform = `rotate(${180 + (6 * m)}deg)`;
    sec.style.transform = `rotate(${180 + (6 * s)}deg)`;

// seconds background display
    clockBk.innerHTML = s;

// digital clock 
    digitalClock.innerHTML = `<b>${h}</b> : <b>${m}</b>  <small>${s}sec</small>`;
}

let showOpt = () => display.style.transform = 'translate(-50%)';
let showClock = () => display.style.transform = 'translate(0%)';

clock.addEventListener('mouseover', showOpt);
clock.addEventListener('mouseout', showClock);

window.onload = setInterval(time, 1000);

// alarm clock 

let alarmHrs = document.querySelector('.hrs-col');
let alarmMins = document.querySelector('.min-col');


let hrsCounter = 0;
let minsCounter = 0;

// these 2 create DOM dials

function createHrsDOM() {
    let num = document.createElement('p');
    num.textContent = hrsCounter;
    alarmHrs.appendChild(num);
    
    if (alarmHrs.children.length > 1) {  
        alarmHrs.removeChild(alarmHrs.children[0]);
    }
}

function createMinsDOM() {
    let minnum = document.createElement('p');
    if (minsCounter <10) {
        minnum.textContent = '0' + minsCounter;
    } else {
        minnum.textContent = minsCounter;
    }
    alarmMins.appendChild(minnum);

    if (alarmMins.children.length > 1) {  
        alarmMins.removeChild(alarmMins.children[0]);
    }
}

// they are called so we could have 0:00 alarm shown on load

createHrsDOM();
createMinsDOM();

//these 2 make hours and minutes on mouse btn scroll

alarmHrs.addEventListener('wheel', function(e) {
    if (this.hasFocus) {
        return;
    }
    if (e.deltaY > 0) {
        if (hrsCounter < 1) {
            hrsCounter = 24  
        }
        hrsCounter -= 1;
        createHrsDOM();
    }
    if (e.deltaY < 0) {
        if (hrsCounter == 23) {
            hrsCounter = -1;
        }
        hrsCounter += 1;
        createHrsDOM(); 
    }
});

alarmMins.addEventListener('wheel', function(e) {
    if (this.hasFocus) {
        return;
    }
    if (e.deltaY > 0) {
        if (minsCounter < 1) {
            minsCounter = 60
        }
        minsCounter -= 1;
        createMinsDOM();  
    }
    if (e.deltaY < 0) {
        if (minsCounter == 59) {
            minsCounter = -1;
        }
        minsCounter += 1;
        createMinsDOM(); 
    }
});

//alarm on/off

let alarmTextOrder2 = document.querySelector('.set-alarm-text2');
let alarmTextOrder1 = document.querySelector('.set-alarm-text1');
let timeTillDisplay = document.querySelector('.time-till-alarm');
let timeTillAlarmHrs = document.querySelector('.time-till-display__hrs');
let timeTillAlarmMins = document.querySelector('.time-till-display__mins');



function tillAlarm() {
    let hrsTill = hrsCounter - h;
    let minsTill = minsCounter - m;

    // hours untill alarm goes off
    if (hrsTill < 0) {
        hrsTill = 24 - ( - hrsTill);     
    } 
    
    //minutes before alarm goes off
    if (minsTill < 0) {
        minsTill = 60 - (m - minsCounter);
        
        // takes care of hours if minutes are off of whole hour
        if (hrsTill == 0) {
            hrsTill = 23;
        } else {
            hrsTill -= 1;
        }     
    } 

    // these two will show time untill alarm goes off on DOM
    timeTillAlarmHrs.textContent = hrsTill;
    timeTillAlarmMins.textContent = minsTill;
}

function alarmOnOff() {
    if(alarmSwitchButton.checked && s == 0) {
        if ( h == hrsCounter && m == minsCounter) {
            window.alert('alaaarrmmm!!!!');
        }
    }
}

// text shows is the alarm set or you have to set the time yet

function textPlay() {
    timeTillDisplay.classList.toggle('visible');
    if (alarmSwitchButton.checked) {
        alarmTextOrder1.style.transform = 'translateX(200%)';
        alarmTextOrder2.style.transform = 'translateX(-70%)';
    } else {
        alarmTextOrder1.style.transform = 'translateX(0%)';
        alarmTextOrder2.style.transform = 'translateX(0%)';
    }
}

alarmSwitchButton.addEventListener('change', textPlay);

window.onload = setInterval(tillAlarm, 1000);
window.onload = setInterval(alarmOnOff, 1000);
