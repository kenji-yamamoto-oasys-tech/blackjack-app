import React from 'react';

export interface GameMessageProps {
  playerScore: number;
  dealerScore: number;
}

/**
 * GameMessage コンポーネント
 * ゲーム結果に応じたメッセージを表示します。
 */
const GameMessage: React.FC<GameMessageProps> = ({ playerScore, dealerScore }) => {
  let message: string;
  let bgColor: string;

  if (playerScore > 21) {
    message = 'You Busted!';
    bgColor = 'bg-red-500';
  } else if (dealerScore > 21) {
    message = 'Dealer Busted! You Win!';
    bgColor = 'bg-green-500';
  } else if (playerScore > dealerScore) {
    message = 'You Win!';
    bgColor = 'bg-green-500';
  } else if (playerScore < dealerScore) {
    message = 'You Lose!';
    bgColor = 'bg-red-500';
  } else {
    message = 'Push';
    bgColor = 'bg-gray-500';
  }

  return (
    <div className={`${bgColor} text-white text-center py-2 px-4 rounded font-bold`}>  
      {message}
    </div>
  );
};

export default GameMessage;
