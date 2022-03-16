import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export async function getStaticPaths() {
  const { data } = await axios.get(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );

  return {
    paths: data.map((pokemon) => ({
      params: {
        id: String(pokemon.id),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await axios.get(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
  );

  return {
    props: {
      pokemon: data,
    },
  };
}

const Pokemon = ({ pokemon }) => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [stats, setStats] = useState([]);

  useEffect(() => {
    console.log(pokemon);

    setName(pokemon.name);

    pokemon.stats.map((stat) => {
      setStats((stats) => [...stats, stat]);
    });

    setImage(
      `https://raw.githubusercontent.com/jherr/pokemon/main/images/${pokemon.image.replace(
        "images/",
        ""
      )}`
    );
  }, []);

  return (
    <div>
      <Link href={"/"}>
        <h3 style={{ margin: "10px", cursor: "pointer" }}>Go Back</h3>
      </Link>
      <h1>{name}</h1>
      <img src={image} alt={`${image}`} width={200} />
    </div>
  );
};

export default Pokemon;
