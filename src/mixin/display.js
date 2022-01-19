import { css } from "styled-components";

const onlyMobile = css`
  display: initial;
  ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;

const hiddenMobile = css`
  display: none;

  ${({ theme }) => theme.device.tablet} {
    display: block;
  }
`;

const onlyDesktop = css`
  display: none;
  ${({ theme }) => theme.device.desktop} {
    display: initial;
  }
`;

const hiddenDesktop = css`
  ${({ theme }) => theme.device.desktop} {
    display: none;
  }
`;

export { onlyMobile, hiddenMobile, onlyDesktop, hiddenDesktop };
