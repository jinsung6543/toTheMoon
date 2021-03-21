import React, { useEffect } from 'react';
import { createChart, isBusinessDay } from 'lightweight-charts';

const StockChart = ({ chartData, width, symbol }) => {
  useEffect(() => {
    let dailyPrice = [];
    let height = width * 0.6;

    for (const prop in chartData) {
      dailyPrice.push({
        time: prop,
        value: parseFloat(chartData[prop]['4. close']),
      });
    }

    let node = document.createElement('div');
    node.setAttribute('id', 'chart');
    document.getElementById('chart-container').appendChild(node);
    const chartDOM = document.getElementById('chart');

    const chart = createChart(chartDOM, {
      width: width,
      height: height,
      leftPriceScale: {
        scaleMargins: {
          top: 0.2,
          bottom: 0.2,
        },
        visible: true,
        borderVisible: false,
      },
      rightPriceScale: {
        visible: false,
      },
      timeScale: {
        borderVisible: false,
      },
      crosshair: {
        horzLine: {
          visible: false,
          labelVisible: false,
        },
        vertLine: {
          visible: true,
          style: 0,
          width: 2,
          color: 'rgba(32, 38, 46, 0.1)',
          labelVisible: false,
        },
      },
      layout: {
        backgroundColor: '#2B2B43',
        lineColor: '#2B2B43',
        textColor: '#D9D9D9',
      },
      watermark: {
        color: 'rgba(0, 0, 0, 0)',
      },
      grid: {
        vertLines: {
          color: '#2B2B43',
        },
        horzLines: {
          color: '#363C4E',
        },
      },
    });

    const areaSeries = chart.addAreaSeries({
      topColor: 'rgba(32, 226, 47, 0.56)',
      bottomColor: 'rgba(32, 226, 47, 0.04)',
      lineColor: 'rgba(32, 226, 47, 1)',
    });

    areaSeries.setData(dailyPrice.reverse());

    function businessDayToString(businessDay) {
      return new Date(
        Date.UTC(
          businessDay.year,
          businessDay.month - 1,
          businessDay.day,
          0,
          0,
          0
        )
      ).toLocaleDateString();
    }

    let toolTipWidth = 100;
    let toolTipMargin = 15;
    let priceScaleWidth = 50;

    let toolTip = document.createElement('div');
    toolTip.className = 'floating-tooltip-2';
    chartDOM.appendChild(toolTip);

    // update tooltip
    chart.subscribeCrosshairMove((param) => {
      if (
        !param.time ||
        param.point.x < 0 ||
        param.point.y < 0 ||
        param.point.y > height
      ) {
        toolTip.style.display = 'none';
        return;
      }

      let dateStr = isBusinessDay(param.time)
        ? businessDayToString(param.time)
        : new Date(param.time * 1000).toLocaleDateString();

      toolTip.style.display = 'block';
      let price = param.seriesPrices.get(areaSeries);
      toolTip.innerHTML =
        `<div style="color: rgba(32, 226, 47, 1)">⬤ ${symbol}</div>` +
        '<div style="font-size: 24px; margin: 4px 0px; color: #fff">' +
        `$${(Math.round(price * 100) / 100).toFixed(2)}` +
        '</div>' +
        '<div style="color: #fff">' +
        dateStr +
        '</div>';

      let left = param.point.x;

      if (left > width - toolTipWidth - toolTipMargin) {
        left = width - toolTipWidth;
      } else if (left < toolTipWidth / 2) {
        left = priceScaleWidth;
      }

      toolTip.style.left = left + 'px';
      toolTip.style.height = height + 'px';
    });

    return () => {
      document.getElementById('chart') &&
        document.getElementById('chart').remove();
    };
  }, [chartData, width, symbol]);

  return <div id="chart-container"></div>;
};

export default StockChart;
