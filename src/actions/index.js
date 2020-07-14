import { playerActions } from '../types/playerEnums';

const timeUpdate = (msIncrement, playerTime) => ({
    type: playerActions.TIME_UPDATE,
    msIncrement,
    playerTime
});

const setAbosluteTimeline = (newTime) => ({
    type: playerActions.ABSOLUTE_TIME_UPDATE,
    payLoad: newTime
});

const setBeacon = (beacon) => ({
    type: playerActions.SET_BEACON,
    payLoad: beacon
});

const clearBeacons = () => ({
    type: playerActions.CLEAR_BEACONS
});

const playState = () => ({
    type: playerActions.PLAY_STATE
});

const pauseState = () => ({
    type: playerActions.PAUSE_STATE
});

const stalledState = () => ({
    type: playerActions.STALLED_STATE
});

const stoppedState = () => ({
    type: playerActions.STOPPED_STATE
});

const seekingState = () => ({
    type: playerActions.SEEKING_STATE
});

const nextClip = () => ({
    type: playerActions.NEXT_CLIP
});

const prevClip = () => ({
    type: playerActions.PREV_CLIP
});

const switchClip = (clipIndex) => ({
    type: playerActions.SWITCH_CLIP,
    clipIndex
});

const clipEnded = () => ({
    type: playerActions.CLIP_ENDED
})

const updateClipList = (clipList, currentClipIndex) => ({
    type: playerActions.CLIPLIST_UPDATE,
    assetClipList: {
        clipList,
        currentClipIndex
    }
});

export {
    timeUpdate,
    setAbosluteTimeline,
    setBeacon,
    clearBeacons,
    playState,
    pauseState,
    stalledState,
    stoppedState,
    seekingState,
    nextClip,
    prevClip,
    switchClip,
    updateClipList,
    clipEnded
}