/**
 * @fileoverview Allow eslinting, erb files.
 * @author original credits to https://github.com/s4san/eslint-plugin-lint-erb
 */

const erbString = new RegExp('\'<%(.*?)%>\'', 'g');
const erbExpression = new RegExp('<%(.*?)%>', 'g');
const erbBlock = new RegExp('<%([sS])*?%>([sS])*?<%([sS])*?(end|END)([sS])*?%>', 'g');

// import processors
module.exports.processors = {
  '.erb': {
    preprocess: function (text, filename) {
      const lintableText = text
        .replace(erbString, '\'Ignored Ruby String.\'')
        .replace(erbBlock, '/* \'Ignored Ruby Block.\' */')
        .replace(erbExpression, '\'Ignored Ruby Expression.\'');

      return [lintableText];
    },
    postprocess: function (messages, filename) {
      return messages[0];
    }
  }
};

