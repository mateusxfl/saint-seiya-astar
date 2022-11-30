import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;

  .actions {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 10px;
    padding: 0 66px;
    width: 100%;

    .speed-config {
      display: flex;
      margin-right: 16px;
    }
  }

  .row {
    display: flex;
  }
`;
