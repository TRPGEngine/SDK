/**
 * 判定是否为一个合法的字符串
 * 合法的定义是类型为字符串且长度大于0
 */
export function isValidString(input: any): boolean {
  return typeof input === 'string' && input.length > 0;
}
