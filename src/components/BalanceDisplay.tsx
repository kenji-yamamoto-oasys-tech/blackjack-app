import React from 'react';

export interface BalanceDisplayProps {
  /** プレイヤーの所持金 */
  balance: number;
}

/**
 * BalanceDisplay コンポーネント
 * 所持金を強調表示します。
 */
const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ balance }) => {
  return (
    <div className="mt-2 px-3 py-1 bg-indigo-200 text-indigo-800 font-semibold rounded">
      Balance: ${balance}
    </div>
  );
};

export default BalanceDisplay;
