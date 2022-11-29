import { useCallback, useEffect, useMemo, useState } from 'react';

import { defaultMap, getType } from '../../config/defaultMap';
import GridPoint from '../../components/GridPoint';
import { Container } from './Home.styles';
import './index';
import { getPathAndBattles } from '../../utils/utils';
import { KnightInfo } from '../../types';
import Battle from '../../models/Battle';

type GridPoint = {
  x: number;
  y: number;
};

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [pathSolution, setPathSolution] = useState<any>([]);
  const [battlesSolutions, setBattlesSolutions] = useState<Battle[]>();
  const [visitedPoints, setVisitedPoints] = useState<GridPoint[]>([]);
  const [actualIndex, setActualIndex] = useState(0);

  const audio = useMemo(
    () => new Audio('../../../assets/songs/soundtrack.mp3'),
    [],
  );
  const actualPoint = useMemo(
    () => visitedPoints[visitedPoints.length - 1],
    [visitedPoints],
  );

  function isActualPoint(row: number, column: number) {
    return row === actualPoint?.y && column === actualPoint?.x;
  }

  function isVisited(column: number, row: number) {
    return visitedPoints.find(item => item.x === row && item.y === column);
  }

  function isAHouse(row: number, column: number) {
    return battlesSolutions?.find(
      item => item.house.position_x === column && item.house.position_y === row,
    );
  }

  const startAnimation = useCallback(() => {
    audio.play();
    setIsStarted(true);
  }, [audio]);

  useEffect(() => {
    const squadInfo: KnightInfo[] = [
      {
        name: 'seya',
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
        const { row, column } = gridPoint;

        const house = isAHouse(column, row);

        if (house) {
          console.log(house);

          setVisitedPoints(oldState => [
            ...oldState,
            {
              y: row,
              x: column,
            },
          ]);

          setTimeout(() => {
            console.log('esperando...');

            setActualIndex(actualIndex + 1);
          }, 5000);
        } else {
          setVisitedPoints(oldState => [
            ...oldState,
            {
              y: row,
              x: column,
            },
          ]);

          setActualIndex(actualIndex + 1);
        }
      }, 400);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [pathSolution, isStarted, actualIndex]);

  return (
    <Container>
      <div className="grid">
        {defaultMap.map((row, y) => (
          <div key={y + 1} className="row">
            {row.map((column, x) => (
              <GridPoint
                key={x + 1}
                column={x}
                row={y}
                type={getType(column)}
                currentPoint={isActualPoint(y, x)}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="actions">
        <button type="button" onClick={startAnimation}>
          Start Battle
        </button>
      </div>
    </Container>
  );
}
