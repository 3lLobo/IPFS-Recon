// import { useSelector, useDispatch } from "react-redux";
import { Button } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Icon } from "@chakra-ui/icon";
import { Box, Text } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { useEffect, useState } from "react";
import { IoAnalytics, IoSettings, IoTime } from "react-icons/io5";
import { v4 as uuid } from "uuid";
import { BezierSpinner } from "../Spinner/BezierSpinner";
import beautify from "json-beautify";
import { JSONTree } from 'react-json-tree';
import Link from "next/link";
import ReactTimeago from "react-timeago";
import { HiveReport } from "./HiveReport";


// Card which displays a short summry of the VT report. On click, it opens a modal with the full report.
export const VtReport = ({ idx, name, report, fileCid }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);


  const bg = useColorModeValue('bg-snow-muted', 'ring-1 ring-slate-900 bg-aqua-muted ')
  const hoverStyle = ' bg-opacity-10 hover:bg-opacity-20 hover:scale-90'
  return (
    <>
      <Box
        onClick={onOpen}
        className={`${bg} flex flex-col sm:w-full h-full min-h-20 min-w-[11rem] sm:max-w-[20rem] p-2 mx-3 rounded-xl shadow-xl transform-gpu transition duration-300 ease-in-out hover:cursor-pointer ${hoverStyle}`}
      >
        <div className="flex flex-col justify-between px-3 py-6">
          <div
            className="flex flex-row  gap-3 justify-evenly"
          >
            <Icon as={IoAnalytics} className="text-2xl fill-aqua" />
            <Text className="font-semibold text-sm truncate" >
              {name}
            </Text>
          </div>
        </div>

      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl" className="bg-snow dark:bg-indigo-400/10">
        <ModalOverlay />
        <ModalContent
          className="bg-aqua-muted dark:bg-indigo-400 flex flex-col w-full max-h-[80vh] justify-center items-center align-middle prose"
        >
          <div
            className="flex flex-col justify-between text-slate-900 dark:text-snow rounded-md w-full max-w-6xl max-h-[80vh] bg-right-top bg-gradient-to-b from-aqua/90 to-aqua/20 "
          >
            <ModalHeader>
              <div
                className="flex flex-col sm:flex-row justify-center items-center gap-4 "
              >
                <Text className="font-semibold text-2xl mb-0 sm:mb-9">
                  Report for:
                </Text>
                <div className="grid grid-rows-2 gap-y-6 font-semibold text-sm w-fit max-w-md">
                  <div className="grid grid-flow-col grid-cols-6  sm:grid-cols-5">

                    <div className="col-span-2 sm:col-span-1">
                      Filename:
                    </div>
                    <span className="  dark:text-snow ml-3 col-span-4 truncate">
                      {name}
                    </span>
                  </div>
                  {/* {fileCid && ( */}
                  <div className="grid grid-flow-col grid-cols-6 sm:grid-cols-5 ">

                    <div className="font-semibold text-sm col-span-2  sm:col-span-1">
                      CID:
                    </div>
                    <div
                      className=" ml-3 truncate  col-span-4"
                    >

                      <Link href={`https://ipfs.io/ipfs/${fileCid}`} title={`https://ipfs.io/ipfs/${fileCid}`}>
                        <span
                          className="truncate hover:text-aqua"
                        >
                          {fileCid}
                        </span>
                      </Link>
                    </div>
                  </div>
                  {/* )} */}
                </div>
              </div>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody
              className="flex flex-col justify-start align-middle gap-y-6  text-charcoal  dark:text-charcoal rounded-2xl w-full overflow-y-scroll scrollbar-hide "
            >
              <div
                className="relative mt-11"
              >
                <HiveReport content={report.data} />
              </div>
              {/* <div
              className="flex flex-col justify-evenly gap-y-6  text-charcoal dark:text-snow font-mono rounded-2xl  p-2"
            >
              <div className="flex flex-row justify-start items-center gap-4">
                <Icon as={IoTime} className="text-2xl fill-aqua" />
                <div
                  className="flex flex-row text-sm font-semibold font-sans w-full justify-start gap-x-6"
                >
                  <div>
                    First seen:
                  </div>
                  <ReactTimeago date={report.data.attributes.first_seen_itw_date} />
                </div>
              </div>
            <JSONTree data={report.data.attributes.last_analysis_stats} theme="ocean" />
          </div> */}
            </ModalBody>

            <ModalFooter>
              <div
                className="flex flex-row justify-between  text-charcoal dark:text-snow rounded-2xl bg-aqua/10 p-2 w-full h-full"
              >
                <Link href={`https://www.virustotal.com/gui/search/${report.data.attributes.md5}`}>
                  <Button variant="outline">
                    View Full Report
                  </Button>
                </Link>
                < Button colorScheme="blue" mr={3} onClick={onClose} variant="outline" >
                  Close
                </Button>
              </div>
            </ModalFooter>
          </div>
        </ModalContent >
      </Modal >
    </ >
  );
}