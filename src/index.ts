/// <reference path="../typings/index.d.ts" />
/**
 * @author TMUniversal <me@tmuniversal.eu>
 */

export interface VariableParserData {
  [variableName: string]: string | number
}

const escape = (string: string): string => string.replace(/./g, '\\$&')

export class VariableParser {
  public data!: VariableParserData
  public identifiers!: [begin: string, end: string]
  public match!: RegExp
  public identifierRegex!: RegExp
  /**
   * Parse in-string variables
   * @param {Object} data key-value object with variables to parse
   * @param {String|String[]} identifiers pair of characters to identify variables by. (default: '{}')
   *
   *  this can be either a String,
   *  resulting in the first two characters becoming the identifiers,
   *
   *  or a tuple of two strings. The two strings will be the identifiers.
   */
  public constructor (data?: VariableParserData, identifiers: string | [begin: string, end: string] = '{}') {
    this.data = data ?? {}
    this.identifiers = [identifiers[0], identifiers[1]]
    this.match = new RegExp(`${escape(this.identifiers[0])}[^${escape(this.identifiers[0])}${escape(this.identifiers[1])}]+${escape(this.identifiers[1])}`, 'gu')
    this.identifierRegex = new RegExp(`[${escape(this.identifiers[0])}${escape(this.identifiers[1])}]`, 'gu')
  }

  /**
   * Parse in-string variables.
   * @param {String} input your text
   * @example const Parser = new VariableParser({ users: 69 })
   * Parser.parse("My app has {users} users.")
   * // => "My app has 69 users."
   * @returns {String} parsed input
   */
  public parse (input: string): string {
    let output = String(input)
    // behaves differently with 'global' flag, which is provided here.
    // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
    const vars = output.match(this.match)
    if (!vars || !vars[0]) {
      return input
    }
    vars.forEach(element => {
      const key = element.replace(this.identifierRegex, '')
      if (Object.getOwnPropertyNames(this.data).includes(key)) {
        output = output.replace(`${this.identifiers[0]}${key}${this.identifiers[1]}`, this.data[key].toString())
      }
    })
    return output
  }

  /**
   * Set the data object, this is an override.
   * @param {Object} data Override data
   * @returns {Object} the new data object
   */
  public setData (data: VariableParserData): VariableParserData {
    this.data = data
    return this.data
  }

  /**
   * Update/add properties (uses merge)
   * @param {Object} data Update data
   * @returns {Object} the new data object
   */
  public updateData (data: VariableParserData): VariableParserData {
    this.data = { ...this.data, ...data }
    return this.data
  }
}

module.exports = VariableParser
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
module.exports.default = VariableParser
