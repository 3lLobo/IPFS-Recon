import { createSlice } from '@reduxjs/toolkit'
import md5 from 'md5'

// remove idx from array
function arrRemoveByElement(arr, value) {
  return arr.filter(function (ele) {
    return ele != value
  })
}

// remove idx from array
function arrRemoveByIdx(arr, idx) {
  return arr.filter(function (ele, i) {
    return i != idx
  })
}

// This is neccesary to reset the state
const initialState = {
  cid: null,
  selectedIdx: new Array(),
  selectedFiles: new Array(),
  selectedName: new Array(),
  selectedMd5: new Array(),
  reports: new Array(),
  deployed: false,
}

export const ipfsReduxSlice = createSlice({
  name: 'ipfsRedux',
  initialState,
  reducers: {
    setCid: (state, action) => {
      // Get the file information from the current cid.
      const { cid } = action.payload
      state.cid = cid
    },
    selectFile: (state, action) => {
      const { idx, file, name } = action.payload
      if (!state.selectedIdx.includes(idx)) {
        state.selectedIdx.push(idx)
        state.selectedFiles.push(file)
        state.selectedName.push(name)
        const filehash = md5(file)
        state.selectedMd5.push(filehash)
      }
    },
    unselectFile: (state, action) => {
      const { idx } = action.payload

      if (state.selectedIdx.includes(idx)) {
        const file_idx = state.selectedIdx.indexOf(idx)
        state.selectedFiles = arrRemoveByIdx(state.selectedFiles, file_idx)
        state.selectedName = arrRemoveByIdx(state.selectedName, file_idx)
        state.selectedMd5 = arrRemoveByIdx(state.slectedMd5, file_idx)
        state.selectedIdx = arrRemoveByElement(state.selectedIdx, idx)
        console.log('Removed file: ', idx)
      }
    },
    addReport: (state, action) => {
      const { data, idx } = action.payload
      if (state.reports.length > 0) {
        const report_idx = state.reports.findIndex((report) => report.idx === idx)
        if (report_idx > -1) {
          state.reports[report_idx].data = data
          console.log('Updated report: ', state.reports[report_idx])
          return
        }
      }

      const fileName = state.selectedName[state.selectedIdx.indexOf(idx)]
      const report = {
        data: data,
        fileName: fileName || "metaAaSpLoiT.exe",
        idx: idx,
      }
      state.reports.push(report)

      console.log('Added report: ', report)
    },
    deployFile: (state) => {
      // Deploy the file to CORTX
      if (true) {
        state.deployed = true
      }
    },
    reset: () => initialState,
  },
})

export const { setCid, selectFile, unselectFile, deployFile, addReport, reset } = ipfsReduxSlice.actions

export default ipfsReduxSlice.reducer
