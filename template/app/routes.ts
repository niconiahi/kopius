import type { RouteConfig } from "@react-router/dev/routes"
import { remixRoutesOptionAdapter } from "@react-router/remix-routes-option-adapter"
import { flatRoutes } from "remix-flat-routes"

const config: RouteConfig = remixRoutesOptionAdapter(
  (defineRoutes) => {
    return flatRoutes("routes", defineRoutes)
  },
)

export default config
