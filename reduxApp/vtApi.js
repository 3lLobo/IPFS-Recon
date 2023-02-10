// Redux Api to Virustotal v4 API

import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react'
import axios from 'axios'


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
            // withCredentials: false,
          },
          headers: {
            'x-apikey': 'xxx',
            ...headers,
          },
        })
        return { data: result.data }
      } catch (axiosError) {
        let err = axiosError
        console.error("AXIOS", { err })
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
    // baseUrl: '/virustotal/api/v3',
    baseUrl: '/api/vt',
  }),
  endpoints: (builder) => ({
    checkHash: builder.query({
      query: ({ hash }) => ({
        url: `/hashReport/${hash}`,
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
