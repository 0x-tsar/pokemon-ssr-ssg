import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Detailed = () => {
  const router = useRouter();

  useEffect(() => {
    const done = async () => {
      const data = router.query;
      console.log(data);

      const detailedItem = await axios.get(
        `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${data.id}.json`
      );

      const imageItem = await axios.get(
        `https://raw.githubusercontent.com/jherr/pokemon/main/images/${data.name.toLowerCase()}.jpg`
      );
    };

    done();
  }, []);

  return (
    <div>
      <Link href="/">
        <a>Go Back</a>
      </Link>
    </div>
  );
};

export default Detailed;
