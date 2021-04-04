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

/**
 * 奖励骰 / 惩罚骰
 *
 * @example
 * - /rab5# 斗殴 格斗 50
 * - /rab5# 斗殴 格斗
 * - /rab5# 取悦
 * - /rab 取悦 50
 * - /rab 取悦
 */
export const rabpRE = /^\/ra[bp](\d*?#)?\s*?([^\s\-:]+)[\s\-:]?([^\d\s\-:]*)?(.*?)$/;
