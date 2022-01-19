import React from "react";
import styled, { css } from "styled-components";

const Image = (props) => {
  const { shape, src, size } = props;

  const styles = {
    src,
    size,
  };

  if (shape === "square") {
    return (
      <Outer>
        <ImageSquare {...styles}></ImageSquare>
      </Outer>
    );
  }

  return <ImageRectangle {...styles}></ImageRectangle>;
};

Image.defaultProps = {
  shape: "rectangle",
  src: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  size: "50px",
};

const SeedStyle = css`
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const Outer = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border: 1px solid #dddddd;
  overflow: hidden;
`;

const ImageRectangle = styled.div`
  ${SeedStyle};
  top: 0;
  left: 0;
  padding-top: 75%;
  border-radius: 5px;
`;

const ImageSquare = styled.div`
  ${SeedStyle};
  width: ${(props) => props.size};
  padding-top: ${(props) => props.size};
`;

export default Image;
