"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CardProps, Suit, Value } from '../components/Card';

// カード生成とシャッフル
const suits: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
const values: Value[] = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

function createDeck(): CardProps[] {
  const deck: CardProps[] = [];
  suits.forEach(suit => {
    values.forEach(value => {
      deck.push({ suit, value, faceDown: false });
    });
  });
  return deck;
}

function shuffleDeck(deck: CardProps[]): CardProps[] {
  const arr = [...deck];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// スコア計算
function calculateScore(cards: CardProps[]): number {
  let sum = 0;
  let aces = 0;
  cards.forEach(({ value }) => {
    if (value === 'A') {
      aces += 1;
      sum += 1;
    } else if (['J','Q','K'].includes(value)) {
      sum += 10;
    } else {
      sum += parseInt(value, 10);
    }
  });
  // Ace を 11 としてカウントできる分だけ加算
  for (let i = 0; i < aces; i++) {
    if (sum + 10 <= 21) sum += 10;
  }
  return sum;
}

// ゲームステージ
type Stage = 'betting' | 'playing' | 'result';

interface GameContextState {
  playerCards: CardProps[];
  dealerCards: CardProps[];
  balance: number;
  bet: number;
  stage: Stage;
  playerScore: number;
  dealerScore: number;
  onBet: (amount: number) => void;
  onHit: () => void;
  onStand: () => void;
  onDouble: () => void;
  onReset: () => void;
}

const GameContext = createContext<GameContextState | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [deck, setDeck] = useState<CardProps[]>(() => shuffleDeck(createDeck()));
  const [playerCards, setPlayerCards] = useState<CardProps[]>([]);
  const [dealerCards, setDealerCards] = useState<CardProps[]>([]);
  const [balance, setBalance] = useState<number>(1000);
  const [bet, setBet] = useState<number>(0);
  const [stage, setStage] = useState<Stage>('betting');

  const playerScore = calculateScore(playerCards);
  const dealerScore = calculateScore(dealerCards);

  const dealInitial = (amt: number) => {
    const d = shuffleDeck(deck);
    const player = [d[0], d[2]];
    const dealer = [d[1], d[3]];
    setDeck(d.slice(4));
    setPlayerCards(player);
    setDealerCards(dealer);
    setBalance(prev => prev - amt);
    setBet(amt);
    setStage('playing');
  };

  const onBet = (amount: number) => {
    if (stage !== 'betting' || amount <= 0 || amount > balance) return;
    dealInitial(amount);
  };

  const dealerTurn = (currentDeck: CardProps[]) => {
    let d = [...currentDeck];
    let dealer = [...dealerCards];
    while (calculateScore(dealer) < 17) {
      dealer.push(d[0]);
      d = d.slice(1);
    }
    setDealerCards(dealer);
    setDeck(d);
    // 結果判定
    const p = calculateScore(playerCards);
    const dc = calculateScore(dealer);
    let payout = 0;
    if (p > 21) payout = 0;
    else if (dc > 21 || p > dc) payout = bet * 2;
    else if (p === dc) payout = bet;
    // balance 更新
    setBalance(prev => prev + payout);
    setStage('result');
  };

  const onHit = () => {
    if (stage !== 'playing') return;
    const [next, ...rest] = deck;
    setPlayerCards(prev => [...prev, next]);
    setDeck(rest);
    // バーストまたは 21 の場合、ディーラーターン
    const p = calculateScore([...playerCards, next]);
    if (p >= 21) dealerTurn(rest);
  };

  const onStand = () => {
    if (stage !== 'playing') return;
    dealerTurn(deck);
  };

  const onDouble = () => {
    if (stage !== 'playing' || balance < bet) return;
    setBalance(prev => prev - bet);
    setBet(prev => prev * 2);
    const [next, ...rest] = deck;
    setPlayerCards(prev => [...prev, next]);
    setDeck(rest);
    dealerTurn(rest);
  };

  const onReset = () => {
    setDeck(shuffleDeck(createDeck()));
    setPlayerCards([]);
    setDealerCards([]);
    setBet(0);
    setStage('betting');
  };

  return (
    <GameContext.Provider
      value={{
        playerCards,
        dealerCards,
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export function useGame(): GameContextState {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within a GameProvider');
  return ctx;
}
