import {
  Box,
  Button,
  List,
  ListIcon,
  ListItem,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { useLsCidQuery } from '../../reduxApp/bridgeApi'
import useMyToast from '../../hooks/useMyToast'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { IoSettings } from 'react-icons/io5'
import { v4 as uuid } from 'uuid'
import { IpfsCard } from './IpfsCard'
import { BezierSpinner } from '../Spinner/BezierSpinner'
import { reset } from '../../reduxApp/ipfsReduxSlice'
import { DopeAlter } from '../Alert/dopeAlert'
import { motion, AnimatePresence } from 'framer-motion'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { DemoIpfsCard } from './IpfsCardDemo'

export default function IpfsLs() {
  const store = useSelector((state) => state.ipfsRedux)
  const dispatch = useDispatch()
  const toast = useMyToast()
  const { currentData, data, error, isLoading, isError } = useLsCidQuery({ cid: store.cid ? store.cid : skipToken })

  useEffect(() => {
    if (store.cid && isError) {
      toast('error', 'No files found related to this CID 💔', 'ipfsCidError')
      console.log('🚀 ~ file: IpfsLs.js ~ line 11 ~ IpfsLs ~ error', error)
      dispatch(reset())
    }
    console.log(store.cid)
  }, [isError, dispatch, toast, error, store.cid])

  return (
    <Box className="absolute -top-9 flex flex-col w-full sm:max-w-[30vw] overflow-y-clip max-h-[104vh] ">
      {isLoading ? (
        <BezierSpinner></BezierSpinner>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={false}
            animate={(currentData && store.cid) ? 'visible' : 'hidden'}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: .5 }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 500 },
            }}
          >
            <Box className="flex flex-col w-full ">
              <div className="sticky top-52 mt-0">
                <DopeAlter
                  headText="Scan Data"
                  bodyText="Select files to scan."
                  color="aqua"
                  show={store.selectedIdx.length === 0 && store.cid}
                />
              </div>
              <div
                className="grid grid-flow-col sm:grid-flow-row sm:grid-cols-1 gap-3 overflow-x-scroll sm:overflow-y-scroll scrollbar-hide px-3 pt-64 max-h-[95vh] "
              // className="flex sm:flex-col overflow-y-scroll gap-y-3 scroll-smooth scrollbar-hide z-10  max-h-[93vh] pt-60 pb-11"
              >{data &&
                <>
                  {data?.map((file, i) => {
                    return (
                      <IpfsCard ls={file} idx={i} key={uuid()} />
                    )
                  })}
                  <DemoIpfsCard md5Hash="193ef846f77e3c0770dd4db567258cde" />
                </>
                }
              </div>
            </Box>
          </motion.div>
        </AnimatePresence>
      )
      }
    </Box >
  )
}
