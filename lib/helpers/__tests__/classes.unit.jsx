import classes from '../classes';

describe('classes', () => {
    it('接受一个className', () => {
        const result = classes('a');
        expect(result).toEqual('a');
    });
    it('接受两个className', () => {
        const result = classes('a','b');
        expect(result).toEqual('a b');
    });
    it('接受两个className,其中有undefined', () => {
        const result = classes('a',undefined);
        expect(result).toEqual('a');
    });
    it('接受奇怪的className', () => {
        const result = classes('a',false,null,undefined,'样式');
        expect(result).toEqual('a 样式');
    });
    it('接受零个className', () => {
        const result = classes();
        expect(result).toEqual('');
    });
});