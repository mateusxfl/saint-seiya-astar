import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;

  .knight-item {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 40px;
      height: auto;
    }

    .lifes {
      margin-top: 4px;
      display: flex;

      img {
        width: 20px;
      }
    }
  }

  .knight-item + .knight-item {
    margin-left: 10px;
  }

  .knight-item.dead {
    .lifes img {
      filter: brightness(0.5);
    }
  }
`;
