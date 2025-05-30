/*
 * Copyright 2024 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { convertLegacyRouteRef } from '@backstage/core-compat-api';
import { EntityContentBlueprint } from '@backstage/plugin-catalog-react/alpha';
import { isGithubActionsAvailable } from '../components/Router';
import { rootRouteRef } from '../routes';

/**
 * @alpha
 */
export const entityGithubActionsContent = EntityContentBlueprint.make({
  name: 'entity',
  params: {
    defaultPath: 'github-actions',
    defaultTitle: 'GitHub Actions',
    filter: isGithubActionsAvailable,
    routeRef: convertLegacyRouteRef(rootRouteRef),
    loader: () =>
      import('../components/Router').then(m => <m.Router view="table" />),
  },
});
