import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
`;

export const Card = styled.div`
  width: 150px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  margin: 5px;

  :hover {
    cursor: pointer;
    background-color: rgba(240, 240, 240);
  }
`;

const List = ({ data }) => {
  console.log(data);
  const router = useRouter();

  return (
    <Container>
      {data.map((item, i) => {
        return (
          <Card
            key={i}
            onClick={() => {
              router.push(
                {
                  pathname: "/detailed",
                  query: item,
                },
                "/detailed"
              );
            }}
          ></Card>
        );
      })}
    </Container>
  );
};

export default List;
