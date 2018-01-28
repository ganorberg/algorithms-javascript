/* 
 * Since XML is very verbose, you are given a way of encoding it where each tag 
 * gets mapped to a pre-defined integer value. The language/grammer is as 
 * follows:
 * 
 * Element -> Tag Attributes END Children END
 * Attribute -> Tag Value
 * END -> 0
 * Tag -> some predefined mapping to int
 * Value -> string value
 * 
 * For example, the following XML might be converted into the compressed string 
 * below (assuming a mapping of family -> 1, person -> 2, firstName -> 3, 
 * lastName -> 4, state -> 5).
 * 
 * <family lastName="McDowell" state="CA">
 *   <person firstName="Gayle">Some Message</person>
 * </family>
 * 
 * Becomes:
 * 
 * 1 4 McDowell 5 CA 0 2 3 Gayle 0 Some Message 0 0
 * 
 * Write code to print the encoded version of an XML element (passed in as a 
 * string).
 * 
 * ASSUMPTIONS
 * - whitespace is only spaces, not tabs/new lines
 * - accept single space at end to simplify logic. otherwise trim or check last.
 * - syntactically perfect XML. no error checking.
 * - assume all attributes have value in key-value pair. No standalones.
 * - do not include quotes from strings
 */
function encodeXML(XML, map) {
  let encoding = "";
  const EMPTY_CONTEXT = "empty";
  const TAG_NAME = "tag name";
  const ATTRIBUTE = "attribute";
  const VALUE = "value";
  const CLOSING_TAG = "closing tag";
  const END = "0 ";

  // Assume first character is opening tag and start loop at index 1
  let context = TAG_NAME;
  let currentString = "";

  for (let i = 1; i < XML.length; i++) {
    const char = XML[i];
    const nextChar = XML[i + 1];

    if (context === CLOSING_TAG && char !== ">") { continue; }
    if (char === "<" && nextChar !== "/") {
      context = TAG_NAME;
    } else if (char === "<" && nextChar === "/") {
      context = CLOSING_TAG;
    } else if (char === ">") {
      encoding += END;
      context = EMPTY_CONTEXT;
    } else if (context === TAG_NAME) {
      if (isLetter(char)) { currentString += char; }
      else if (char === " ") {
        encoding += map[currentString] + " ";
        currentString = "";
        context = ATTRIBUTE;
      }
    } else if (context === ATTRIBUTE) {
      if (isLetter(char)) { currentString += char; }
      else if (char === "=") {
        encoding += map[currentString] + " ";
        currentString = "";
        context = VALUE;

        // skip beginning quote
        i++;
      }
    } else if (context === VALUE) {
      if (isLetter(char)) { encoding += char; }
      else if (char === '"') {
        encoding += " ";
        if (nextChar === " ") { context = ATTRIBUTE; }
      }
    } else if (context === EMPTY_CONTEXT) {
      encoding += char;
      if (nextChar === "<") { encoding += " "; }
    }
  }

  return encoding;
}

function isLetter(char) {
  return /[a-z]/i.test(char);
}

const map = {
  family: 1,
  person: 2,
  firstName: 3,
  lastName: 4,
  state: 5,
}

const XMLtest = '<family lastName="McDowell" state="CA"><person firstName="Gayle">Some Message</person></family>';

console.log(true, isLetter("g"));
console.log(false, isLetter("0"));
console.log("1 4 McDowell 5 CA 0 2 3 Gayle 0 Some Message 0 0", "\n" + encodeXML(XMLtest, map));