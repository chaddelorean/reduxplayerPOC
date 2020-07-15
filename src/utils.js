const getWholePlayerTime = function(playerTime) {
    return Math.ceil(playerTime/100) * 100;
}

const convertToMilliseconds = function(time) {
    return time * 1000;
}

const convertToSeconds = function(time) {
    return time / 1000;
}

export {
    getWholePlayerTime,
    convertToMilliseconds,
    convertToSeconds
}