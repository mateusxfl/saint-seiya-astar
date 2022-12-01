import { useCallback, useMemo, useState } from 'react';

import { KnightInfo } from '../../types';
import Battle from '../../models/Battle';

import { Container } from './Home.styles';
import BattlesInfo from '../../components/BattlesInfo';
import KnightsLifes from '../../components/KnightsLifes';
import Grid from '../../components/Grid';

type Time = {
  hours: number;
  minutes: number;
};

const DEFAULT_TEAM: Omit<KnightInfo, 'power'>[] = [
  {
    name: 'seiya',
    life: 5,
  },
  {
    name: 'shiryu',
    life: 5,
  },
  {
    name: 'hyoga',
    life: 5,
  },
  {
    name: 'shun',
    life: 5,
  },
  {
    name: 'ikki',
    life: 5,
  },
];

export default function Home() {
  const [knightsTeam, setKnightsTeam] =
    useState<Omit<KnightInfo, 'power'>[]>(DEFAULT_TEAM);
  const [time, setTime] = useState<Time>({ hours: 0, minutes: 0 });
  const [actualBattle, setActualBattle] = useState<Battle | null>(null);

  const formattedTime = useMemo(() => {
    const parsedHours = String(time.hours).padStart(2, '0');
    const parsedMinutes = String(time.minutes).padStart(2, '0');

    return `${parsedHours}:${parsedMinutes}`;
  }, [time]);

  const updateKnightsLifes = useCallback((battle: Battle) => {
    const team = battle.getKnightsTeam().map(item => item.name) as string[];

    setKnightsTeam(oldState => {
      return oldState.map(item =>
        team.includes(item.name)
          ? {
              ...item,
              life: (item.life || 0) - 1,
            }
          : item,
      );
    });
  }, []);

  const restoreKnights = useCallback(() => setKnightsTeam(DEFAULT_TEAM), []);

  return (
    <Container>
      <Grid
        setActualBattle={setActualBattle}
        updateKnightsLifes={updateKnightsLifes}
        restoreKnights={restoreKnights}
        setTime={setTime}
      />
      <div className="game-info">
        <div className="time">
          <span>
            Time: <b>{formattedTime}</b>
          </span>
        </div>
        <BattlesInfo battle={actualBattle} />
        <KnightsLifes knightsTeam={knightsTeam} />
      </div>
    </Container>
  );
}
