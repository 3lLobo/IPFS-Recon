import { default as HeadContainer } from 'next/head'

const Head = () => {
  return (
    <div>
      <HeadContainer>
        <title>IPFS Yarascanner - by 3llobo</title>
        <meta name="description" content="Yara scanner for IPFS files." />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </HeadContainer>
    </div>
  )
}

export default Head
