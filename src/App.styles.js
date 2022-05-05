import styled from "styled-components";

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 800px;
  height: 800px;
  margin: 0 auto;
  overflow: auto;
`;

export const Loading = styled.div`
  width: 200px;
  margin: 20px auto;
  text-align: center;
`;
