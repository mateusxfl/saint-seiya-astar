import styled from 'styled-components';
import { GridPointProps } from './GridPoint';

export const Container = styled.div<GridPointProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh / 42);
  width: calc(100vh / 42);
  border: 1px solid #333;

  &[type='montain'] {
    background-image: url('../../assets/grid/standard/mountain.gif');
  }

  &[type='plan'] {
    background-image: url('../../assets/grid/standard/plan.gif');
  }

  &[type='rock'] {
    background-image: url('../../assets/grid/standard/rocky.gif');
  }

  &[type='begin'] {
    background-image: url('../../assets/grid/standard/sand.gif');
  }

  &[type='final'] {
    background-image: url('../../assets/grid/standard/final.gif');
  }

  &[type='house'] {
    background-image: url('../../assets/grid/standard/house.gif');
    background-size: cover;
  }

  &[type^='currentPoint'] {
    background-size: 34px;
    background-position: center;
  }

  &[type='currentPoint-begin'] {
    background-image: url('../../assets/grid/current/sand.gif');
  }

  &[type='currentPoint-montain'] {
    background-image: url('../../assets/grid/current/mountain.gif');
  }

  &[type='currentPoint-plan'] {
    background-image: url('../../assets/grid/current/plan.gif');
  }

  &[type='currentPoint-rock'] {
    background-image: url('../../assets/grid/current/rocky.gif');
  }

  &[type='currentPoint-house'] {
    background-image: url('../../assets/grid/current/house.gif');
  }

  &[type='currentPoint-house'] {
    background-image: url('../../assets/grid/current/house.gif');
  }

  &[type='visited-begin'] {
    background-size: cover;
    background-image: url('../../assets/grid/visited/sand.gif');
  }

  &[type='visited-montain'] {
    background-size: cover;
    background-image: url('../../assets/grid/visited/mountain.gif');
  }

  &[type='visited-plan'] {
    background-size: cover;
    background-image: url('../../assets/grid/visited/plan.gif');
  }

  &[type='visited-rock'] {
    background-size: cover;
    background-image: url('../../assets/grid/visited/rocky.gif');
  }

  &[type='visited-house'] {
    background-size: cover;
    background-image: url('../../assets/grid/visited/house.gif');
  }

  &[type='visited-house'] {
    background-size: cover;
    background-image: url('../../assets/grid/visited/house.gif');
  }
`;
