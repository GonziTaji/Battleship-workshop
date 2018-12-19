export function randomIntFromInterval(min,max) {// min and max included
    return Math.floor(Math.random()*(max-min+1)+min);
}

export function idToString(idx: number, idy: number) {
    return String(idx) + "," + String(idy);
}