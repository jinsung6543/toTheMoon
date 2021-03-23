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
  const numToFormat = parseFloat(num);
  if (Math.abs(numToFormat) - 0 < 0.005) {
    return '$0.00';
  }

  if (numToFormat > 0) {
    return (
      '$' +
      Math.abs(numToFormat)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    );
  } else {
    return (
      '-$' +
      Math.abs(numToFormat)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    );
  }
};
