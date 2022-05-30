import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import { AppProps } from 'next/app';
import type { AxiosRequestConfig } from 'axios'
declare global {
  type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
  }
  
  type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
  }

  type SetState<T> = React.Dispatch<React.SetStateAction<T>>

  type Endpoint<
    RequestType = {},
    ResponseType = Record<string, unknown>,
  > = {
    method: AxiosRequestConfig['method'];
    path: string;
    response: ResponseType;
    requestData?: RequestType;
  };
}
