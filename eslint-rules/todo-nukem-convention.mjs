"use strict";

const VALID_PRIOS = ["low", "medium", "high"];
const VALID_TYPES = ["feature", "fix"];
const VALID_CONTEXTS = ["design", "doc", "test", "perf", "lang", "sec", "update", "optimize", "review"];
const KEYWORDS = ["TODO", "FIXME", "HACK", "NOTE", "XXX", "OPTIMIZE"];
const OPTIONAL_META_KEYS = ["tbd", "scope", "ticket", "until", "assignee", "author", "version", "docs", "block-commit"];

export default {
  meta: {
    type: "problem",
    docs: {
      description: "enforce TODO NUKEM convention with text-based tags in square brackets",
      recommended: false,
      url: "https://github.com/jolution/todo-nukem",
    },
    messages: {
      invalidFormat:
        "TODO must be formatted as 'TODO: [priority] [type] [context] message' where priority is [low], [medium], or [high], type is [feature] or [fix], and context is one of the defined contexts.",
      missingSpace: "Missing space after TODO:",
      invalidPriority: "Invalid priority. Must be [low], [medium], or [high].",
      invalidType: "Invalid type. Must be [feature] or [fix].",
      invalidContext: "Invalid context. Must be one of [design], [doc], [test], [perf], [lang], [sec], [update], [optimize], or [review].",
      invalidMetaBlock: "Meta blocks must be formatted as '[key]' or '[key: value]' with proper spacing.",
    },
    schema: [],
  },
  create(context) {
    const source = context.getSourceCode();
    return {
      Program() {
        for (const comment of source.getAllComments()) {
          const foundKeyword = KEYWORDS.find(kw => comment.value.includes(`${kw}:`));
          if (!foundKeyword) continue;
          
          const regex = new RegExp(`${foundKeyword}:\\s+(.+)`);
          const match = comment.value.match(regex);
          if (!match) {
            context.report({ loc: comment.loc, messageId: "missingSpace" });
            continue;
          }
          
          const content = match[1].trim();
          
          // Extract priority tag [low], [medium], or [high]
          const prioMatch = content.match(/^\[(low|medium|high)\]/);
          if (!prioMatch) {
            context.report({ loc: comment.loc, messageId: "invalidPriority" });
            continue;
          }
          
          const afterPrio = content.substring(prioMatch[0].length).trim();
          
          // Extract type tag [feature] or [fix]
          const typeMatch = afterPrio.match(/^\[(feature|fix)\]/);
          if (!typeMatch) {
            context.report({ loc: comment.loc, messageId: "invalidType" });
            continue;
          }
          
          const afterType = afterPrio.substring(typeMatch[0].length).trim();
          
          // Extract context tag
          const contextMatch = afterType.match(/^\[(design|doc|test|perf|lang|sec|update|optimize|review)\]/);
          if (!contextMatch) {
            context.report({ loc: comment.loc, messageId: "invalidContext" });
            continue;
          }

          // Validate optional meta blocks if present
          const remainingContent = afterType.substring(contextMatch[0].length);
          const metaBlockPattern = /\[(tbd|scope|ticket|until|assignee|author|version|docs|block-commit)(?::\s*([^\]]+))?\]/g;
          let blockMatch;
          
          while ((blockMatch = metaBlockPattern.exec(remainingContent)) !== null) {
            const key = blockMatch[1];
            const value = blockMatch[2];
            
            // Validate that the key is valid
            if (!OPTIONAL_META_KEYS.includes(key)) {
              context.report({ loc: comment.loc, messageId: "invalidMetaBlock" });
              break;
            }
          }
        }
      },
    };
  },
};