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

export {
    playerEnums,
    playerActions
}