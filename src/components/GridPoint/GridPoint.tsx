import React, { memo, useMemo } from 'react';
import { Container } from './GridPoint.styles';

export interface GridPointProps {
  row: number;
  column: number;
  currentPoint: boolean;
  isVisited: boolean;
  type: string;
}

const GridPoint: React.FC<GridPointProps> = ({
  column,
  row,
  currentPoint,
  isVisited,
  type,
}) => {
  const finalType = useMemo(() => {
    if (currentPoint) {
      return `currentPoint-${type}`;
    }

    if (isVisited) {
      return `visited-${type}`;
    }

    return type;
  }, [currentPoint, isVisited, type]);

  return (
    <Container
      row={row}
      column={column}
      currentPoint={currentPoint}
      isVisited={isVisited}
      type={finalType}
    />
  );
};

export default memo(GridPoint);
