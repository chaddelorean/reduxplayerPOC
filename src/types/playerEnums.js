const playerEnums = {
    PLAYING: "PLAYING",
    STOPPED: "STOPPED",
    PAUSED: "PAUSED",
    SEEKING: "SEEKING",
    STALLED: "STALLED",
    ENDED: "ENDED"
}

const playerActions = {
    TIME_UPDATE: "TIME_UPDATE",
    ABSOLUTE_TIME_UPDATE: "ABSOLUTE_TIME_UPDATE",
    SET_BEACON: "SET_BEACON",
    CLEAR_BEACONS: "CLEAR_BEACONS",
    PLAY_STATE: "PLAY_STATE",
    PAUSE_STATE: "PAUSE_STATE",
    STALLED_STATE: "STALLED_STATE",
    SEEKING_STATE: "SEEKING_STATE",
    STOPPED_STATE: "STOPPED_STATE",
    NEXT_CLIP: "NEXT_CLIP",
    PREV_CLIP: "PREV_CLIP",
    SWITCH_CLIP: "SWITCH_CLIP",
    CLIPLIST_UPDATE: "CLIPLIST_UPDATE",
    CLIP_ENDED: "CLIP_ENDED"
}

const beaconTypes = {
    DEFAULT_IMPRESSION: "defaultImpression",
    FIRST_QUARTILE: "firstQuartile",
    MIDWAY: "midway",
    THIRD_QUARTILE: "thirdQuartile",
    COMPLETE: "complete"
}

export {
    playerEnums,
    playerActions,
    beaconTypes
}