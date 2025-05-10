import React from 'react';

export interface BettingControlsProps {
  /** プレイヤーの所持金 */
  balance: number;
  /** 現在のベット額 */
  bet: number;
  /** ベット操作: 新しいベット額を設定 */
  onBet: (amount: number) => void;
}

const chipValues = [1, 5, 10, 25, 50] as const;

/**
 * BettingControls コンポーネント
 * チップをクリックしてベット額を調整します。
 */
const BettingControls: React.FC<BettingControlsProps> = ({ balance, bet, onBet }) => {
  const addChip = (value: number) => {
    const newBet = bet + value;
    if (newBet <= balance) {
      onBet(newBet);
    }
  };

  const clearBet = () => {
    onBet(0);
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex space-x-2">
        {chipValues.map((value) => (
          <button
            key={value}
            onClick={() => addChip(value)}
            disabled={bet + value > balance}
            className={`px-3 py-1 rounded-full border font-semibold ${
              bet + value > balance
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-yellow-400 text-black hover:bg-yellow-500'
            }`}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <span className="font-semibold">Current Bet: ${bet}</span>
        <button
          onClick={clearBet}
          disabled={bet === 0}
          className={`px-2 py-1 rounded border ${
            bet === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-red-400 text-white hover:bg-red-500'
          }`}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default BettingControls;
