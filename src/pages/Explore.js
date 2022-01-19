import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { container } from "../mixin/container";
import { history } from "../redux/configStore";
import Card from "../components/Card";
import styled from "styled-components";
import Slider from "../components/Slider";
import FilterHeader from "../components/FilterHeader";
import TagModal from "../components/TagModal";
import LoginModal from "../components/modal/LoginModal";
import { getJobgroupsDB, getAllOpeningsDB } from "../redux/modules/opening";
import CareerModal from "../components/CareerModal";

const Explore = (props) => {
  const dispatch = useDispatch();
  const openingList = useSelector((state) => state.opening.openings) || [];
  const myLikeList = useSelector((state) => state.user.user.likeIdList) || [];

  useEffect(() => {
    dispatch(getJobgroupsDB());
    dispatch(getAllOpeningsDB());
  }, []);

  const moveDetailPage = (openingId) => history.push(`/opening/${openingId}`);

  return (
    <>
      <Container>
        {/* <FilterHeader /> */}
        <Slider/>
        <CardContainer>
          {openingList.map((l, idx) => {
            const likeIdx = myLikeList.findIndex(
              (item) => item === l.openingId
            );
            return (
              <Card
                key={idx}
                {...l}
                isLike={likeIdx === -1 ? false : true}
                _onClick={() => moveDetailPage(l.openingId)}
              />
            );
          })}
        </CardContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  ${container};
`;

const CardContainer = styled.div`
  ${container};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;

  ${({ theme }) => theme.device.desktop} {
    grid-template-columns: repeat(4, 1fr);
  } ;
`;

export default Explore;
