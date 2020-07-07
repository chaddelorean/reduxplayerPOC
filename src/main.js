import { timeUpdate, playState, pauseState, stalledState, stoppedState, seekingState, nextClip, updateClipList, clipEnded } from './actions/index.js';
import { timelineStore, apjsStore } from './store/index.js';
import { playerEnums } from './types/playerEnums.js';
import ClipList from './types/clipList.js';

const intervalTime = 100;
const STALLED_THRESHOLD = 10000;
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
    sampleVideoPlayer.onended = () => {
        apjsStore.dispatch(clipEnded());
        let apjsStoreState = apjsStore.getState();
        if (apjsStoreState) {
            let currentClipIndex = apjsStoreState.clipListReducer.currentClipIndex || 0;
            let clipListFromStore = apjsStoreState.clipListReducer.clipList;
            if (currentClipIndex + 1 < clipListFromStore.length) {
                apjsStore.dispatch(nextClip());
                loadVideoSrc(sampleVideoPlayer);
            }
        }
    }

    apjsStore.dispatch(updateClipList(ClipList, 0));
    loadVideoSrc(sampleVideoPlayer);
    timelineStore.subscribe(onTimeUpdate);
});

function loadVideoSrc(sampleVideoPlayer) {
    let apjsStoreState = apjsStore.getState();
    if (apjsStoreState.clipListReducer) {
        let currentClipIndex = apjsStoreState.clipListReducer.currentClipIndex || 0;
        let clipListFromStore = apjsStoreState.clipListReducer.clipList;
        let sourceElement = document.createElement("source");
        sourceElement.type = "video/mp4";
        sourceElement.src = clipListFromStore[currentClipIndex].url;
        sampleVideoPlayer.innerHTML = "";
        sampleVideoPlayer.appendChild(sourceElement);
        if (currentClipIndex > 0) {
            sampleVideoPlayer.load();
            sampleVideoPlayer.play();
        }
    }
}

function initTimer() {
    timelineInterval = window.setInterval(() => {
        let prevPlayerTime = timelineStore.getState().playerTime; 
        let currentPlayerTime = sampleVideoPlayer.currentTime;
        let currentPlayerState = apjsStore.getState().playerState;
        if ((currentPlayerTime - prevPlayerTime) > STALLED_THRESHOLD && currentPlayerState !== playerEnums.STALLED) {
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