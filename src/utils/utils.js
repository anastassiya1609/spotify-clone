  export function convertMsToTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    return `${minutes} : ${sec >= 10 ? sec : "0" + sec}`;
  }
 