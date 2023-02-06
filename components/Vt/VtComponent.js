import { useSelector, useDispatch } from "react-redux";
import { DopeAlter } from "../Alert/dopeAlert";
import { VtReport } from "./VtReport";
import demoReport from "../../reduxApp/demoResHash.json";


export default function VtComponent() {
  const store = useSelector((state) => state.ipfsRedux)
  const dispatch = useDispatch()

  return (
    <div
      className="flex flex-col justify-center items-center w-full h-full"
    >
      <DopeAlter headText="Reports" bodyText="Your reports for the Scanned files." show={store.reports.length > 0} color="aqua" />
      <div
        className="grid grid-flow-row grid-cols-1 justify-center items-center gap-y-3 "
      >
        <VtReport key={111} name="test" idc={111} report={demoReport} fileCid="123123123" />
        {store.reports.map((report) => {
          const { idx, fileName, data } = report
          return (
            <VtReport
              key={idx}
              name={fileName}
              idc={idx}
              report={data}
            />
          )
        })}
      </div>
    </div>
  )
}