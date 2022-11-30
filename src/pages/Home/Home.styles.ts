import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  .game-info {
    display: flex;
    flex-direction: column;

    flex: 1;
    padding: 20px;
    background-image: url('../../../assets/utils/background.jpg');

    .time {
      span {
        font-size: 22px;
        color: #fff;

        b {
          font-size: 26px;
        }
      }
    }
  }
`;
