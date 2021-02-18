function getTimeAway (date) {
    const now = new Date();
    const past = new Date(date);
    const gap = now - past;
    const msPerHour = 60 * 1000 * 60;
    const msPerDay = msPerHour * 24;

    if (gap < msPerDay) {
      const count = Math.round(gap / msPerHour);
      return count === 1 ? (count + ' hour ago') : (count + ' hours ago');
    } else {
      const count = Math.round(gap / msPerDay);
      return count === 1 ? (count + ' day ago') : (count + ' days ago');
    }
}

export default getTimeAway