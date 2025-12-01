import { RuleTester } from "eslint";
import rule from "../eslint-rules/todo-nukem-convention.mjs";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module"
  }
});

ruleTester.run("todo-nukem-convention", rule, {
  valid: [
    {
      code: "// TODO: [low] [feature] [design] Implement new button",
      name: "Valid TODO with low priority, feature type, and design context"
    },
    {
      code: "// TODO: [medium] [fix] [test] Fix flaky test",
      name: "Valid TODO with medium priority, fix type, and test context"
    },
    {
      code: "// TODO: [high] [feature] [perf] Optimize database query",
      name: "Valid TODO with high priority, feature type, and performance context"
    },
    {
      code: "// TODO: [low] [feature] [design] Refactor component [ticket: JIRA-123]",
      name: "Valid TODO with ticket meta block"
    },
    {
      code: "// TODO: [low] [fix] [sec] Fix security issue [until: 2025-Q1]",
      name: "Valid TODO with until meta block"
    },
    {
      code: "// TODO: [medium] [feature] [doc] Update documentation [scope: Header] [author: John]",
      name: "Valid TODO with multiple meta blocks"
    },
    {
      code: "// TODO: [low] [feature] [optimize] Improve performance [tbd]",
      name: "Valid TODO with TBD meta block"
    },
    {
      code: "// TODO: [high] [fix] [update] Critical bug [block-commit]",
      name: "Valid TODO with block-commit meta block"
    },
    {
      code: "// FIXME: [low] [fix] [design] Fix styling issue",
      name: "Valid FIXME with correct format"
    },
    {
      code: "/* TODO: [low] [feature] [lang] Add translation */",
      name: "Valid block comment TODO"
    },
    {
      code: "// TODO: [low] [feature] [review] Needs code review",
      name: "Valid TODO with review context"
    }
  ],

  invalid: [
    {
      code: "// TODO:[low] [feature] [design] Missing space after colon",
      errors: [{ messageId: "missingSpace" }],
      name: "Missing space after TODO:"
    },
    {
      code: "// TODO: low [feature] [design] Missing brackets on priority",
      errors: [{ messageId: "invalidPriority" }],
      name: "Priority without brackets"
    },
    {
      code: "// TODO: [unknown] [feature] [design] Invalid priority",
      errors: [{ messageId: "invalidPriority" }],
      name: "Invalid priority value"
    },
    {
      code: "// TODO: [low] feature [design] Missing brackets on type",
      errors: [{ messageId: "invalidType" }],
      name: "Type without brackets"
    },
    {
      code: "// TODO: [low] [bug] [design] Invalid type",
      errors: [{ messageId: "invalidType" }],
      name: "Invalid type value"
    },
    {
      code: "// TODO: [low] [feature] design Missing brackets on context",
      errors: [{ messageId: "invalidContext" }],
      name: "Context without brackets"
    },
    {
      code: "// TODO: [low] [feature] [invalid] Invalid context",
      errors: [{ messageId: "invalidContext" }],
      name: "Invalid context value"
    },
    {
      code: "// TODO: [low] [feature] Missing context",
      errors: [{ messageId: "invalidContext" }],
      name: "Missing context tag"
    },
    {
      code: "// TODO: [low] Missing type and context",
      errors: [{ messageId: "invalidType" }],
      name: "Missing type and context tags"
    },
    {
      code: "// TODO: Missing all classification tags",
      errors: [{ messageId: "invalidPriority" }],
      name: "Missing all classification tags"
    },
    {
      code: "// TODO: 🟩 ✨ 🎨 Using old emoji format",
      errors: [{ messageId: "invalidPriority" }],
      name: "Old emoji-based format should fail"
    }
  ]
});

console.log("All tests passed!");
