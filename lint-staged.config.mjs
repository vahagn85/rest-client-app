const lintStagedConfig = {
  '*': 'prettier -u --check',
  '*.{js,jsx,ts,tsx}': 'eslint',
};

export default lintStagedConfig;
