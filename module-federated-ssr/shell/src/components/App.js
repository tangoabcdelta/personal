import {Helmet} from 'react-helmet';

// const RemoteContent = React.lazy(() => import('remove1/Content'));


export default () => {
    <div>
        <Helmet>
            <title>SSR MF Example</title>
        </Helmet>
        <h1>Module Federation with Server Side Rendering Example</h1>
        <h2>Shell Application</h2>
        <button onClick={() => alert('Check if the button is interactable or not')}>
            Click me
        </button>
        
    </div>
}