'use client';
import React from 'react';
import { useGame } from '../context/GameContext';
import DealerArea from '../components/DealerArea';
import PlayerArea from '../components/PlayerArea';
import GameMessage from '../components/GameMessage';

export default function Page() {
  const {
    dealerCards,
    playerCards,
    balance,
    bet,
    stage,
    playerScore,
    dealerScore,
    onBet,
    onHit,
    onStand,
    onDouble,
    onReset,
  } = useGame();

  return (
    <div className="min-h-screen bg-green-900 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <DealerArea cards={dealerCards} hideHoleCard={stage === 'playing'} score={dealerScore} />
        <PlayerArea
          cards={playerCards}
          score={playerScore}
          balance={balance}
          bet={bet}
          stage={stage}
          onBet={onBet}
          onHit={onHit}
          onStand={onStand}
          onDouble={onDouble}
          onReset={onReset}
        />
        {stage === 'result' && (
          <GameMessage playerScore={playerScore} dealerScore={dealerScore} />
        )}
      </div>
    </div>
  );
}
