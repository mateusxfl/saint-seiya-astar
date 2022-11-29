import React, { memo, useMemo } from 'react';
import { Container } from './GridPoint.styles';

export interface GridPointProps {
  row: number;
  column: number;
  currentPoint: boolean;
  type: string;
}

const GridPoint: React.FC<GridPointProps> = ({
  column,
  row,
  currentPoint,
  type,
}) => {
  const finalType = useMemo(
    () => (currentPoint ? `currentPoint-${type}` : type),
    [currentPoint, type],
  );

  return (
    <Container
      row={row}
      column={column}
      currentPoint={currentPoint}
      type={finalType}
    />
  );
};

export default memo(GridPoint);
