import { Heading, Box } from '@chakra-ui/layout'
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Color palette</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box maxWidth="800px" mx="auto" my={8}>
        <Heading>Color Picker</Heading>
        
      </Box>
    </div>
  )
}
