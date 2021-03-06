// @flow
import { getFullRoutePath } from '~/router/utils/get-full-route-path';
import { fillPathParams } from '~/router/utils/fill-path-params';
import type { UniversalRouterContext } from '~/router/types';

export function isRequestedRoute(context: UniversalRouterContext) {
  const fullRoutePath = getFullRoutePath(context.route);

  return (
    context.pathname ===
    fillPathParams({ path: fullRoutePath || '/', params: context.params })
  );
}
