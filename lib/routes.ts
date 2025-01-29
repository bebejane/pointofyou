import { buildClient } from "@datocms/cma-client-browser"

const client = buildClient({
  apiToken: process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN,
  environment: process.env.DATOCMS_ENVIRONMENT
})

type Routes = {
  [key: string]: Route
}

type Route = {
  path: ((item?: any) => Promise<string | null>)
  typeName: string
}

const routes: Routes = {
  "home": {
    typeName: "HomeRecord",
    path: async (item) => '/'
  },
  "about": {
    typeName: "AboutRecord",
    path: async (item) => `/om/${item.slug}`
  },
  "education": {
    typeName: "EducationRecord",
    path: async (item) => `/utbildning/${item.slug}`
  },
  "project": {
    typeName: "ProjectRecord",
    path: async (item) => `/projekt/${item.slug}`
  },
  "research": {
    typeName: "ResearchRecord",
    path: async (item) => `/forskning`
  },
  "press": {
    typeName: "PressRecord",
    path: async (item) => `/nyheter/press/${item.slug}`
  },
  "news": {
    typeName: "NewsRecord",
    path: async (item) => `/nyheter/aktuellt/${item.slug}`
  },
  "contact": {
    typeName: "ContactRecord",
    path: async (item) => `/kontakt`
  }
}

export const buildRoute = async (model: string, item?: any): Promise<string> => {
  if (!routes[model]) throw new Error(`Invalid model: ${model}`)
  return await routes[model].path(item)
}

export const recordToRoute = async (record: any): Promise<string> => {
  const { __typename } = record
  const model = Object.keys(routes).find(key => routes[key].typeName === __typename)
  if (!model) throw new Error(`Invalid record: ${__typename}`)
  return await buildRoute(model, record)
}

export default routes