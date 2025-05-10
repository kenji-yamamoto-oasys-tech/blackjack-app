import React from 'react';
import Hand from './Hand';
import { CardProps } from './Card';

export interface DealerAreaProps {
  /** ディーラーに配られたカード */
  cards: CardProps[];
  /** 最初のカードを裏向きにするかどうか（デフォルト: true） */
  hideHoleCard?: boolean;
  /** スコア表示用（裏向き時は非表示推奨） */
  score?: number;
}

/**
 * DealerArea コンポーネント
 * ディーラーの手札とスコアを表示します。
 */
const DealerArea: React.FC<DealerAreaProps> = ({ cards, hideHoleCard = true, score }) => {
  // 表示用のカード配列: 最初のカードを裏向きに
  const displayCards = cards.map((card, idx) =>
    idx === 0 && hideHoleCard ? { ...card, faceDown: true } : card
  );

  return (
    <div className="flex flex-col items-center p-4 bg-green-800 rounded-lg">
      <h2 className="text-white text-xl font-semibold mb-2">Dealer</h2>
      <Hand cards={displayCards} />
      {/* スコアは hole card を見せた場合のみ表示 */}
      {!hideHoleCard && typeof score === 'number' && (
        <span className="mt-2 text-white">Score: {score}</span>
      )}
    </div>
  );
};

export default DealerArea;
