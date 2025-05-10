import React from 'react';

export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Value = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface CardProps {
  suit: Suit;
  value: Value;
  /** 表向きか裏向きか */
  faceDown?: boolean;
}

// マークと色のマッピング
const suitSymbols: Record<Suit, string> = {
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
  spades: '♠',
};
const suitColors: Record<Suit, string> = {
  hearts: 'text-red-500',
  diamonds: 'text-red-500',
  clubs: 'text-black',
  spades: 'text-black',
};

const Card: React.FC<CardProps> = ({ suit, value, faceDown = false }) => {
  if (faceDown) {
    // 裏向きのカード
    return (
      <div className="w-16 h-24 bg-blue-500 rounded-lg flex items-center justify-center">
        <span className="text-white text-2xl">🂠</span>
      </div>
    );
  }

  return (
    <div className={`w-16 h-24 bg-white rounded-lg border flex flex-col justify-between p-1 ${suitColors[suit]}`}>
      {/* 左上 */}
      <span className="text-sm font-bold">{value}</span>
      {/* 中央マーク */}
      <span className="text-xl self-center">{suitSymbols[suit]}</span>
      {/* 右下（逆さ） */}
      <span className="text-sm font-bold self-end transform rotate-180">{value}</span>
    </div>
  );
};

export default Card;
