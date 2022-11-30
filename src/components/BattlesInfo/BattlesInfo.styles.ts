import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 85%;

  h2 {
    color: #fff;
  }

  .knights {
    margin-top: 32px;
    display: flex;
  }

  .choosed-knights,
  .golden-knight {
    display: flex;

    img {
      width: 160px;
      height: auto;
    }
  }

  .versus {
    display: flex;
    align-items: center;
    padding: 0 16px;

    img {
      width: 36px;
      height: 36px;
    }
  }
`;
