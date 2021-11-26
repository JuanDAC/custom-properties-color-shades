import createShades from "colorshades";

/**
 * luminanceSorter:: ({ luminance: number }, { luminance: number }) -> number
 */
export const luminanceSorter = (
    { luminance: luminanceA },
    { luminance: luminanceB }
) => luminanceA - luminanceB;
/**
 * extractorHex:: ({ hex: string }) -> string
 */
export const extractorHex = ({ hex: hexadecimal }) => hexadecimal;
/**
 * generateRule:: (string) -> (string, number) -> string
 */
export const generateRule = (name) => (hexadecimal, index) => `${name}-${index + 1}: ${hexadecimal};`;
/**
 * combineRules:: (string, string) => string
 */
export const combineRules = (rules, rule) => `${rules} ${rule}`;
/**
 * diferent:: string => string => boolean  
 */
export const diferent = (value) => (hexadecimal) => hexadecimal !== value;

/**
 * customPropertiesShades:: (string, Map<string, number>) => string
 */
export const customPropertiesShades = (selectors, colors) =>
    `${selectors.join(',')} { ${[...colors.entries()]
        .map(([name, value]) =>
            `${createShades(value)
                .colors
                .sort(luminanceSorter)
                .map(extractorHex)
                .filter(diferent(value))
                .map(generateRule(name))
                .reduce(combineRules,)
            } ${name}: ${value};`
        ).join()} }`;

export default customPropertiesShades;

// console.log(customPropertiesShades([':root', 'power-styles'], COLORS));
