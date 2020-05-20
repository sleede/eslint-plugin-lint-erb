/**
 * @fileoverview Allow eslinting, erb files.
 * @author original credits to https://github.com/s4san/eslint-plugin-lint-erb
 */

const erbString = new RegExp('\'<%(.*?)\%>\'', 'g');
const erbExpression = new RegExp('<%(.*?)\%>', 'g');
const erbBlock = new RegExp('<%(\s|\S)*?\%>(\s|\S)*?<%(\s|\S)*?(end|END)(\s|\S)*?\%>', 'g');

// export processor
module.exports = {
  processors = {
    'js-erb': {
      preprocess: function (text, filename) {
        const lintableText = text
          .replace(erbString, '\'Ignored Ruby String.\'')
          .replace(erbBlock, '/* \'Ignored Ruby Block.\' */')
          .replace(erbExpression, '\'Ignored Ruby Expression.\'');

        return [lintableText];
      },
      postprocess: function (messages, filename) {
        return messages[0];
      },
      supportsAutofix: true
    }
  }
};
