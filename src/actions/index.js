import { playerActions } from '../types/playerEnums';

const timeUpdate = (msIncrement, playerTime) => ({
    type: playerActions.TIME_UPDATE,
    msIncrement,
    playerTime
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

const updateClipList = (clipList, currentClipIndex) => ({
    type: playerActions.CLIPLIST_UPDATE,
    assetClipList: {
        clipList,
        currentClipIndex
    }
});

export {
    timeUpdate,
    playState,
    pauseState,
    stalledState,
    stoppedState,
    seekingState,
    nextClip,
    prevClip,
    switchClip,
    updateClipList
}