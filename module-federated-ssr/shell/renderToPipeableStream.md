# renderToPipeableStream

`renderToPipeableStream` is a React DOM server-side API used for streaming server-side rendering (SSR) in Node.js environments. It allows React components to be rendered to HTML incrementally and streamed to the client as they become ready, improving performance and user experience.

## Key Features and Usage

- Streaming HTML: Unlike the older `renderToString` API, which waits for the entire app to render before sending anything, `renderToPipeableStream` sends the HTML in chunks (the "shell" first), allowing the browser to display content faster.
- Suspense Support: It fully supports React's `Suspense` component on the server, meaning components can fetch data asynchronously without blocking the initial render of the whole page. The missing content is "popped in" when ready using inline `<script>` tags.
- Node.js Specific: This API is specific to Node.js streams. For modern edge runtime environments (like Deno or Cloudflare Workers) that use Web Streams, the `renderToReadableStream` API should be used instead.
- Performance: It optimizes server resource usage and allows for immediate user feedback.

### Basic Implementation Example

The API returns an object with `pipe` and `abort` methods. The `pipe` method is used in a callback (typically `onShellReady` or `onAllReady`) to send the output to the response stream.

```javascript
import { renderToPipeableStream } from 'react-dom/server';
// ... other imports

app.get('/', (req, res) => {
  const { pipe, abort } = renderToPipeableStream(<App />, {
    // Optional: add scripts that should load before hydration
    bootstrapScripts: ['/main.js'],
    onShellReady() {
      // The shell is ready, you can start piping the stream to the response
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/html');
      pipe(res);
    },
    onShellError(error) {
      // Handle errors that happen during the shell rendering
      console.error(error);
      res.statusCode = 500;
      res.send('<h1>An error occurred</h1>');
    },
    onAllReady() {
      // Optional: called when all content (including suspended parts) is ready.
      // Useful for static generation or crawlers.
      // If used with `onShellReady`, you might manually manage the stream ends (e.g., res.end(footer))
    }
  });

  // Optional: handle request timeouts or other abort signals
  // setTimeout(() => abort(), 5000);
});

```

For more details and advanced usage patterns, refer to the official [React documentation](https://react.dev/reference/react-dom/server/renderToPipeableStream).

- [1] <https://dev.to/ajayupreti/react-rendertopipeablestream-with-express-a-deep-dive-into-server-side-streaming-527n>
- [2] <https://react.dev/reference/react-dom/server/renderToPipeableStream>
- [3] <https://medium.com/simform-engineering/how-to-implement-ssr-server-side-rendering-in-react-18-e49bc43e9531>
- [4] <https://it.react.dev/reference/react-dom/server/renderToPipeableStream>
- [5] <https://legacy.reactjs.org/docs/react-dom-server.html>
- [6] <https://medium.com/@shubhankarmisra.bit/implementing-streaming-in-react-with-rendertopipeablestream-550864bee044>
- [7] <https://github.com/reactwg/react-18/discussions/22>
- [8] <https://github.com/reactjs/reactjs.org/issues/4510>
- [9] <https://www.reddit.com/r/reactjs/comments/1139x7n/why_does_rendertopipeablestream_insert_bootstrap/>
- [10] <https://react.dev/reference/react-dom/server/renderToPipeableStream>
- [11] <https://legacy.reactjs.org/docs/react-dom-server.html>
