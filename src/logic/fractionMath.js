/**
 * ══════════════════════════════════════════════════════════════
 * Exact Fraction Arithmetic - No Floating Point Errors
 * ══════════════════════════════════════════════════════════════
 * Used for precise Islamic inheritance calculations where even
 * small rounding errors are unacceptable.
 */

/**
 * GCD using Euclidean algorithm
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
export const gcd = (a, b) => {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a || 1;
};

/**
 * LCM (Least Common Multiple)
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
export const lcm = (a, b) => {
  const g = gcd(a, b);
  return (a / g) * b;
};

/**
 * Fraction class for exact arithmetic
 */
export class Fraction {
  constructor(numerator, denominator = 1) {
    if (denominator === 0) {
      throw new Error("Denominator cannot be zero");
    }
    
    // Normalize negative fractions
    if (denominator < 0) {
      numerator = -numerator;
      denominator = -denominator;
    }
    
    // Reduce to simplest form
    const g = gcd(numerator, denominator);
    this.num = Math.round(numerator / g);
    this.den = Math.round(denominator / g);
  }

  /**
   * Add two fractions
   * @param {Fraction} other 
   * @returns {Fraction}
   */
  add(other) {
    const newNum = this.num * other.den + other.num * this.den;
    const newDen = this.den * other.den;
    return new Fraction(newNum, newDen);
  }

  /**
   * Multiply two fractions
   * @param {Fraction} other 
   * @returns {Fraction}
   */
  multiply(other) {
    return new Fraction(this.num * other.num, this.den * other.den);
  }

  /**
   * Multiply by an integer
   * @param {number} scalar 
   * @returns {Fraction}
   */
  scale(scalar) {
    return new Fraction(this.num * scalar, this.den);
  }

  /**
   * Divide by another fraction
   * @param {Fraction} other 
   * @returns {Fraction}
   */
  divide(other) {
    return new Fraction(this.num * other.den, this.den * other.num);
  }

  /**
   * Convert to decimal
   * @returns {number}
   */
  toDecimal() {
    return this.num / this.den;
  }

  /**
   * Get percentage
   * @returns {number}
   */
  toPercentage() {
    return (this.num / this.den) * 100;
  }

  /**
   * Format as string
   * @returns {string}
   */
  toString() {
    if (this.den === 1) return `${this.num}`;
    return `${this.num}/${this.den}`;
  }

  /**
   * Check if equal to another fraction
   * @param {Fraction} other 
   * @returns {boolean}
   */
  equals(other) {
    return this.num === other.num && this.den === other.den;
  }

  /**
   * Check if zero
   * @returns {boolean}
   */
  isZero() {
    return this.num === 0;
  }

  /**
   * Clone this fraction
   * @returns {Fraction}
   */
  clone() {
    return new Fraction(this.num, this.den);
  }
}

/**
 * Create fraction from decimal (approximate)
 * @param {number} decimal 
 * @param {number} maxDenominator 
 * @returns {Fraction}
 */
export const fromDecimal = (decimal, maxDenominator = 10000) => {
  let bestNum = 1;
  let bestDen = 1;
  let bestError = Math.abs(decimal - 1);

  for (let den = 1; den <= maxDenominator; den++) {
    const num = Math.round(decimal * den);
    const error = Math.abs(decimal - num / den);
    
    if (error < bestError) {
      bestNum = num;
      bestDen = den;
      bestError = error;
      
      if (error < 0.0000001) break;
    }
  }

  return new Fraction(bestNum, bestDen);
};

/**
 * Sum an array of fractions
 * @param {Fraction[]} fractions 
 * @returns {Fraction}
 */
export const sumFractions = (fractions) => {
  if (fractions.length === 0) return new Fraction(0);
  return fractions.reduce((sum, f) => sum.add(f), new Fraction(0));
};

/**
 * Find common denominator for array of fractions
 * @param {Fraction[]} fractions 
 * @returns {number}
 */
export const commonDenominator = (fractions) => {
  if (fractions.length === 0) return 1;
  return fractions.reduce((lcmVal, f) => lcm(lcmVal, f.den), 1);
};
