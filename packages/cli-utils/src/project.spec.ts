import { isValidProjectName } from './project';

describe('project', () => {
  it('should validate project names', () => {
    expect(isValidProjectName('Carsten')).toBeTruthy();
    expect(isValidProjectName('test')).toBeFalsy();

    expect(isValidProjectName('1 Project')).toBeFalsy();
  });
});
