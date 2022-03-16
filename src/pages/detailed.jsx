/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Detailed = () => {
  const router = useRouter();
  const [img, setImg] = useState("");
  const [stats, setStats] = useState([]);
  const [type, setType] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const done = async () => {
      const data = router.query;

      if (Object.entries(data).length !== 0) {
        const detailedItem = await axios.get(
          `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${data.id}.json`
        );

        setName(detailedItem.data.name);

        detailedItem.data.stats.map((stat) => {
          setStats((stats) => [...stats, stat]);
        });

        const pokemonPicture = detailedItem.data.image.replace("images/", "");

        setImg(
          `https://raw.githubusercontent.com/jherr/pokemon/main/images/${detailedItem.data.image.replace(
            "images/",
            ""
          )}`
        );
      }
    };

    done();
  }, []);

  return (
    <div>
      <Link href="/">
        <a>
          <h1>Go Back</h1>
        </a>
      </Link>
      <div style={{ justifySelf: "center", textAlign: "center" }}>
        <h1>{name}</h1>
      </div>
      <br />
      {img ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={img} alt="img" width={150} height={170} />
          <div style={{ margin: "10px", fontSize: "20px" }}>
            {stats.map((stat, key) => {
              return (
                <div key={key}>
                  {stat.name}:{stat.value}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Detailed;
