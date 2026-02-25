export const API_ROUTES = {
  PERSON: {
    GET_ALL: '/person/get-all',
    CREATE: '/person/create',
    GET_BY_ID: (id: string) => `/person/get/${id}`, // Rota com parâmetro
  },
  CATEGORY: {
    GET_ALL: '/category/get-all',
    CREATE: '/category/create',
  },
  TRANSACTION: {
    CREATE: '/transaction/create',
    GET_ALL: '/transaction/get-all',
  },
  REPORTS: {
    TOTALS_BY_PERSON: '/reports/totals-by-person',
  }
} as const;