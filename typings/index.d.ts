/**
 * @author TMUniversal <me@tmuniversal.eu>
 */

declare module '@tmware/variable-parser' {
  interface VariableParserData {
    [variableName: string]: string | number
  }

  class VariableParser {
    data: VariableParserData
    identifiers: string
    match: RegExp
    identifierRegex: RegExp
    /**
     * Parse in-string variables
     * @param {Object} data key-value object with variables to parse
     * @param {String} identifiers pair of variable identifiers. defaults to {}
     * @returns {VariableParser} a new VariableParser instance
     */
    constructor(data?: VariableParserData, identifiers?: string)
    /**
     * Parse in-string variables.
     * @param {String} input your text
     * @example const Parser = new VariableParser({ users: 69 })
     * Parser.parse("My app has {users} users.")
     * // => "My app has 69 users."
     * @returns {String} parsed input
     */
    parse(input: string): string
    /**
     * Set the data object, this is an override.
     * @param {Object} data Override data
     * @returns {Object} the new data object
     */
    setData(data: VariableParserData): VariableParserData
    /**
     * Update/add properties (uses merge)
     * @param {Object} data Update data
     * @returns {Object} the new data object
     */
    updateData(data: VariableParserData): VariableParserData
  }

  export = VariableParser
}
