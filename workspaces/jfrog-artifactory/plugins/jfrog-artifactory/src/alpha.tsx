/*
 * Copyright 2025 The Backstage Authors
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
import {
  createFrontendPlugin,
  PageBlueprint,
  createApiFactory,
  ApiBlueprint,
} from '@backstage/frontend-plugin-api';
import {
  convertLegacyRouteRefs,
  compatWrapper,
  convertLegacyRouteRef,
} from '@backstage/core-compat-api';
import { rootRouteRef } from './routes';
import { jfrogArtifactoryApiRef, JfrogArtifactoryApiClient } from './api';
import {
  discoveryApiRef,
  configApiRef,
  identityApiRef,
} from '@backstage/core-plugin-api';

/**
 * @alpha
 */
export const JfrogArtifactoryPage = PageBlueprint.make({
  params: {
    defaultPath: '/jfrog-artifactory',
    routeRef: convertLegacyRouteRef(rootRouteRef),
    loader: () =>
      import('./components/JfrogArtifactoryDashboardPage').then(m =>
        // The compatWrapper utility allows you to keep using @backstage/core-plugin-api in the
        // implementation of the component and switch to @backstage/frontend-plugin-api later.
        compatWrapper(<m.JfrogArtifactoryDashboardPage />),
      ),
  },
});

/** @alpha */
export const jfrogArtifactoryApi = ApiBlueprint.make({
  params: {
    factory: createApiFactory({
      api: jfrogArtifactoryApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        configApi: configApiRef,
        identityApi: identityApiRef,
      },
      factory: ({ discoveryApi, configApi, identityApi }) =>
        new JfrogArtifactoryApiClient({ discoveryApi, configApi, identityApi }),
    }),
  },
});

/** @alpha */
export default createFrontendPlugin({
  pluginId: 'jfrog-artifactory',
  extensions: [
    // Extensions will be added here
    JfrogArtifactoryPage,
    jfrogArtifactoryApi,
  ],
  routes: convertLegacyRouteRefs({
    root: rootRouteRef,
    // Legacy route refs can be converted here
  }),
  externalRoutes: convertLegacyRouteRefs({
    // External route refs can be converted here
  }),
});
