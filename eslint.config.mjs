import todoNukem from './index.js';

export default [
  {
    ignores: ['node_modules/**']
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      'todo-nukem': todoNukem
    },
    rules: {
      'todo-nukem/todo-nukem-convention': 'error'
    }
  }
];
