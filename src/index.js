import createShades from "colorshades";

const COLORS = new Map();

/* dark color palette */
COLORS.set("--color-dark-violet", "#ADA6CB");
COLORS.set("--color-dark-blue", "#6CC6EC");
COLORS.set("--color-dark-green", "#CDE1CC");
COLORS.set("--color-dark-gray", "#9FA3A4");

/* light color palette */
COLORS.set("--color-light-violet", "#E9E7F1");
COLORS.set("--color-light-blue", "#D8F0FA");
COLORS.set("--color-light-green", "#F2F7F1");
COLORS.set("--color-light-white", "#E9F1F3");

/* grayscale color palette */
COLORS.set("--color-grayscale-black", "#555656");
COLORS.set("--color-grayscale-gray", "#A3A5A6");
COLORS.set("--color-grayscale-white", "#F1F5F6");

/* action color palette */
COLORS.set("--color-action-waring", "#FDEE45");
COLORS.set("--color-action-informational", "#5DDCFC");
COLORS.set("--color-binary-successful", "#3FE87D");
COLORS.set("--color-binary-danger", "#FC2B74");

/* brand color palette*/
COLORS.set("--color-brand-violet", "#7265A6");
COLORS.set("--color-brand-blue", "#009CDF");
COLORS.set("--color-brand-green", "#A9CCA8");

/**
 * luminanceSorter:: ({ luminance: number }, { luminance: number }) -> number
 */
const luminanceSorter = (
    { luminance: luminanceA },
    { luminance: luminanceB }
) => luminanceA - luminanceB;
/**
 * extractorHex:: ({ hex: string }) -> string
 */
const extractorHex = ({ hex: hexadecimal }) => hexadecimal;
/**
 * generateRule:: (string) -> (string, number) -> string
 */
const generateRule = (name) => (hexadecimal, index) => `${name}-${index + 1}: ${hexadecimal};`;
/**
 * combineRules:: (string, string) => string
 */
const combineRules = (rules, rule) => `${rules} ${rule}`;
/**
 * diferent:: string => string => boolean  
 */
const diferent = (value) => (hexadecimal) => hexadecimal !== value;

/**
 * customPropertiesShades:: (string, Map<string, number>) => string
 */
export const customPropertiesShades = (selectors, colors) =>
    `${selectors.join(',')} { ${[...colors.entries()]
        .map(([name, value]) =>
            `${createShades.default(value)
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
