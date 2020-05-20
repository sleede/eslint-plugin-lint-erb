/**
 * @fileoverview Allow eslinting, erb files.
 * @author original credits to https://github.com/s4san/eslint-plugin-lint-erb
 */

const erbExpression = new RegExp('<%(.*?)\%>', 'g');

// export processor
module.exports = {
  processors: {
    'js-erb': {
      preprocess: function (text, filename) {
        const lintableText = text
          .replace(erbExpression, "'Ignored Ruby Expression.'");

        return [{ text: lintableText, filename }];
      },
      postprocess: function (messages, filename) {
        return [].concat(...messages);
      },
      supportsAutofix: true
    }
  }
};
