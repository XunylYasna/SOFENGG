const functions = require('./functions')

test('5 dollars to equal 254.35', () => {
    expect(functions.computePeso(5, 50.87)).toBe('254.35')
})

test('50 dollars to equal 2453.5', ()=> {
    expect(functions.computePeso(50, 50.87)).toBe('2543.50')
})

test('1 peso to equal to equal 0.02', () => {
    expect(functions.computeDollar(1, 50.87)).toBe('0.02')
})

test('50 pesos to equal 0.98', () => {
    expect(functions.computeDollar(50, 50.87)).toBe('0.98')
})