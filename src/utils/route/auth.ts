/**
 * This script includes authentication related utility functions
 */
export type validationErrorType = { validation: { dataPath: string, keyword: string }[] };

export const passwordValidationError = (error: Error & validationErrorType) => (error.validation
  .find(({ dataPath, keyword }) => dataPath === '.password' && keyword === 'pattern')
  ? new Error('Password pattern error!') : error);
