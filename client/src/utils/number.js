export const formatLargeDollar = (num) => {
  if (num > 1000000000000) {
    return (num / 10000000000).toFixed(2) + 'T';
  }

  if (num > 1000000000) {
    return (num / 1000000000).toFixed(2) + 'B';
  }

  if (num > 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  }
};

export const formatDollar = (num) => {
  if (num <= 0.004) {
    return '$' + Math.abs(num).toFixed(2).toLocaleString(2);
  } else {
    return '-$' + Math.abs(num).toFixed(2).toLocaleString(2);
  }
};
