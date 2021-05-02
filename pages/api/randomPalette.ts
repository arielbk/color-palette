// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async (req, res) => {
  const response = await axios.get(
    "http://www.colourlovers.com/api/palettes/random?format=json"
  );
  res.status(200).json(response.data[0]);
};
