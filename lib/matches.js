const self = module.exports = {
  finalized: (match) => {
    return match.cancelled || self.finished(match);
  },
  finished: (match) => {
    return match.endTime && !match.cancelled;
  },
  live: (match) => {
    return match.startTime && !match.endTime && !match.cancelled;
  },
  pending: (match) => {
    return match.startTime && !match.cancelled;
  }
};
