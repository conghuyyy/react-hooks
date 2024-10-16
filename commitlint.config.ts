import { RuleConfigSeverity, type UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [
      RuleConfigSeverity.Error,
      'never',
      ['start-case', 'pascal-case', 'upper-case', 'lowercase'],
    ],
  },
};

export default Configuration;
