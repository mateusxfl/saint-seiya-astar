import { useMemo, useState } from 'react';

import { defaultMap, getType } from '../../config/defaultMap';
import GridPoint from '../../components/GridPoint';
import { Container } from './Home.styles';

type GridPoint = {
  x: number;
  y: number;
};

export default function Home() {
  const [visitedPoints, setVisitedPoints] = useState<GridPoint[]>([
    { x: 37, y: 37 },
  ]);

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
    </Container>
  );
}
