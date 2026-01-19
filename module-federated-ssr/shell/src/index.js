import * as ReactDomClient from 'react-dom/client';
import App from './components/App';

const render = App => {
    const root  = document.getElementById('root');
    ReactDomClient.hydrateRoot(root, <App />);
}

render(App);