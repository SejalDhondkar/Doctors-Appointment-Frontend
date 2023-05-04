import React from 'react';
import { useLocation } from 'react-router-dom';
import PositiveResult from './PositiveResult';
import NegativeResult from './NegativeResult';

function MentalResult() {
    const location = useLocation();
    console.log('location', location);
    var v1 = parseFloat(location.state.values.affect);
    var v2 = parseFloat(location.state.values.emo);
    var v3 = parseFloat(location.state.values.feel);
    var v4 = parseFloat(location.state.values.lastGood);
    var v5 = parseFloat(location.state.values.lastHappy);
    var v6 = parseFloat(location.state.values.mentalHealthRating);
    var v7 = parseFloat(location.state.values.outlook);
    var v8 = parseFloat(location.state.values.probWithSleep);
    var v9 = parseFloat(location.state.values.probWithWork);
    var v10 = parseFloat(location.state.values.feelPositive);
    var weight_avg = (10 * v10 + 9 * v6 + 8 * v5 + 7 * v4 + 6 * v8 + 5 * v9 + 4 * v1 + 3 * v2 + 2 * v3 + 1 * v7) / (10 + 9 + 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1);
    if (weight_avg > 55) {
    return <PositiveResult result={weight_avg} />;
  }
  return <NegativeResult result={weight_avg} />;
}
export default MentalResult;
