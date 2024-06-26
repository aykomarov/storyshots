import { Application } from 'express-serve-static-core';
import { Baseline } from '../reusables/baseline';
import { TreeOP } from '@storyshots/core';
import { setNoCache } from './reusables/setNoCache';

export function createExpectedRecordsHandler(
  app: Application,
  baseline: Baseline,
) {
  app.get('/api/record/expected/:id', async (request, response) => {
    const id = TreeOP.ensureIsLeafID(request.params.id);

    const expected = await baseline.getExpectedRecords(id);

    setNoCache(response);

    response.json(expected === undefined ? null : expected);
  });
}
