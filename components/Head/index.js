import { default as HeadContainer } from 'next/head'

const Head = () => {
  return (
    <div>
      <HeadContainer>
        <title>IPFS Recon - by 3llobo</title>
        <meta name="description" content="IPFS Recón for IPFS files." />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </HeadContainer>
    </div>
  )
}

export default Head
