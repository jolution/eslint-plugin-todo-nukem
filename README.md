<p align="center">
    <img alt="Shows the banner of TODO NUKEM, with its logo" src="./resources/svg/todonukem.svg" width="700">
</p>

<div align="center">

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)

</div>

ESLint plugin to enforce the [TODO NUKEM](https://github.com/jolution/todo-nukem) convention for code comments.

## About TODO NUKEM

In a nutshell: TODO NUKEM is a convention for classifying TODO comments in your code with text-based tags for priority, type, and context. This makes it easier to track and manage technical debt.

**Learn more:**  
[GitHub Repository](https://github.com/jolution/eslint-plugin-todo-nukem)  
[npm Package](https://www.npmjs.com/package/@jolution/eslint-plugin-todo-nukem)  

## Installation

```bash
npm install --save-dev @jolution/eslint-plugin-todo-nukem
```

## Usage

Add to your Eslint-Config File (e.g `eslint.config.js`):

```javascript
import todoNukem from '@jolution/eslint-plugin-todo-nukem';

export default [
  {
    plugins: {
      'todo-nukem': todoNukem
    },
    rules: {
      'todo-nukem/todo-nukem-convention': 'error'
    }
  }
];
```

## Best Practice: Use with VSCode Generator

For the best experience, we recommend using this ESLint plugin together with the [TODO NUKEM VSCode Generator](https://github.com/jolution/todo-nukem-generator-vscode). The generator provides:

- **Quick TODO creation**
- **Automatic formatting** to match the convention
- **Seamless integration** with this ESLint plugin for validation

This combination ensures your TODOs are always correctly formatted from the start, while the ESLint plugin catches any manual edits that don't follow the convention.

## Classification Format

The plugin enforces the TODO NUKEM format:

```javascript
// TODO: [priority] [type] [context] <description> [optional meta]
// TODO: [low] [feature] [design] Refactor this component [scope: Header] [until: 2025-Q1]
```

**In source code:**

```javascript
// TODO: [low] [feature] [design] Refactor this component
```

**Visual display (with VSCode extension decorations):**

```javascript
// TODO: 🟩 ✨ 🎨 Refactor this component
```

For the complete specification and all available tags, see the [TODO NUKEM documentation](https://github.com/jolution/todo-nukem).

## ❤️ Support

If you find this project helpful, please consider giving it a star on [GitHub](https://github.com/jolution/todo-nukem).

[![Star this repository](https://img.shields.io/github/stars/jolution/todo-nukem?style=social)](https://github.com/jolution/todo-nukem)

We do not currently offer direct support for this project.

## ✍️ Authors (in alphabetical order)

- [@juliankasimir](https://www.github.com/juliankasimir)
- [@pimmok](https://www.github.com/pimmok)

## 💎 Sponsor

### Atos

We appreciate the support from [Atos](https://atos.net), helping us continue our open source work.

## ⚖️ License

See the [LICENSE](LICENSE) file for details.

## ℹ️ Disclaimer

Please note that this project, TODO NUKEM, is not officially associated with or endorsed by the Duke Nukem franchise or its creators. It is an independent project developed by the open-source community and does not claim any rights to the Duke Nukem trademark or any related materials.
