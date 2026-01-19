import express from 'express';
import React from 'react';
import {renderToPipeableStream} from 'react-dom/server';
import { Helmet } from 'react-helmet';


import App from '../src/component/App';

const app = express();
const PORT = 3000;

// 1. Serve Static Assets
app.use('/static', express.static('./dist/client'));


// 2. Universal Rendered

app.get('/*', (req, res) => {
    const helmet = Helmet.renderStatic();
    let didError = false;

    // const stream = renderToPipeableStream(<App />, {
    const { pipe, abort } =  renderToPipeableStream(<App /> , {
        // Optional: add scripts that should load before hydration
        bootstrapScripts: ['/main.js'],
    
        // onAllReady is used for SEO/Crawlers to ensure full content is there
        onAllReady() {
             // The shell is ready, you can start piping the stream to the response
            res.statusCode = didError ? 500 : 200;
            res.setHeader('Content-type', 'text/html');

            // Writing the HTML Document Shell
            // The comments are intended to assist with additional insertion if required
            // e.g. analytics and other scripts
            // Doctype
            res.write(`<!DOCTYPE html><html ${helmet.htmlAttributes.toString()}><head>`);
            // Writing Title
            res.write(`${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}`);
            // Closing the head
            res.write(`</head>`);
            // Body Begins
            res.write(`<body>`);


            // React Root Begins
            res.write(`<div id="root">`);
            // Pipe the React component HTML into the "root" div
            stream.pipe(res);
            // Close the tags and inject the client-side hydration script
            res.write(`</div>`);
            // React Root Ends

            // Any of the deferred or async scripts to be inserted before closing <body> tag
            res.write(`<script async src="http://localhost:3000/static/main.js"></script>`);
            // This is also where you would typically inject the remoteEntry.js scripts
            // from other federated micro-frontends so the client-side can pick them up.


            // close the body
            res.write(`</body>`);
            // close the html
            res.write(`</html>`);
        },

         onShellReady() {
            response.setHeader('content-type', 'text/html');
            pipe(response);
    }  ,
        
        onShellError(err) {
            res.statusCode = 500;
            res.send('<h1>Server Error</h1>');
        },

        onError(err) {
        didError = true;
        console.error(err);
        }

    })
})

if (module.hot) {
    // module.hot.dispose(console.log);
    module.hot.accept ('./index', () => {
        console.log('is hot reloading');
        require('./index')
    });
}

module.exports = app;


