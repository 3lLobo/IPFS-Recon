// import IpfsComponent from "../components/Ipfs/ipfs";

import HomeWrapper from '../components/layout'
import { IpfsBox } from '../components/Ipfs/IpfsBox'
import IpfsInput from '../components/Ipfs/IpfsInput'
import IpfsLs from '../components/Ipfs/IpfsLs'

import { useSelector, useDispatch } from 'react-redux'
import useMyToast from '../hooks/useMyToast'
import { BezierSpinner } from '../components/Spinner/BezierSpinner'
import { IpfsCard } from '../components/Ipfs/IpfsCard'
import { Text } from '@chakra-ui/layout'
import { v4 } from 'uuid'
import { Button } from '@chakra-ui/button'
import { DopeAlter } from '../components/Alert/dopeAlert'
import { Montserrat, Montserrat_Alternates, Poppins } from '@next/font/google'
import VtComponent from '../components/Vt/VtComponent'


const montserrat = Montserrat({
  weights: [400, 500, 600, 700],
  preload: false,
})


export default function Home({ buckets }) {
  const store = useSelector((state) => state.ipfsRedux)
  const cortxStore = useSelector((state) => state.cortx)
  const toast = useMyToast()

  return (
    <>
      {cortxStore.selectedBucket && (
        <div className="w-full h-full fixed top-0 left-0 bg-snow opacity-80 z-50">
          <div className="top-1/2 my-0 mx-auto block relative">
            {/* <p className="relative text-aqua text-xs font-bold ml-auto">UPLOADING...</p> */}
            <div className="scale-300 transform-gpu">
              <BezierSpinner />
            </div>
          </div>
        </div>
      )}
      <HomeWrapper>
        <div className={"grid grid-flow-col grid-cols-5 w-full gap-11 " + montserrat.className}>
          <div
            className='py-3 flex flex-col flex-nowrap sm:py-11 text-sm w-full col-span-2 overflow-auto'
          >
            {/* <IpfsBox> */}
            <IpfsInput />
            <IpfsLs />
            {/* </IpfsBox> */}
          </div>
          <div className="col-span-3  w-full flex flex-col justify-center items-center mt-11 overflow-auto">
            <VtComponent />
          </div>

          {/* <S3Box>
            <CortxBuckets />
          </S3Box> */}
        </div>
      </HomeWrapper>
    </>
  )
}

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

// export async function getServerSideProps({ req, res }) {
//   // console.log("🚀 ~ file: index.js ~ line 35 ~ getServerSideProps ~ res", res)
//   // console.log("🚀 ~ file: index.js ~ line 35 ~ getServerSideProps ~ req", req)

//   const s3 = await createS3()
//   // console.log("🚀 ~ file: index.js ~ line 39 ~ getServerSideProps ~ s3", s3)
//   const buckets = await listBucket(s3)
//   console.log("🚀 ~ file: index.js ~ line 40 ~ getServerSideProps ~ buckets", buckets)

//   if (!buckets) {
//     return {
//       notFound: true,
//     }
//   }

//   return { props: { buckets } }
// }
