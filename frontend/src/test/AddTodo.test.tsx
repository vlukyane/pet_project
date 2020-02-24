import React from "react";
import ReactDOM from "react-dom";
import * as renderer from "react-test-renderer";
import {AddTodo} from "../todos/components/TodoList/components/AddTodo/AddTodo";
import {TextField} from '@material-ui/core';
import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

describe('testing todo header component', () => {

    let wrapper: any;
    const setState = jest.fn();
    let useStateSpy = jest.spyOn(React, 'useState');
    // @ts-ignore
    useStateSpy.mockImplementation((init: any) => [init, setState]);

    beforeEach(() => {
        wrapper = shallow(<AddTodo addTodo={jest.fn} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<AddTodo addTodo={jest.fn} />, div)
    });

    it("addTodo renders correctly", () => {
        const tree = renderer
            .create(<AddTodo addTodo={jest.fn}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders an `form` and input', () => {
        expect(wrapper.find('form')).toHaveLength(1);
    });

    it('changes state on form input change', () => {
        wrapper.find(TextField).simulate('change', {target: {value: 'My'}});
        expect(setState).toHaveBeenCalledWith('My');
    });
});


