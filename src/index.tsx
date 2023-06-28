import * as esbuild from 'esbuild-wasm';
import { useState, useEffect } from 'react';
//import ReactDOM from 'react-dom'
//import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom/client';

/*const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);*/
const el = document.getElementById("root");
//Important - Due to a bug in the DefinitelyTyped ReactDOM definitions, you need to add the ! operator here:
const root = ReactDOM.createRoot(el!);

const App = () => {
    const [input, setInput] = useState(''); //The user-input code
    const [code, setCode] = useState(''); //The transpiled and bundled code to show in the <pre> element

    const startService = async () => {
        const service = await esbuild.initialize({
            worker: true,
            wasmURL: '/esbuild.wasm'
        }) //letting esbuild fetch the binary we placed inside /public
        //This service object is the one that'll transpile, bundle our code
        //This service should be called only once -> #useEffect hook
        console.log("hi" + service);
    }

    useEffect(() => {
        startService();
    }, []); //emptyArray => do this only once

    const onClick = () => {
        console.log(input);
        //Do the transpiling of this (JS) code
    }

    return (
        <div>
            <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <pre>{code}</pre>
        </div>
    );
};

root.render(<App />);