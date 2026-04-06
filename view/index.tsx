import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './app';

const reactRoot = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(reactRoot).render(
	<>
		<Router>
				<Routes>
					<Route path='/*' element={<App />} />
				</Routes>
		</Router>
	</>
);