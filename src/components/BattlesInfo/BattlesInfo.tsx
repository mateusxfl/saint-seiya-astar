import React, { memo } from 'react';
import Battle from '../../models/Battle';

import { Container } from './BattlesInfo.styles';

interface BattlesInfoProps {
  battle: Battle | null;
}

const BattlesInfo: React.FC<BattlesInfoProps> = ({ battle }) => {
  return (
    <Container>
      {battle && (
        <>
          <h2>Battle of {battle.house.title}</h2>
          <div className="knights">
            <div className="choosed-knights">
              {battle?.getKnightsTeam()?.map(knight => (
                <img
                  key={knight.id}
                  src={`../../../assets/characters/knights/bronze/${knight.image}`}
                  alt="Knight Image"
                />
              ))}
            </div>
            <div className="versus">
              <img src="../../../assets/utils/versus.png" alt="Knight Image" />
            </div>
            <div className="golden-knight">
              <img
                src={`../../../assets/characters/knights/golden/${battle.house.title.toLowerCase()}.png`}
                alt="Knight Image"
              />
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default memo(BattlesInfo);
