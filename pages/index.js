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
  const toast = useMyToast()

  return (
    <>
      <HomeWrapper>
        <div className={"grid sm:grid-flow-col sm:grid-cols-5 w-full gap-3 xl:max-w-[120rem] xl:mx-auto " + montserrat.className}>
          <div
            className='py-3 flex flex-col flex-nowrap sm:py-11 text-sm sm:col-span-2 overflow-auto'
          >
            <IpfsInput />
            <IpfsLs />
          </div>
          <div className="mt-[45vh] sm:col-span-3 flex flex-col justify-center items-center sm:mt-11 overflow-auto">
            <VtComponent />
          </div>
        </div>
      </HomeWrapper>
    </>
  )
}
