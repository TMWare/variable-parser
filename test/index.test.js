const VariableParser = require('../dist/index')

const TestParser = new VariableParser()

describe('variable-parser', () => {
  test('.updateData should return data', () => {
    const data = TestParser.updateData({ testVar: 55 })
    expect(data).toMatchObject({ testVar: 55 })
  })

  test('.parse should successfully parse', () => {
    TestParser.setData({ testVar: 55 })
    const text = TestParser.parse('testVar is {testVar}')
    expect(text).toBe('testVar is 55')
  })

  test('.parse should successfully parse the same variable multiple times', () => {
    TestParser.setData({ testVar: 55 })
    const text = TestParser.parse('testVar is {testVar}, again, it\'s {testVar}')
    expect(text).toBe('testVar is 55, again, it\'s 55')
  })

  test('.parse should successfully parse multiple variables', () => {
    TestParser.setData({ testVar: 55, test2: 't' })
    const text = TestParser.parse('testVar is {testVar}, test2 is {test2}')
    expect(text).toBe('testVar is 55, test2 is t')
  })

  test('.parse should not fail on invalid variables', () => {
    const text = TestParser.parse('{doesNotExist} test')
    expect(text).toBe('{doesNotExist} test')
  })

  test('.parse should not fail on missing variables', () => {
    const text = TestParser.parse('test')
    expect(text).toBe('test')
  })

  test('.parse should parse with custom variable identifiers', () => {
    const AnotherTestParser = new VariableParser({ testVar: 1 }, '[]')
    expect(AnotherTestParser.parse('[testVar] test')).toBe('1 test')
  })

  test('wrong identifiers should fail', () => {
    let error
    try {
      const AnotherTestParser = new VariableParser({}, '{{}}')
    } catch (err) {
      error = err || new Error()
    }
    expect(error.message || error).toBe('"identifiers" must have a length of 2')
  })
})
