import React from "react";
import ReactDOM from "react-dom";
import * as renderer from "react-test-renderer";
import {AddTodo} from "../todos/components/TodoList/components/AddTodo/AddTodo";

describe('testing todo header component', () => {



    it("SubjectToBeTested renders correctly", () => {
        const tree = renderer
            .create(<AddTodo content={'kek'} addTodo={jest.fn}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('let me pass', () => {
        expect(1).toEqual(1);
    });

    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<AddTodo content={'kek'} addTodo={jest.fn} />, div)
    });
});


