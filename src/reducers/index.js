import { combineReducers } from 'redux';
import { playerEnums, playerActions } from '../types/playerEnums.js'

const timelineReducer = (timeObject = {apjsTime: 0, playerTime: 0, beacons: [], timeShiftable: true}, action) => {
    switch (action.type) {
        case playerActions.TIME_UPDATE:
            timeObject.apjsTime += action.msIncrement;
            timeObject.playerTime = action.playerTime;
            break;
        case playerActions.ABSOLUTE_TIME_UPDATE:
            timeObject.apjsTime = action.payload;
            timeObject.playerTime = action.payload;
            break;
        case playerActions.SET_BEACON:
            let index = timeObject.beacons.findIndex(beacon => beacon.type === action.payload.type && beacon.timeIndex === action.payload.timeIndex);
            if (index !== -1) {
                timeObject.beacons.splice(index, action.payload);
            } else {
                timeObject.beacons.push(action.payload);
            }
            break;
        case playerActions.CLEAR_BEACONS:
            timeObject.beacons = [];
            break;
        case playerActions.SET_TIME_SHIFTABLE:
            timeObject.timeShiftable = action.payload;
            break;
    }

    return timeObject;
}

const playerStateReducer = (playerState = playerEnums.STOPPED, action) => {
    switch (action.type) {
        case playerActions.STOPPED_STATE:
            playerState = playerEnums.STOPPED;
            break;
        case playerActions.PLAY_STATE:
            playerState = playerEnums.PLAYING;
            break;
        case playerActions.PAUSE_STATE:
            playerState = playerEnums.PAUSED;
            break;
        case playerActions.STALLED_STATE:
            playerState = playerEnums.STALLED;
            break;
        case playerActions.SEEKING_STATE:
            playerState = playerEnums.SEEKING;
            break;
        case playerActions.CLIP_ENDED:
            playerState = playerEnums.ENDED;
            break;
    }
    return playerState
}

const clipListReducer = (assetClipList = {clipList: [], currentClipIndex: 0}, action) => {
    switch (action.type) {
        case playerActions.NEXT_CLIP:
            assetClipList.currentClipIndex++;
            break;
        case playerActions.PREV_CLIP:
            assetClipList.currentClipIndex--;
            break;
        case playerActions.SWITCH_CLIP:
            assetClipList.currentClipIndex = action.clipIndex;
            break;
        case playerActions.CLIPLIST_UPDATE:
            assetClipList = action.assetClipList;
            break;
    }

    return assetClipList;
}

let apJSReducers = combineReducers({
    playerStateReducer,
    clipListReducer
})

export {
    timelineReducer,
    playerStateReducer,
    clipListReducer,
    apJSReducers
}