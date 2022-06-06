import {createAxios, createExportedEndpoint} from '~/utils/api';

export interface Product {
  description: string;
  product_name: string;
  stock: number;
  image: string;
}

const apiProductStrapi = createAxios({
  baseURL: `${process.env.NEXT_PUBLIC_STRAPI_URL}/api` ?? '',
});

export interface TodoEndpoints {
  useProductGet: Endpoint<{}, {
    data: {
      attributes: Product
      id: number
    }[],
  }>;
  useLogin: Endpoint<{ identifier: string, password: string }, {}>,
  useRegister: Endpoint<{ username: string, email: string, password: string }, {}>,
}

const endpoints: TodoEndpoints = {
  useLogin: { method: 'post', path: '/auth/local', response: {} },
  useRegister: { method: 'post', path: '/auth/local/register', response: {} },
  useProductGet: { method: 'get', path: '/products', response: {
      data: [],
    },
  },
};

export default createExportedEndpoint(apiProductStrapi, endpoints);
