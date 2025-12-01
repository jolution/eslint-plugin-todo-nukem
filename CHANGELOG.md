# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2025-12-01

### 🚨 BREAKING CHANGES

- **Switched from emoji-based to text-based format**
  - Old format: `// TODO: 🟩 ✨ 🎨 Description`
  - New format: `// TODO: [low] [feature] [design] Description`
  - This is a breaking change. All existing TODOs need to be migrated to the new format.

### Added

- Text-based classification tags: `[low]`, `[medium]`, `[high]` for priority
- Text-based type tags: `[feature]`, `[fix]`
- Text-based context tags: `[design]`, `[doc]`, `[test]`, `[perf]`, `[lang]`, `[sec]`, `[update]`, `[optimize]`, `[review]`
- Meta blocks support: `[tbd]`, `[scope: ...]`, `[ticket: ...]`, `[until: ...]`, `[assignee: ...]`, `[author: ...]`, `[version: ...]`, `[docs]`, `[block-commit]`
- Comprehensive test suite with 22 test cases
- Example file for local testing

### Changed

- Updated README with new format examples
- Improved error messages to reflect text-based format
- Better validation for meta blocks

### Migration Guide

To migrate from v0.1.x to v0.2.0:

**Before (v0.1.x):**
```javascript
// TODO: 🟩 ✨ 🎨 Refactor this component
```

**After (v0.2.0):**
```javascript
// TODO: [low] [feature] [design] Refactor this component
```

Use the [TODO NUKEM VSCode Extension](https://github.com/jolution/todo-nukem-vscode) to generate properly formatted TODOs.

## [0.1.2] - Previous version

Initial emoji-based implementation.
