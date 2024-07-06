
/**
 * Formats a number to two decimal places with proper rounding.
 * 
 * @param value - The number to be formatted.
 * @returns The formatted number rounded to two decimal places.
 */
export const formatRounding = (value: number): number => {
    // Round the value to two decimal places using EPSILON to avoid floating point issues
    const roundedValue = Math.round((value + Number.EPSILON) * 100) / 100;

    // Check if the rounded value is NaN, and if so, recursively call the function with 0
    if (isNaN(roundedValue)) {
        return formatRounding(0);
    }

    // Return the rounded value
    return roundedValue;
}
