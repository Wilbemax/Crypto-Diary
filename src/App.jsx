import { CryproContextProvider } from './context/crypto-context';
import AppLayout from './components/layout/AppLayout';

export default function App() {
	return (
		<CryproContextProvider>
			<AppLayout/>
		</CryproContextProvider>
	);
}
