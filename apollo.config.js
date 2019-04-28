module.exports = {
  client: {
    excludes: ['node_modules/**/*'],
    includes: ['**/*.ts'],
    service: {
      name: 'my-project',
      localSchemaFile: './graphql/schema.json',
    },
  },
};
