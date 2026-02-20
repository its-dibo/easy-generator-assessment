import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [1, 'always', 200],
    'subject-case': [0],
  },
  ignores: [
    (commit) => commit.startsWith('Merge branches'),
  ],
};

export default Configuration;