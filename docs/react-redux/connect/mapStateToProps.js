import { wrapMapToPropsConstant, wrapMapToPropsFunc } from './wrapMapToProps';

// 如果 `MapStateToProps` 是函数
export function whenMapStateToPropsIsFunction(mapStateToProps) {
  return typeof mapStateToProps === 'function'
    ? wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps')
    : undefined;
}

// 如果未提供 `MapStateToProps` 参数
export function whenMapStateToPropsIsMissing(mapStateToProps) {
  return !mapStateToProps ? wrapMapToPropsConstant(() => ({})) : undefined;
}

export default [whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing];
