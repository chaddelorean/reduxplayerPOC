import { combineReducers } from 'redux';
import { playerEnums, playerActions } from '../types/playerEnums.js'

const timelineReducer = (timeObject = {apjsTime: 0, playerTime: 0}, action) => {
    switch (action.type) {
        case playerActions.TIME_UPDATE:
            timeObject.apjsTime += action.msIncrement;
            timeObject.playerTime = action.playerTime;
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