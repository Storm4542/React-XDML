import * as React from 'react';
import Icon from '../icon';
import {mount} from 'enzyme';
import * as renderer from 'react-test-renderer';

describe('icon', () => {
    it('render successfully', () => {
        const json = renderer.create(<Icon name='wechat'/>).toJSON();
        expect(json).toMatchSnapshot();
    });
    it('onClick', () => {
        let fn = jest.fn();
        const component = mount(<Icon name='wechat' onClick={fn}/>);
        component.find('svg').simulate('click');
        expect(fn).toBeCalled();
    });
});