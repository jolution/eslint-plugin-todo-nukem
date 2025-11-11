"use strict";

const VALID_PRIOS = ["🟩", "🔶", "🔴"];
const VALID_TYPES = ["✨", "🐛"];
const VALID_CONTEXTS = ["🎨", "📝", "🧪", "🚀", "🌐", "🛡", "🔄", "🛠", "👀"];
const KEYWORDS = ["TODO", "FIXME", "HACK", "NOTE", "XXX", "OPTIMIZE"];
const OPTIONAL_BLOCK_EMOJIS = ["💬", "🎯", "🎫", "📅", "👤", "✍️", "🔖", "📚", "🛑"];

export default {
  meta: {
    type: "problem",
    docs: {
      description: "enforce exactly one space and a valid priority emoji after TODO:",
      recommended: false,
      url: "https://github.com/jolution/todo-nukem",
    },
    messages: {
      invalidFormat:
        "TODO must be formatted as 'TODO:<space><prio><space><type><space><context><space>' where prio is one of 🟩, 🔶, 🔴, type is one of ✨, 🐛, and context is one of 🎨, 📝, 🧪, 🚀, 🌐, 🛡, 🔄, 🛠, 👀.",
      missingSpace: "Missing space after TODO:",
      invalidSpaces: "Invalid spaces in TODO classification format.",
      invalidEmojis: "Invalid emojis in TODO classification.",
      invalidOptionalBlock: "Optional blocks must be formatted as '[<emoji><space><text>]' with spaces before and after (except at line end).",
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
          
          const regex = new RegExp(`${foundKeyword}: (.+)`);
          const match = comment.value.match(regex);
          if (!match) {
            context.report({ loc: comment.loc, messageId: "missingSpace" });
            continue;
          }
          
          const chars = [...match[1]];
          const [prio, space1, type, space2, ctx, space3] = chars;

          const hasValidSpaces = space1 === ' ' && space2 === ' ' && space3 === ' ';
          if (!hasValidSpaces) {
            context.report({ loc: comment.loc, messageId: "invalidSpaces" });
            continue;
          }

          const isValid = 
            VALID_PRIOS.includes(prio) && 
            VALID_TYPES.includes(type) &&
            VALID_CONTEXTS.includes(ctx);

          if (!isValid) {
            context.report({ loc: comment.loc, messageId: "invalidEmojis" });
            continue;
          }

          // Validate optional blocks
          const fullText = match[1];
          const optionalBlockPattern = /\[([^\]]+)\]/g;
          let blockMatch;
          
          while ((blockMatch = optionalBlockPattern.exec(fullText)) !== null) {
            const blockContent = blockMatch[1];
            const blockStartIndex = blockMatch.index;
            const blockEndIndex = blockStartIndex + blockMatch[0].length;
            const blockChars = [...blockContent];
            
            const hasSpaceBefore = blockStartIndex <= 6 || fullText[blockStartIndex - 1] === ' ';
            const hasSpaceAfter = blockEndIndex >= fullText.length || fullText[blockEndIndex] === ' ';
            const hasNoInternalSpaces = !blockContent.startsWith(' ') && !blockContent.endsWith(' ');
            const hasValidFormat = 
              OPTIONAL_BLOCK_EMOJIS.includes(blockChars[0]) && 
              blockChars[1] === ' ' && 
              blockChars.length > 2;
            
            if (!hasSpaceBefore || !hasSpaceAfter || !hasNoInternalSpaces || !hasValidFormat) {
              context.report({ loc: comment.loc, messageId: "invalidOptionalBlock" });
              break;
            }
          }
        }
      },
    };
  },
};