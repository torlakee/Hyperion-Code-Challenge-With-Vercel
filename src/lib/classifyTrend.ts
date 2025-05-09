export function classifyTrend(data: any): 'trending' | 'ranging' {
  const { rsi, macd, bbands, sma, ema, atr, stoch } = data;

  const overbought = rsi?.value > 70;
  const oversold = rsi?.value < 30;
  const macdCross = Math.abs(macd?.valueMACD - macd?.valueSignal) > 1;
  const bbWidth = bbands?.upperBand - bbands?.lowerBand;
  const bbVolatility = bbWidth > bbands?.middleBand * 0.1;

  const smaVsPrice = data?.price ? data.price > sma?.value : false;
  const emaTrend = ema?.value && sma?.value ? ema.value > sma.value : false;

  const highVolatility = atr?.value > 1;
  const stochOverbought = stoch?.valueK > 80;
  const stochOversold = stoch?.valueK < 20;

  const trendingScore =
    Number(overbought || oversold) +
    Number(macdCross) +
    Number(bbVolatility) +
    Number(emaTrend) +
    Number(highVolatility) +
    Number(stochOverbought || stochOversold);

  return trendingScore >= 4 ? 'trending' : 'ranging';
}
