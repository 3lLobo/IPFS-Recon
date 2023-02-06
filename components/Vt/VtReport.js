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


// Card which displays a short summry of the VT report. On click, it opens a modal with the full report.
export const VtReport = ({ idx, name, report }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  console.log("🚀report", beautify(report.data.attributes.last_analysis_stats, null, 2, 10));

  const bg = useColorModeValue('bg-snow-muted', 'ring-1 ring-slate-900 bg-aqua-muted ')
  const hoverStyle = ' bg-opacity-10 hover:bg-opacity-20 hover:scale-90'
  return (
    <>
      <Box
        onClick={onOpen}
        className={`${bg} flex flex-col w-full h-full max-w-[20rem] p-2 mx-3 rounded-xl shadow-xl transform-gpu transition duration-300 ease-in-out hover:cursor-pointer ${hoverStyle}`}
      >
        <div className="flex flex-col justify-between px-3 py-6">
          {/* <Text className="font-extralight">
            Report for:
          </Text> */}
          <div
            className="flex flex-row justify-evenly"
          >
            <Icon as={IoAnalytics} className="text-2xl fill-aqua" />
            <Text className="font-extralight text-sm" >
              {name}
            </Text>
          </div>
        </div>
        {/* <Text fontSize="xs" color="gray.500">
          {VtReport}
        </Text> */}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="bg-snow dark:bg-charcoal/60 w-[80vw]" >
          <ModalHeader>
            <Text className="font-extralight">
              Report for:
            </Text>
            <Text className="font-extralight text-sm">
              {name}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            <div
              className="flex flex-col justify-evenly gap-y-6 text-snow font-mono rounded-2xl  p-2"
            >
              <div className="flex flex-row justify-start items-center gap-4">
                <Icon as={IoTime} className="text-2xl fill-aqua" />
                <div
                  className="flex flex-row text-sm font-extralight font-sans w-full justify-start gap-x-6"
                >
                  <div>
                    First seen:
                  </div>
                  <ReactTimeago date={report.data.attributes.first_seen_itw_date} />
                </div>
              </div>


              {/* <Text className="font-extralight text-sm" >
                {beautify(report.data.attributes.last_analysis_stats, null, 4, 100).split("\n").map((item, i) => {
                  //  add a | at the beginning of each line
                  item = "| " + item
                  return <span key={i}>{item}<br /></span>

                })}

              </Text> */}
              <JSONTree data={report.data.attributes.last_analysis_stats} theme="ocean" />
            </div>
          </ModalBody>

          <ModalFooter>
            <div
              className="flex flex-row justify-between text-snow font-mono rounded-2xl bg-aqua/10 p-2 w-full h-full"
            >
              <Link href={`https://www.virustotal.com/gui/search/${report.data.attributes.md5}`}>
                <button className="bg-aqua/50 hover:bg-aqua/60 text-snow font-mono rounded-2xl p-2">
                  View Full Report
                </button>
              </Link>
              < Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ >
  );
}