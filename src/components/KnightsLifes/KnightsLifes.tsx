import React, { memo } from 'react';
import { KnightInfo } from '../../types';

import { Container } from './KnightsLifes.styles';

interface KnightsLifesProps {
  knightsTeam: Omit<KnightInfo, 'power'>[];
}

const KnightsLifes: React.FC<KnightsLifesProps> = ({ knightsTeam }) => {
  function getKnightImage(knight: Omit<KnightInfo, 'power'>) {
    const path = (knight.life || 0) > 0 ? knight.name : `dead/${knight.name}`;

    return `../../../assets/characters/knights/bronze/${path}.png`;
  }

  return (
    <Container>
      {knightsTeam?.map(knight => (
        <div
          key={knight.name}
          className={`knight-item ${knight.life === 0 ? 'dead' : ''}`}
        >
          <img
            src={getKnightImage(knight)}
            alt="Knight Image"
            title={knight.name}
          />
          <div className="lifes">
            {Array.from({ length: 5 }).map((_, i) => (
              <img
                key={i}
                src={`../../../assets/utils/${
                  i + 1 > (knight.life || 0) ? 'empty_heart' : 'heart'
                }.png`}
                alt="Knight Image"
              />
            ))}
          </div>
        </div>
      ))}
    </Container>
  );
};

export default memo(
  KnightsLifes,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.knightsTeam) ===
    JSON.stringify(nextProps.knightsTeam),
);
