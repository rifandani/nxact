module.exports = {
  '{apps,libs,tools}/**/*.{ts,js,json,md,html,css,scss}': [
    // 'nx affected --target lint --uncommitted --fix true',
    // 'nx affected --target test --uncommitted',
    // 'nx format:write --uncommitted',
    'nx workspace-lint',
  ],
};
