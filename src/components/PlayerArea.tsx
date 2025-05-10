import React from 'react';
import Hand from './Hand';
import { CardProps } from './Card';
import ScoreDisplay from './ScoreDisplay';
import BalanceDisplay from './BalanceDisplay';
import BettingControls from './BettingControls';
import ActionButtons from './ActionButtons';

export interface PlayerAreaProps {
  /** プレイヤーに配られたカード */
  cards: CardProps[];
  /** 現在の手札のスコア */
  score: number;
  /** プレイヤーの所持金 */
  balance: number;
  /** 現在のベット額 */
  bet: number;
  /** ゲームフェーズ: ベット/プレイ/結果 */
  stage: 'betting' | 'playing' | 'result';
  /** ベット操作 */
  onBet: (amount: number) => void;
  /** ヒット */
  onHit: () => void;
  /** スタンド */
  onStand: () => void;
  /** ダブル */
  onDouble: () => void;
  /** スプリット */
  onSplit?: () => void;
  /** 次ラウンド開始 */
  onReset: () => void;
}

/**
 * PlayerArea コンポーネント
 * プレイヤーの手札、スコア、ベット操作、アクションボタンなどをまとめて表示します。
 */
const PlayerArea: React.FC<PlayerAreaProps> = ({
  cards,
  score,
  balance,
  bet,
  stage,
  onBet,
  onHit,
  onStand,
  onDouble,
  onSplit,
  onReset,
}) => {
  return (
    <div className="flex flex-col items-center p-4 bg-green-600 rounded-lg space-y-3">
      <h2 className="text-white text-xl font-semibold">Player</h2>
      {/* 所持金表示 */}
      <BalanceDisplay balance={balance} />

      {/* 手札表示 */}
      <Hand cards={cards} />

      {/* スコア表示 */}
      <ScoreDisplay score={score} />

      {/* ベットフェーズ */}
      {stage === 'betting' && (
        <BettingControls balance={balance} bet={bet} onBet={onBet} />
      )}

      {/* プレイフェーズ */}
      {stage === 'playing' && (
        <ActionButtons
          onHit={onHit}
          onStand={onStand}
          onDouble={onDouble}
          onSplit={onSplit}
        />
      )}

      {/* 結果フェーズ */}
      {stage === 'result' && (
        <button
          onClick={onReset}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Next Round
        </button>
      )}
    </div>
  );
};

export default PlayerArea;
