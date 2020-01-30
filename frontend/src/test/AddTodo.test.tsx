import React from "react";
import ReactDOM from "react-dom";
import * as renderer from "react-test-renderer";
import {AddTodo} from "../todos/components/TodoList/components/AddTodo/AddTodo";
import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('testing todo header component', () => {


    it("SubjectToBeTested renders correctly", () => {
        const tree = renderer
            .create(<AddTodo content={'kek'} addTodo={jest.fn}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders an `form`', () => {
        const wrapper = mount(<AddTodo content={'kek'} addTodo={jest.fn} />);
        expect(wrapper.find('form')).toHaveLength(1);
    });

    it('changes state on form input change', () => {
        const wrapper = mount(<AddTodo content={'kek'} addTodo={jest.fn} />);
        wrapper.find('input').simulate('change', {target: {value: 'My new value'}});
        expect(wrapper.find('input').prop('value')).toEqual(
            'My new value',
        );
    });


    it('let me pass', () => {
        expect(1).toEqual(1);
    });

    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<AddTodo content={'kek'} addTodo={jest.fn} />, div)
    });
});


