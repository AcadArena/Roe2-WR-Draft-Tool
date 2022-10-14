/* ========================================================================== */
// 			Loadable
/* ========================================================================== */

import { FunctionComponent, lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";

export function Loadable<T extends object = {}>(
  Component: FunctionComponent<T>
) {
  const LazyComponent = (props: T) => {
    return (
      <Suspense>
        <Component {...props} />
      </Suspense>
    );
  };

  return LazyComponent;
}

/* ========================================================================== */
// 			Components
/* ========================================================================== */

const Controller = Loadable(lazy(() => import("./pages/Controller")));
const OverlayAllGs2 = Loadable(lazy(() => import("./pages/Overlay.allgs2")));
/* ========================================================================== */
// 			Router
/* ========================================================================== */

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <Controller />,
    },
    {
      path: "overlay",
      children: [
        {
          path: "allgs2",
          element: <OverlayAllGs2 />,
        },
      ],
    },
  ]);
};

export default Router;
