/*
 * Copyright 2021 The Backstage Authors
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

import { createApiRef } from '@backstage/core-plugin-api';
import {
  CheckResult,
  BulkCheckResponse,
  FactSchema,
  CheckLink,
  Check,
  InsightFacts,
} from '@backstage-community/plugin-tech-insights-common';
import { CheckResultRenderer } from '../components/CheckResultRenderer';
import { CompoundEntityRef, Entity } from '@backstage/catalog-model';

/**
 * {@link @backstage/core-plugin-api#ApiRef} for the {@link TechInsightsApi}
 *
 * @public
 */
export const techInsightsApiRef = createApiRef<TechInsightsApi>({
  id: 'plugin.techinsights.service',
});

/**
 * Tech Insights API client interface
 *
 * @public
 */
export interface TechInsightsApi {
  getCheckResultRenderers: (types: string[]) => CheckResultRenderer[];
  isCheckResultFailed: (check: CheckResult) => boolean;
  getAllChecks(): Promise<Check[]>;
  runChecks(
    entityParams: CompoundEntityRef,
    checks?: string[],
  ): Promise<CheckResult[]>;
  runBulkChecks(
    entities: CompoundEntityRef[],
    checks?: Check[],
  ): Promise<BulkCheckResponse>;
  getFacts(entity: CompoundEntityRef, facts: string[]): Promise<InsightFacts>;
  getFactSchemas(): Promise<FactSchema[]>;
  getLinksForEntity(
    result: CheckResult,
    entity: Entity,
    options?: { includeStaticLinks?: boolean },
  ): CheckLink[];
}
