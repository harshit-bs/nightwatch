const fs = require('fs');
const stackTraceParser = require('stacktrace-parser');
const AssertionError = require('assertion-error');
const {filterStackTrace} = require('./stackTrace.js');
const alwaysDisplayError = require('./alwaysDisplayError.js');

/**
 * Read the User file from the stackTrace and create a string with highlighting the line with error
 * @param {Error} err
 */ 
function simpleBeautifyStackTrace(err, errStackPassed = false, modulepath) {
  if ((err instanceof AssertionError) || alwaysDisplayError(err) || errStackPassed) {
    try {
      const errorStack = errStackPassed ? err : err.stack;

      const parsedStacks = stackTraceParser.parse(filterStackTrace(errorStack));
      const parsedStack = modulepath ? parsedStacks.find(o => o.file === modulepath) : parsedStacks[0];

      const file = fs.readFileSync(parsedStack.file, 'utf-8');
      const errorLinesofFile = file.split(/\r?\n/);
      
      const result = {
        filename: parsedStack.file,
        line_number: parsedStack.lineNumber,
        codeSnippet: []
      };

      errorLinesofFile.reduce(function(lines, newLine, lineIndex) {
        const currentLine = lineIndex + 1;
        if (currentLine <= (parsedStack.lineNumber + 2) && currentLine >= (parsedStack.lineNumber - 2)) {
          result.codeSnippet.push({
            line_number: currentLine, code: newLine
          })
        }
      }, '');


      return result;
    } catch (err) {
      return '';
    }
  }

  return '';
}

module.exports = simpleBeautifyStackTrace;

