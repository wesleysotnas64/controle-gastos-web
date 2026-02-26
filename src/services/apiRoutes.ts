export const API_ROUTES = {
  PERSON: {
    GET_ALL: '/person/get-all',
    CREATE: '/person/create',
    DELETE: (id: string) => `/person/delete/${id}`,
    GET_BY_ID: (id: string) => `/person/get/${id}`,
    UPDATE: (id: string) => `/person/update/${id}`,
  },
  CATEGORY: {
    GET_ALL: '/category/get-all',
    CREATE: '/category/create',
  },
  TRANSACTION: {
    CREATE: '/transaction/create',
    GET_ALL: '/transaction/get-all',
  },
  DASHBOARD: {
    TOTALS_BY_PERSON: '/dashboard/totals-by-person',
  }
} as const;