/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  @media only screen and (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  /* display: flex;
  align-content: flex-start;
  justify-content: center;
  flex-wrap: wrap; */
`;

export const Card = styled.div`
  justify-self: center;
  width: min-content;
  height: 260px;
  border-radius: 10px;
  margin: 5px;
  border-radius: 10px;
  overflow: hidden;
  transform: scale(0.9);
  transition-duration: 0.2s;

  :hover {
    cursor: pointer;
    transform: scale(1) rotate(10deg);
    /* transform: scale(1) rotate(${(props) => `${props.rotate}deg`}); */
  }
`;

const List = ({ data }) => {
  const router = useRouter();
  const [images, setImages] = useState([]);

  useEffect(() => {
    const done = async () => {
      if (Object.entries(data).length !== 0) {
        data.forEach((item) => {
          const p = item.image.replace("images/", "");
          const picture = `https://raw.githubusercontent.com/jherr/pokemon/main/images/${p}`;
          setImages((images) => [...images, picture]);
        });
      } else {
        console.log(`NOT SUPOSE TO HAPPEN`);
      }
    };

    done();
  }, [data]);

  const randomRotate = () => {
    return Math.round(Math.random() * 40) - 30;
  };

  return (
    <Container>
      {data.map((item, i) => {
        return (
          <Card
            key={i}
            // rotate={randomRotate()}
            onClick={() => {
              router.push(
                {
                  pathname: "/detailed",
                  query: item,
                },
                "/detailed"
              );
            }}
          >
            {images[i] ? (
              <div>
                <h1>{item.name}</h1>
                <img
                  src={images[i]}
                  alt="img"
                  style={{ borderRadius: "20px" }}
                  width={150}
                  height={170}
                />
              </div>
            ) : (
              <></>
            )}
          </Card>
        );
      })}
    </Container>
  );
};

export default List;
