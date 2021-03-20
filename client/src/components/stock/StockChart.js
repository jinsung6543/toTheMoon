import React, { useEffect } from 'react';
import { createChart } from 'lightweight-charts';

const StockChart = ({ chartData, width }) => {
  useEffect(() => {
    let dailyPrice = [];

    for (const prop in chartData) {
      dailyPrice.push({
        time: prop,
        value: parseFloat(chartData[prop]['4. close']),
      });
    }

    let node = document.createElement('div');
    node.setAttribute('id', 'chart');
    document.getElementById('chart-container').appendChild(node);

    const chart = createChart(document.getElementById('chart'), {
      width: width,
      height: 400,
      layout: {
        textColor: '#d1d4dc',
        backgroundColor: '#000000',
      },
      rightPriceScale: {
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
      },
      crosshair: {
        vertLine: {
          width: 5,
          color: 'rgba(224, 227, 235, 0.1)',
          style: 0,
        },
        horzLine: {
          visible: false,
          labelVisible: false,
        },
      },
      grid: {
        vertLines: {
          color: 'rgba(42, 46, 57, 0)',
        },
        horzLines: {
          color: 'rgba(42, 46, 57, 0)',
        },
      },
    });

    const areaSeries = chart.addAreaSeries({
      topColor: 'rgba(38, 198, 218, 0.56)',
      bottomColor: 'rgba(38, 198, 218, 0.04)',
      lineColor: 'rgba(38, 198, 218, 1)',
      lineWidth: 1,
      crossHairMarkerVisible: false,
    });

    areaSeries.setData(dailyPrice.reverse());

    return () => {
      document.getElementById('chart').remove();
    };
  }, [chartData, width]);

  return <div id="chart-container"></div>;
};

export default StockChart;
