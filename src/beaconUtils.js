import { beaconTypes } from './types/playerEnums.js'
import beacons from './types/beacons.js';
import { timelineStore } from './store/index.js';
import { setBeacon, setTimeShiftable } from './actions/index.js';
import { convertToMilliseconds } from './utils.js';

const AD_TIME_MILLISECONDS = 15000;

let BeaconUtils = function() {

    let handleBeaconTimeline = function() {
        let currentAPJSTimeMS = timelineStore.getState().apjsTime;
        let beacons = timelineStore.getState().beacons;
        let pendingBeacons = beacons.filter(beacon => !beacon.isFired);
        if (pendingBeacons && Array.isArray(pendingBeacons) && pendingBeacons.length > 0) {
            if (pendingBeacons[0].timeIndex <= currentAPJSTimeMS) {
                pendingBeacons[0].isFired = true;
                timelineStore.dispatch(setBeacon(pendingBeacons[0]));
                timelineStore.dispatch(setTimeShiftable(false));
                console.log("Beacon event fired: ", pendingBeacons[0]);
            }
        }
    
        let isTimeShiftable = timelineStore.getState().timeShiftable;
        let lastFiredBeacon = beacons.filter(beacon => beacon.isFired);
        if (lastFiredBeacon && Array.isArray(lastFiredBeacon) && lastFiredBeacon.length > 0 && !isTimeShiftable) {
            if (lastFiredBeacon[lastFiredBeacon.length - 1].timeIndex + AD_TIME_MILLISECONDS <= currentAPJSTimeMS) {
                timelineStore.dispatch(setTimeShiftable(true));
            }
        }
    }

    let watchBeaconTimeline = function() {
        timelineStore.subscribe(handleBeaconTimeline)
    }

    let processBeacons = function(assetDuration) {
        beacons.map(beaconType => {
            let timeIndex = 0;
            switch (beaconType) {
                case beaconTypes.DEFAULT_IMPRESSION:
                    timeIndex = 0;
                    break;
                case beaconTypes.FIRST_QUARTILE:
                    timeIndex = assetDuration * .25;
                    break;
                case beaconTypes.MIDWAY: 
                    timeIndex = assetDuration / 2;
                    break;
                case beaconTypes.THIRD_QUARTILE:
                    timeIndex = assetDuration * .75;
                    break;
                case beaconTypes.COMPLETE:
                    timeIndex = assetDuration;
                    break;
            }
    
            let beacon = {
                type: beaconType,
                timeIndex: convertToMilliseconds(timeIndex),
                isFired: false
            }
            timelineStore.dispatch(setBeacon(beacon));
        });
    }

    return {
        processBeacons,
        watchBeaconTimeline
    }
}();

export default BeaconUtils;