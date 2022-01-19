import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import Slide from "../elements/Slide";
import { flex, hiddenMobile, container } from "../mixin";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import items from "./../img/items";


const Container = styled.div`
  height: 141px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  `;
 

const Box = styled.div`
  ${flex};
  margin: 0 auto;
  width: 68vw;
  justify-content: space-between;
  
`;

const CenterBox = styled.div`
  ${container};
  ${flex};
  
`;

const Prev = styled(BsChevronLeft)`
  display: flex;
`;

const Next = styled(BsChevronRight)`
    display: flex;
`;

const PrevButton = styled.button`
   left: calc((100% - 1200px) / 2);
   display: flex;
   align-items: center;
   justify-content: center;
   position: absolute;
   top: 180px;
   width: 30px;
   height: 60px;
   border-radius: 15px;
   background-color: #fff;
   font-size: 16px;
 
  border: 2px solid pink;
  ${hiddenMobile};
`;

const NextButton = styled.button`
  right: calc((100% - 1200px) / 2);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 180px;
  width: 30px;
  height: 60px;
  border-radius: 15px;
  background-color: #fff;
  font-size: 16px;
 
  border: 2px solid pink;
  ${hiddenMobile};
`;

const SliderContainer = styled.div`
  display: flex; //버튼들을 가로로 나열합니다.
  width: 100%;
  border: 1px solid blue;
  gap: 20px;
  @media screen and (max-width: 767px) {
    overflow-x : auto;
  }
`;

const TOTAL_SLIDES = items.length-1;

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

    const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) { // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
      setCurrentSlide(0);
    } 
    else if(currentSlide < TOTAL_SLIDES) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } 
    if (currentSlide !== 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
    console.log(currentSlide);
  }, [currentSlide]);

  const slides = items.map((item,index) => {
    return(
      <Slide img={item.src} key={index}/>
    );
  });

  return (
    <Container>
      <Box>
        <PrevButton onClick={prevSlide}>
            <Prev />
        </PrevButton>
        <CenterBox>
        <SliderContainer ref={slideRef}>
        {slides} 
         </SliderContainer>
        </CenterBox>
        <NextButton onClick={nextSlide}>
             <Next/>
        </NextButton>
      </Box>
      
    </Container>
  );
}