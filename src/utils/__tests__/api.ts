import axios, { Axios, AxiosInstance } from 'axios';
import { createAxios, createExportedEndpoint } from '../api'

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('utils/api', () => {
  describe('createAxios', () => {
    it('when created and return request, should request with axiosOptions', () => {
      mockedAxios.create.mockReturnValue({
        request: (props) => props,
      } as AxiosInstance)
      const apiMock = createAxios({
        baseURL: 'https://google.com',
      })
      const endpoint = {
        method: 'get',
        path: '/test',
        response: 'response'
      }
      const request = apiMock({
        endpoint,
      })
      const expectedValue = {
        endpoint: {
          method: endpoint.method,
          path: endpoint.path,
          response: endpoint.response,
        },
        method: endpoint.method,
        url: endpoint.path,
      }
      expect(request).toMatchObject(expectedValue)
    })
    it('when created and return request with params, should request with axiosOptions', () => {
      mockedAxios.create.mockReturnValue({
        request: (props) => props,
      } as AxiosInstance)
      const apiMock = createAxios({
        baseURL: 'https://google.com',
      })
      const endpoint = {
        method: 'get',
        path: '/test/:id',
        response: 'response'
      }
      const request = apiMock({
        endpoint,
        paramsUrl: {
          id: 1,
        }
      })
      const expectedValue = {
        endpoint: {
          method: endpoint.method,
          path: endpoint.path,
          response: endpoint.response,
        },
        method: endpoint.method,
        url: '/test/1',
      }
      expect(request).toMatchObject(expectedValue)
    })
    it('when created with headers token and no tokens stored, should request with axiosOptions', () => {
      const tokenKey = "tokenKey"
      const tokenKeyService = "tokenKeyService"
      process.env.NEXT_PUBLIC_TOKEN_KEY = tokenKey
      mockedAxios.create.mockReturnValue({
        request: (props) => props,
      } as AxiosInstance)
      const apiMock = createAxios({
        baseURL: 'https://google.com',
        baseHeaders: {
          serviceId: 'serviceId',
          serviceSecret: 'serviceSecret',
          tokenKeyName: tokenKeyService,
        }
      })
      const endpoint = {
        method: 'get',
        path: '/test/:id',
        response: 'response'
      }
      const request = apiMock({
        endpoint,
        paramsUrl: {
          id: 1,
        }
      })
      const expectedValue = {
        endpoint: {
          method: endpoint.method,
          path: endpoint.path,
          response: endpoint.response,
        },
        method: endpoint.method,
        url: '/test/1',
      }
      expect(request).toMatchObject(expectedValue)
    })
  })
  it('when created with headers token and tokens stored, should request with axiosOptions', () => {
    const tokenKey = "tokenKey"
    const tokenKeyService = "tokenKeyService"
    process.env.NEXT_PUBLIC_TOKEN_KEY = tokenKey
    localStorage.setItem(tokenKey, `{ "${tokenKeyService}": "token" }`)
    mockedAxios.create.mockReturnValue({
      request: (props) => props,
    } as AxiosInstance)
    const apiMock = createAxios({
      baseURL: 'https://google.com',
      baseHeaders: {
        serviceId: 'serviceId',
        serviceSecret: 'serviceSecret',
        tokenKeyName: tokenKeyService,
      }
    })
    const endpoint = {
      method: 'get',
      path: '/test/:id',
      response: 'response'
    }
    const request = apiMock({
      endpoint,
      paramsUrl: {
        id: 1,
      }
    })
    const expectedValue = {
      endpoint: {
        method: endpoint.method,
        path: endpoint.path,
        response: endpoint.response,
      },
      method: endpoint.method,
      url: '/test/1',
    }
    expect(request).toMatchObject(expectedValue)
  })

  describe('createExportedEndpoint', () => {
    it('create exported endpoint', () => {
      const createdInstance = createAxios({
        baseURL: 'https://google.com',
      })
      const endpoints = {
        useTestGet: {
          method: 'get',
          path: '/test',
          response: 'test',
        }
      }
      const createdExported = createExportedEndpoint(
        createdInstance,
        endpoints,
      )
      let expectedValue = {
        useTestGet: () => ({
          method: 'get',
        })
      }
      // let expectedValue: Record<string, unknown> = {}
      // expectedValue['useTestGet'] = (apiOptions: Record<string, unknown>) => createdInstance({ ...apiOptions })
      expect(createdExported.useTestGet()).toMatchObject(expectedValue.useTestGet())
    })
  })
})