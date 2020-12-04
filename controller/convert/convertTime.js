const convertTime = (time) => {
    const strToReplace = time.slice(-5);
    return time.replace(strToReplace, "00");
};
exports.convertTime = convertTime;
