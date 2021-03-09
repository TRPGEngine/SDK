/**
 * san check 格式
 *
 * @example
 * - .sc1/1d6
 */
export const scRE = /^\.sc\s*?(\S*)?\/(\S*)?\s*?.*?$/;

/**
 * 投骰检定 格式
 *
 * @example
 * - /ra 斗殴 格斗
 */
export const raRE = /^\/ra\s*?([^\s\-:]+)[\s\-:]?([^\s\-:]*)?\s*?.*?$/;
