import { timeUpdate, playState, pauseState, stalledState, stoppedState, seekingState, nextClip } from './actions/index.js';
import { timelineStore, apjsStore } from './store/index.js';
import { playerEnums } from './types/playerEnums.js';
import ClipList from './types/clipList.js';

const intervalTime = 100;
let sampleVideoPlayer;
let timelineInterval;

$(function() {
    sampleVideoPlayer = document.getElementById("sampleVideoPlayer");
    sampleVideoPlayer.onplay = () => {
        apjsStore.dispatch(playState());
        initTimer();
    };
    sampleVideoPlayer.onpause = () => {
    apjsStore.dispatch(pauseState());
        clearInterval(timelineInterval);
    }
    sampleVideoPlayer.onstalled = () => {
        apjsStore.dispatch(stalledState());
    }
    sampleVideoPlayer.onseeking = () => {
        apjsStore.dispatch(seekingState());
    }
    sampleVideoPlayer.onsuspend = () => {
    //    apjsStore.dispatch(stoppedState());
    }
    sampleVideoPlayer.onended = () => {
        apjsStore.dispatch(nextClip());
        loadVideoSrc(sampleVideoPlayer);
    }

    loadVideoSrc(sampleVideoPlayer);
    timelineStore.subscribe(onTimeUpdate);
});

function loadVideoSrc(sampleVideoPlayer) {
    // let currentClipIndex = apjsStore.getState().assetClipList.currentClipIndex || 0;
    let currentClipIndex = 0;
    let sourceElement = document.createElement("source");
    sourceElement.type = "video/mp4";
    sourceElement.src = ClipList[currentClipIndex].url;
    sampleVideoPlayer.appendChild(sourceElement);
}

function initTimer() {
    timelineInterval = window.setInterval(() => {
        let prevPlayerTime = timelineStore.getState().playerTime; 
        let currentPlayerTime = sampleVideoPlayer.currentTime;
        let currentPlayerState = apjsStore.getState().playerState;
        if (prevPlayerTime === currentPlayerTime && currentPlayerState !== playerEnums.STALLED) {
            console.error("Stall detected");
            apjsStore.dispatch(stalledState());
        }
        timelineStore.dispatch(timeUpdate(intervalTime, currentPlayerTime));
    }, intervalTime);
}

function onTimeUpdate() {
    let currentAPJSTimeMS = timelineStore.getState().apjsTime;
    let currentAPJSTimeSeconds = currentAPJSTimeMS / 1000;
    let currentPlayerTime = timelineStore.getState().playerTime;

    if (currentAPJSTimeMS % 1000 === 0) {
        console.log(`1 second interval happened! APJSTime: ${currentAPJSTimeMS} ms PlayerTime: ${currentPlayerTime} sec`);
    }

    if (currentAPJSTimeSeconds % 30 === 0) {
        console.log(`30 second interval happened! APJSTime: ${currentAPJSTimeSeconds} sec PlayerTime: ${currentPlayerTime} sec`);
    }

    if (currentAPJSTimeSeconds % 60 === 0) {
        console.log(`1 minute interval happened! APJSTime: ${currentAPJSTimeSeconds} sec PlayerTime: ${currentPlayerTime} sec`);
    }

    if (currentAPJSTimeSeconds % 300 === 0) {
        console.log(`5 minute interval happened! APJSTime: ${currentAPJSTimeSeconds} sec PlayerTime: ${currentPlayerTime} sec`);
    }
}