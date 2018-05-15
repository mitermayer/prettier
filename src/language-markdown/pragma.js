"use strict";

const parseFrontmatter = require("../utils/front-matter");

const pragmas = ["format", "prettier"];

function startWithPragma(text) {
  const pragma = `@(${pragmas.join("|")})`;
  const regex = new RegExp(
    [
      `<!--\\s*${pragma}\\s*-->`,
      `<!--.*\n[\\s\\S]*(^|\n)[^\\S\n]*${pragma}[^\\S\n]*($|\n)[\\s\\S]*\n.*-->`
    ].join("|"),
    "m"
  );
  const matched = text.match(regex);
  return matched && matched.index === 0;
}

module.exports = {
  startWithPragma,
  hasPragma: text => startWithPragma(parseFrontmatter(text).content.trimLeft()),
  insertPragma: text => {
    const extracted = parseFrontmatter(text);
    const pragma = `<!-- @${pragmas[0]} -->`;
    return extracted.frontmatter
      ? `${extracted.frontmatter}\n\n${pragma}\n\n${extracted.content}`
      : `${pragma}\n\n${extracted.content}`;
  }
};
