// Redux Api to Virustotal v4 API

import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
// import sdkApi from 'api'

// const sdk = sdkApi('@virus-total/vt3.0')

const axiosBaseQuery =
  (
    { baseUrl }
  ) =>
    async ({ url, method, data, params, headers }) => {
      try {
        const result = await axios({
          url: baseUrl + url,
          method,
          data,
          params: {
            ...params,
          },
          headers: {
            'x-apikey': 'xxx',
            ...headers,
          },
        })
        return { data: result.data }
      } catch (axiosError) {
        let err = axiosError
        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message,
          },
        }
      }
    }



export const vtApi = createApi({
  reducerPath: 'vtApi',
  baseQuery: axiosBaseQuery({
    baseUrl: '/virustotal/api/v3',
  }),
  endpoints: (builder) => ({
    checkHash: builder.query({
      query: ({ hash }) => ({
        url: `/files/${hash}`,
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
      }),
    }),
    checkFile: builder.mutation({
      // File must be below 32MB
      query: ({ file }) => ({
        url: `/files`,
        method: 'POST',
        data: { file },
      }),
    })
  }),
})


export const { useCheckHashQuery, useLazyCheckHashQuery, useCheckFileMutation } = vtApi
