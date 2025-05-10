import React from 'react';
import Card, { CardProps } from './Card';

export interface HandProps {
  /** 配られたカードの配列 */
  cards: CardProps[];
}

/**
 * Hand コンポーネント
 * 手札として複数のカードを横並びで表示します。
 */
const Hand: React.FC<HandProps> = ({ cards }) => {
  return (
    <div className="flex space-x-2">
      {cards.map((card, index) => (
        <Card
          key={index}
          suit={card.suit}
          value={card.value}
          faceDown={card.faceDown}
        />
      ))}
    </div>
  );
};

export default Hand;
