import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
`;

export const Card = styled.div`
  width: 150px;
  height: 200px;
  border-radius: 10px;
  margin: 5px;

  :hover {
    cursor: pointer;
  }
`;

const List = ({ data }) => {
  console.log(data);
  const router = useRouter();
  const [img, setImg] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    const done = async () => {
      if (Object.entries(data).length !== 0) {
        // const detailedItem = await axios.get(
        //   `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${data.id}.json`
        // );

        data.forEach((item) => {
          const p = item.image.replace("images/", "");
          const picture = `https://raw.githubusercontent.com/jherr/pokemon/main/images/${p}`;

          setImages((images) => [...images, picture]);
        });
      }
    };

    done();
  }, []);

  return (
    <Container>
      {/* {console.log(images)} */}
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
          >
            {images[i] ? (
              <img src={images[i]} alt="img" width={150} height={170} />
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
