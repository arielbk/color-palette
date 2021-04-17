import { Heading, Box } from "@chakra-ui/layout";
import Head from "next/head";
import { useState } from "react";
import { ColorPanel } from "../components/ColorPanel";

export default function Home() {
  const [color, setColor] = useState("#0000ff");
  return (
    <div>
      <Head>
        <title>Color palette</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box maxWidth="800px" mx="auto" my={8}>
        <Heading mb={8}>Color Picker</Heading>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <ColorPanel color={color} />
      </Box>
    </div>
  );
}
