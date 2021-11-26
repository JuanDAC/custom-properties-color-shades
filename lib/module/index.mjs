import createShades from"colorshades";export const luminanceSorter=({luminance:luminanceA},{luminance:luminanceB})=>luminanceA-luminanceB;export const extractorHex=({hex:hexadecimal})=>hexadecimal;export const generateRule=name=>(hexadecimal,index)=>`${name}-${index+1}: ${hexadecimal};`;export const combineRules=(rules,rule)=>`${rules} ${rule}`;export const diferent=value=>hexadecimal=>hexadecimal!==value;export const customPropertiesShades=(selectors,colors)=>`${selectors.join(",")} { ${[...colors.entries()].map(([name,value])=>`${createShades(value).colors.sort(luminanceSorter).map(extractorHex).filter(diferent(value)).map(generateRule(name)).reduce(combineRules)} ${name}: ${value};`).join("")} }`;export default customPropertiesShades;