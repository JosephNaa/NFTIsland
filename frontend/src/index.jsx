import 'simplebar/src/simplebar.css';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import ScrollTop from './utils/ScrollTop';

ReactDOM.render(
	<HelmetProvider>
		<BrowserRouter>
			<ScrollTop />
			<App />
		</BrowserRouter>
	</HelmetProvider>,
	document.getElementById('root')
);
