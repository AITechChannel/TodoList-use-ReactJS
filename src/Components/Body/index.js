import { useState, useRef, useReducer, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faCaretRight } from '@fortawesome/free-solid-svg-icons';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function Body() {
    const inputElementObj = useRef();
    const localStorageData = JSON.parse(localStorage.getItem('key'));
    const initState = localStorageData ?? {
        inputValue: '',
        lists: [],
        disabled: [],
    };

    const INPUT = 'input';
    const ADD = 'add';
    const DISABLE = 'disable';
    const REMOVE = 'remove';
    const ENABLE = 'enable';

    const onInput = (payload) => {
        return {
            type: INPUT,
            payload,
        };
    };

    const onAdd = (payload) => {
        return {
            type: ADD,
            payload,
        };
    };

    const onDisable = (payload) => {
        return {
            type: DISABLE,
            payload,
        };
    };

    const onEnable = (payload) => {
        return {
            type: ENABLE,
            payload,
        };
    };

    const onRemove = (payload) => {
        return {
            type: REMOVE,
            payload,
        };
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case INPUT:
                return {
                    ...state,
                    inputValue: action.payload,
                };
            case ADD:
                // const data = {
                //     ...state,
                //     inputValue: '',
                //     lists: [...state.lists, action.payload],
                // };
                // const dataJson = JSON.stringify(data);
                // localStorage.setItem('key', dataJson);
                return {
                    ...state,
                    inputValue: '',
                    lists: [...state.lists, action.payload],
                };
            case DISABLE || REMOVE:
                return {
                    ...state,
                    lists: [...state.lists],
                    disabled: [...state.disabled, ...state.lists.splice(action.payload, 1)],
                };
            case ENABLE || REMOVE:
                const newDisabled = state.disabled.filter((value) => value !== action.payload);
                console.log(newDisabled);
                console.log(action.payload);
                return {
                    ...state,
                    lists: [...state.lists],
                    disabled: newDisabled,
                };
            case REMOVE:
                const newLists = state.lists;
                state.lists.splice(action.payload, 1);
                return {
                    ...state,
                    lists: newLists,
                };
        }
    };

    const [state, dispatch] = useReducer(reducer, initState);

    const dataJson = JSON.stringify(state);
    localStorage.setItem('key', dataJson);

    const { inputValue, lists } = state;

    const handleOnChange = (payload) => {
        dispatch(onInput(payload));
    };

    const handleAdd = (payload) => {
        inputElementObj.current.focus();
        if (inputValue.trim() !== '') {
            dispatch(onAdd(payload));
        }
    };

    const handleDisable = (item, index) => {
        const liElement = $$('li');
        liElement.forEach((list) => {
            if (list.innerText === item) {
                console.log(list.className);
                if (list.className !== 'disabled') {
                    list.classList.add('disabled');
                    dispatch(onDisable(index));
                    console.log('dis');
                } else {
                    list.classList.remove('disabled');
                    dispatch(onEnable(item));
                }
            }
        });
    };

    const handleRemove = (item, index) => {
        dispatch(onRemove(index));
        dispatch(onEnable(item));
    };

    useEffect(() => {
        const handleEnterBtn = (e) => {
            if (e.keyCode === 13 && inputValue.trim() !== '') {
                handleAdd(inputValue);
            }
        };

        inputElementObj.current.addEventListener('keydown', handleEnterBtn);

        return () => {
            inputElementObj.current.removeEventListener('keydown', handleEnterBtn);
        };
    });
    useEffect(() => {
        state.disabled.forEach((item) => {
            const liElement = $$('li');
            liElement.forEach((list) => {
                if (list.innerText === item) {
                    list.classList.add('disabled');
                }
            });
        });
    });

    return (
        <div className="body">
            {console.log('render')}
            <div className="container">
                <div className="control">
                    <input ref={inputElementObj} value={inputValue} onChange={(e) => handleOnChange(e.target.value)} />
                    <button onClick={() => handleAdd(inputValue)}>Add</button>
                </div>
                <ul className="content">
                    {lists.map((item, index) => (
                        <div className="content__list">
                            <li key={index} onClick={() => handleDisable(item, index)}>
                                <span>
                                    <FontAwesomeIcon icon={faCaretRight} />
                                </span>
                                {item}
                            </li>
                            <span className="trash" onClick={() => handleRemove(item, index)}>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </span>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Body;
