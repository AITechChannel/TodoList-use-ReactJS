import { useState, useReducer, useEffect, useRef } from 'react';

function Content() {
    const liRef = useRef();
    const SET = 'onChange Input';
    const ADD = 'add list';
    const DEL = 'del item';

    const set = (value) => {
        return {
            type: SET,
            value,
        };
    };

    const add = (value) => {
        return {
            type: ADD,
            value,
        };
    };

    const del = (value) => {
        return {
            type: DEL,
            value,
        };
    };

    const initState = {
        input: '',
        inputs: [],
    };

    const reducer = (state, action) => {
        console.log(action);
        console.log(state);
        switch (action.type) {
            case SET:
                return {
                    ...state,
                    input: action.value,
                };
            case ADD:
                return {
                    ...state,
                    inputs: [...state.inputs, action.value],
                };
            case DEL:
                const newValue = [...state.inputs];
                newValue.splice(action.value, 1);
                return {
                    ...state,
                    inputs: newValue,
                };

            default:
                throw new Error('loi');
        }
    };

    const [list, dispatch] = useReducer(reducer, initState);

    const { input, inputs } = list;

    console.log(list);

    return (
        <div>
            <input value={input} onChange={(e) => dispatch(set(e.target.value))} />
            <button onClick={() => dispatch(add(input))}>Add</button>

            {inputs.map((input, index) => (
                <li onClick={() => dispatch(del(index))}>{input}</li>
            ))}
        </div>
    );
}

export default Content;
