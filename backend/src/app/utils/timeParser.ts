/**
 * Simple ms converter to handle common time strings like '15m', '1d', '30d'
 */
export const parseTimeToMs = (time: string): number => {
  const value = parseInt(time.slice(0, -1));
  const unit = time.slice(-1).toLowerCase();

  switch (unit) {
    case 's':
      return value * 1000;
    case 'm':
      return value * 60 * 1000;
    case 'h':
      return value * 60 * 60 * 1000;
    case 'd':
      return value * 24 * 60 * 60 * 1000;
    default:
      return 0;
  }
};
