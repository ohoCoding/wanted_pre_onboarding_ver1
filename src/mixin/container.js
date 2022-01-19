import { css } from "styled-components";

export const container = css`
  padding: 0 20px;

  ${({ theme }) => theme.device.tablet} {
    padding: 0 0px;
  }

  ${({ theme }) => theme.device.desktop} {
    max-width: 1120px;
    margin: 0 auto;
  }
`;
