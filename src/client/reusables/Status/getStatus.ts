import { StoryID } from '../../../reusables/types';
import { isNil } from '../../../reusables/utils';
import { TestResults } from '../../Manager/behaviour/useTestResults/types';
import { StatusType } from './types';

export function getStoryStatus(
  storyId: StoryID,
  results: TestResults,
): StatusType {
  const testResult = results.get(storyId);

  if (isNil(testResult) || testResult.running) {
    return null;
  }

  if (testResult.type === 'error') {
    return 'error';
  }

  const typeFinal = testResult.screenshots.primary.results.final.type;
  const typeOthers = testResult.screenshots.primary.results.others;
  const typeRecords = testResult.records.type;

  const types = [
    typeRecords,
    typeFinal,
    ...typeOthers.map(({ result }) => result.type),
  ];

  return getCommonStatus(types);
}

export function getCommonStatus(types: StatusType[]): StatusType {
  return types.reduce(compareStatuses, null);
}

function compareStatuses(left: StatusType, right: StatusType): StatusType {
  if (right === null) {
    return left;
  }

  if (left === null) {
    return right;
  }

  if (left === 'error') {
    return left;
  }

  if (left === 'fail') {
    return left;
  }

  if (right === 'pass') {
    return left;
  }

  return right;
}

// function getCommonStatus(types: StatusType[]): StatusType {
//   if (types.includes('error')) {
//     return 'error';
//   }

//   if (types.includes('fail')) {
//     return 'fail';
//   }

//   if (types.includes('fresh')) {
//     return 'fresh';
//   }

//   if (types.includes('pass')) {
//     return 'pass';
//   }

//   return null;
// }