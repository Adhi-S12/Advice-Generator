import { useState, useEffect } from 'react';
import './App.css';
import { ReactComponent as Divider } from './assets/images/pattern-divider-mobile.svg';
import { ReactComponent as IconDice } from './assets/images/icon-dice.svg';

function App() {
	const [ advice, setAdvice ] = useState({
		quote: null,
		number: 0,
	});

	const updateAdvice = async () => {
		try {
			setAdvice({
				quote: null,
				number: 0,
			});
			const response = await fetch('https://api.adviceslip.com/advice');
			const data = await response.json();
			const { slip } = data;
			setAdvice({ quote: slip.advice, number: slip.id });
		} catch (error) {
			console.error(error);
			setAdvice({
				quote: 'Something Wrong, Please try again later',
				number: 0,
			});
		}
	};

	useEffect(() => {
		updateAdvice();
	}, []);

	return (
		<div className="App">
			<div className="card">
				<h3 className="card-head">ADVICE #{advice.number}</h3>
				{advice.quote == null ? (
					<h2 className="card-advice">Loading...</h2>
				) : (
					<h2 className="card-advice">"{advice.quote}"</h2>
				)}
				<div className="card-divider">
					<Divider transform="scale(0.85)" />
				</div>
				<button onClick={updateAdvice} className="card-dice">
					<IconDice />
				</button>
			</div>
		</div>
	);
}

export default App;
