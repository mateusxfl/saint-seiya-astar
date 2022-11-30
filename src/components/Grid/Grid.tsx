import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { FiPlay, FiPause } from 'react-icons/fi';

import { defaultMap, getType } from '../../config/defaultMap';
import Battle from '../../models/Battle';
import { KnightInfo } from '../../types';
import { getPathAndBattles } from '../../utils/utils';
import Button from '../Button';
import GridPointComponent from '../GridPoint';

import { Container } from './Grid.styles';

interface GridProps {
  setActualBattle(battle: Battle | null): void;
  updateKnightsLifes(battle: Battle): void;
  setTime(time: { hours: number; minutes: number }): void;
}

interface GridPoint {
  x: number;
  y: number;
}

const Grid: React.FC<GridProps> = ({
  setActualBattle,
  setTime,
  updateKnightsLifes,
}) => {
  const [gameSpeed, setGameSpeed] = useState(1);
  const [isStarted, setIsStarted] = useState(false);
  const [actualIndex, setActualIndex] = useState(0);
  const [pathSolution, setPathSolution] = useState<any>([]);
  const [battlesSolutions, setBattlesSolutions] = useState<Battle[]>();
  const [visitedPoints, setVisitedPoints] = useState<GridPoint[]>([]);

  const audio = useMemo(
    () => new Audio('../../../assets/songs/PegasusFantasy.mp3'),
    [],
  );
  const actualPoint = useMemo(
    () => visitedPoints[visitedPoints.length - 1],
    [visitedPoints],
  );

  const buttonText = useMemo(() => {
    if (isStarted) {
      return 'Stop';
    }

    if (!isStarted && actualIndex !== 0) {
      return 'Resume';
    }

    return 'Start';
  }, [isStarted, actualIndex]);

  function isActualPoint(column: number, row: number) {
    return row === actualPoint?.y && column === actualPoint?.x;
  }

  function isABattle(column: number, row: number) {
    return battlesSolutions?.find(
      item => item.house.position_x === column && item.house.position_y === row,
    );
  }

  function handleOnChangeSpeed(value: number) {
    setGameSpeed(value);
  }

  const startAnimation = useCallback(() => {
    // audio.play();
    setIsStarted(true);
  }, [audio]);

  const stopAnimation = useCallback(() => {
    audio.pause();
    setIsStarted(false);
  }, [audio]);

  useEffect(() => {
    const squadInfo: KnightInfo[] = [
      {
        name: 'seiya',
        power: 1.5,
      },
      {
        name: 'shiryu',
        power: 1.4,
      },
      {
        name: 'hyoga',
        power: 1.3,
      },
      {
        name: 'shun',
        power: 1.2,
      },
      {
        name: 'ikki',
        power: 1.1,
      },
    ];

    const housesDiff = [50, 55, 60, 70, 75, 80, 85, 90, 95, 100, 110, 120];

    const isRandomMap = false;

    const { path, battles } = getPathAndBattles(
      squadInfo,
      housesDiff,
      isRandomMap,
    );

    setBattlesSolutions(battles);
    setPathSolution(path);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (pathSolution && isStarted) {
      timeout = setTimeout(() => {
        const gridPoint = pathSolution[actualIndex];
        const {
          row,
          column,
          time: { hours, minutes },
        } = gridPoint;

        setTime({ hours, minutes });
        const battle = isABattle(column, row);

        if (battle) {
          setActualBattle(battle);

          setVisitedPoints(oldState => [
            ...oldState,
            {
              x: column,
              y: row,
            },
          ]);

          updateKnightsLifes(battle);

          setTimeout(() => {
            setActualIndex(actualIndex + 1);
            setActualBattle(null);
          }, 2000);
        } else {
          setVisitedPoints(oldState => [
            ...oldState,
            {
              x: column,
              y: row,
            },
          ]);

          setActualIndex(actualIndex + 1);
        }
      }, 400 / gameSpeed);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [pathSolution, isStarted, actualIndex, gameSpeed]);

  return (
    <Container>
      {defaultMap.map((row, y) => (
        <div key={y + 1} className="row">
          {row.map((column, x) => (
            <GridPointComponent
              key={x + 1}
              column={x}
              row={y}
              type={getType(column)}
              currentPoint={isActualPoint(x, y)}
            />
          ))}
        </div>
      ))}
      <div className="actions">
        <div className="speed-config">
          <Button
            type="button"
            onClick={() => setGameSpeed(1)}
            disabled={gameSpeed === 1}
          >
            1x
          </Button>
          <Button
            type="button"
            onClick={() => setGameSpeed(2)}
            disabled={gameSpeed === 2}
          >
            2x
          </Button>
          <Button
            type="button"
            onClick={() => setGameSpeed(4)}
            disabled={gameSpeed === 4}
          >
            4x
          </Button>
        </div>
        <Button
          type="button"
          onClick={() => (!isStarted ? startAnimation() : stopAnimation())}
        >
          {!isStarted ? <FiPlay /> : <FiPause />}
          {buttonText}
        </Button>
      </div>
    </Container>
  );
};

export default memo(Grid);
