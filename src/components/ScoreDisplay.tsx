import React from 'react';

export interface ScoreDisplayProps {
  /** 手札の合計スコア */
  score: number;
}

/**
 * ScoreDisplay コンポーネント
 * 与えられたスコアを強調表示します。
 */
const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  return (
    <div className="mt-2 px-3 py-1 bg-yellow-200 text-yellow-800 font-semibold rounded">
      Score: {score}
    </div>
  );
};

export default ScoreDisplay;
