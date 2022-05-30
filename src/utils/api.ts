import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import UrlPattern from 'url-pattern';

type AxiosRequest<RequestType> = Omit<
  AxiosRequestConfig<RequestType>,
  'url' | 'method'
>;
interface ApiOptions<RequestType, ResponseType>
  extends AxiosRequest<RequestType> {
  endpoint?: Endpoint<RequestType, ResponseType>;
  paramsUrl?: Record<string, unknown>;
}

interface ApiConfig {
  baseURL: string;
  baseHeaders?: {
    serviceId?: string
    serviceSecret?: string
    withBearer?: boolean
    tokenKeyName?: string
  };
}

const getUrl = (urlPattern: string, params: Record<string, unknown>) => {
  const pattern = new UrlPattern(urlPattern);
  return pattern.stringify(params);
};

type CreateAxios = (
  apiConfig: ApiConfig,
) => <RequestType, ResponseType>(
  apiOptions?: ApiOptions<RequestType, ResponseType>,
) => Promise<AxiosResponse<ResponseType>>;

interface ApiInstance<RequestType, ResponseType> {
  (apiOptions?: ApiOptions<RequestType, ResponseType>): Promise<
    AxiosResponse<ResponseType>
  >;
}

interface ExportedEndpoint {
  <
    Type extends {
      [Property in keyof Type]: Endpoint<
        Type[Property]['requestData'],
        Type[Property]['response']
      >;
    },
  >(
    apiInstance: ReturnType<CreateAxios>,
    endpoints: Type,
  ): {
    [Property in keyof Type]: ApiInstance<
      Type[Property]['requestData'],
      Type[Property]['response']
    >;
  };
}

export const createAxios: CreateAxios = ({baseURL, baseHeaders}) => {
  return apiOptions => {
    const {endpoint = {method: 'get', path: ''}, paramsUrl = {}} =
      apiOptions || {};

    const method = endpoint.method;
    const url = getUrl(endpoint.path, paramsUrl);

    const headers: Record<string, unknown> = {};

    if (baseHeaders) {
      headers.serviceId = baseHeaders.serviceId;
      headers.serviceSecret = baseHeaders.serviceSecret;
      if (baseHeaders.tokenKeyName) {
        let authorization = baseHeaders.withBearer ? 'Bearer ' : ''
        let tokens = JSON.parse(localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_KEY ?? '') ?? '{}')
        let token = tokens?.[baseHeaders.tokenKeyName]
        if (token) {
          const tokenAuthorization = authorization + token
          headers['Authorization'] = tokenAuthorization
        }
      }
    }

    const axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'application/json',
        ...headers,
      },
    });

    const axiosOptions = {
      ...apiOptions,
      method,
      url,
    };

    return axiosInstance.request({...axiosOptions});
  };
};

export const createExportedEndpoint: ExportedEndpoint = (
  apiInstance,
  endpoints,
) => {
  return {
    ...Object.keys(endpoints).reduce(
      (prev, key) => {
        const newKeys = key as keyof typeof endpoints;
        const endpoint = endpoints[newKeys];
        prev[newKeys] = apiOptions =>
          apiInstance<
            typeof endpoint['requestData'],
            typeof endpoint['response']
          >({
            ...apiOptions,
            endpoint,
          });
        return prev;
      },
      {} as {
        [Property in keyof typeof endpoints]: ApiInstance<
          typeof endpoints[keyof typeof endpoints]['requestData'],
          typeof endpoints[keyof typeof endpoints]['response']
        >;
      },
    ),
  };
};
