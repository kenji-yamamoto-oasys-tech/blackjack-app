import React from 'react';

export interface ActionButtonsProps {
  /** ヒット */
  onHit: () => void;
  /** スタンド */
  onStand: () => void;
  /** ダブル */
  onDouble: () => void;
  /** スプリット（オプション） */
  onSplit?: () => void;
}

/**
 * ActionButtons コンポーネント
 * ヒット／スタンド／ダブル／スプリットの操作ボタンを表示します。
 */
const ActionButtons: React.FC<ActionButtonsProps> = ({ onHit, onStand, onDouble, onSplit }) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={onHit}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Hit
      </button>
      <button
        onClick={onStand}
        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
      >
        Stand
      </button>
      <button
        onClick={onDouble}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Double
      </button>
      {onSplit && (
        <button
          onClick={onSplit}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          Split
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
