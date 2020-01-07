import { isNil, isString } from '@acoustic-content-sdk/utils';

/**
 * Validates project names for Angular projects
 *
 * @param projectName - the project name
 * @returns true if the project name is valid, else false
 */
export function isValidProjectName(projectName: string) {
  // quick check
  if (!isString(projectName)) {
    return false;
  }

  const errorIndex = getRegExpFailPosition(projectName);
  const unsupportedProjectNames = [
    'test',
    'ember',
    'ember-cli',
    'vendor',
    'app'
  ];
  const packageNameRegex = /^(?:@[a-zA-Z0-9_-]+\/)?[a-zA-Z0-9_-]+$/;
  // test
  return (
    isNil(errorIndex) &&
    unsupportedProjectNames.indexOf(projectName) < 0 &&
    packageNameRegex.test(projectName)
  );
}

function getRegExpFailPosition(str: string): number | null {
  const isScope = /^@.*\/.*/.test(str);
  if (isScope) {
    // Remove starting @
    str = str.replace(/^@/, '');
    // Change / to - for validation
    str = str.replace(/\//g, '-');
  }

  const parts = str.indexOf('-') >= 0 ? str.split('-') : [str];
  const matched: string[] = [];

  const projectNameRegexp = /^[a-zA-Z][.0-9a-zA-Z]*(-[.0-9a-zA-Z]*)*$/;

  parts.forEach((part) => {
    if (part.match(projectNameRegexp)) {
      matched.push(part);
    }
  });

  const compare = matched.join('-');

  return str !== compare ? compare.length : null;
}
