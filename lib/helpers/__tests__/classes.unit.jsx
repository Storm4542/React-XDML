import {classes, scopedClassMaker} from '../classes';

describe('classes', () => {
    it('接受一个className', () => {
        const result = classes('a');
        expect(result).toEqual('a');
    });
    it('接受两个className', () => {
        const result = classes('a', 'b');
        expect(result).toEqual('a b');
    });
    it('接受两个className,其中有undefined', () => {
        const result = classes('a', undefined);
        expect(result).toEqual('a');
    });
    it('接受奇怪的className', () => {
        const result = classes('a', false, null, undefined, '样式');
        expect(result).toEqual('a 样式');
    });
    it('接受零个className', () => {
        const result = classes();
        expect(result).toEqual('');
    });
});
describe('测试 scopeClass', () => {
    it('接收字符串或者对象', () => {
        const sc = scopedClassMaker('fui-layout');
        expect(sc('')).toEqual('fui-layout');
        expect(sc('header')).toEqual('fui-layout-header');
        expect(sc({y: true, z: false})).toEqual('fui-layout-y');
        expect(sc({y: true, z: true})).toEqual('fui-layout-y fui-layout-z');
        expect(sc({y: true, z: false}, {extra: 'n'})).toEqual('fui-layout-y n');
    });
});
