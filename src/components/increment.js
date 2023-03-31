import React from 'react'
import { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement, incrementbyAmount, reset} from './Counter/counter';

const Increase = () => {

    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();
    const [incrementAmount , setIncrementCount] = useState(0);
    const addValue = Number(incrementAmount) || 0
    const resetAll = () => {
        setIncrementCount(0);
        dispatch(reset());
    }

    return (
        <div>
            <p>{count}</p>
            <div>
                <button onClick={() => dispatch(increment())}>+ </button>
                <button onClick={() => dispatch(decrement())}>-</button>
            </div>

            <input type="text" value={incrementAmount} placeholder="Add amount"
                   onChange={(e) => setIncrementCount(e.target.value)}  />

            <div>
                <button onClick={() => dispatch(incrementbyAmount(addValue))}>Add Value</button>
            </div>

            <div>
                <button onClick={() => dispatch(resetAll)}>Reset</button>
            </div>
        </div>
    );
}

export  default  Increase;