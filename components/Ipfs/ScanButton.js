import { Box, Text, Button } from '@chakra-ui/react'
import { motion } from "framer-motion"
import { useEffect } from 'react'
import { IoSettings } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import useMyToast from '../../hooks/useMyToast'
import { useCheckHashQuery, useLazyCheckHashQuery, useCheckFileMutation } from '../../reduxApp/vtApi'


export default function ScanButton({ idx, showButton }) {
  // const { data, isLoading, isError, isSuccess, error } = useCheckHashQuery({ hash: store.selectedIdx[idx] })
  // const [checkFile, { isLoading: isMutating, isError: isMutationError, isSuccess: isMutationSuccess, error: mutationError }] = useCheckFileMutation()
  // Lazy Hash check query
  const [checkFile, { isLoading: isMutating, isError: isMutationError, isSuccess: isMutationSuccess, error: mutationError }] = useCheckFileMutation()
  const [hashCheckTrigger, hashCheckResult, lastPromiseInfo] = useLazyCheckHashQuery()
  const dispatch = useDispatch()
  const store = useSelector((state) => state.ipfsRedux)
  const toast = useMyToast()


  useEffect(() => {
    if (isMutationSuccess) {
      toast('success', 'File scanned successfully! 🎉', 'fileScanSuccess')
      // dispatch(reset())
    }
    if (isMutationError) {
      toast('error', 'Something went wrong. Please try again later. 💔', 'fileScanError')
      console.log('🚀 ~ file: ScanButton.js ~ line 11 ~ ScanButton ~ mutationError', mutationError)
      // dispatch(reset())
    }
  }, [isMutationSuccess, isMutationError, mutationError, dispatch, toast])

  const handleClick = () => {
    console.log("Clicqq", idx)
    // TODO: Compute md5 hash of file
    // checkFile({ hash: store.selectedIdx[idx] })
  }

  return (
    <motion.div
      initial={false}
      animate={showButton ? 'visible' : 'hidden'}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut", duration: .5 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 500 },
      }}
    >
      <Box className="absolute z-30 h-full w-full flex flex-col justify-center items-center">
        <Button
          className="bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700"
          onClick={handleClick}
          isLoading={isMutating}
          disabled={isMutating}
          size="lg"
          colorScheme="aqua"
          variant="solid"
          leftIcon={<IoSettings />}
        >
          Hash Scan
        </Button>
        {/* <Text className="text-xs text-snow mt-2">Scan file for malicious content</Text> */}
      </Box>
    </motion.div>
  )
}