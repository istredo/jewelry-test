import React from 'react'
import './App.scss'

import Card from './components/Card';
import { fetchItems, getFiltredId } from './functions/Api'



function App() {
	const [data, setData] = React.useState([])

	const [loading, setLoading] = React.useState(true)


	const products = async () => {
		const productsList = await fetchItems();
		setData(getFiltredId(productsList, 'id'))
		setLoading(false)

	}

	if (loading) {
		products()
	}



	return (
		<div className="App">
			<header className='header'>
				<div className="container">

				</div>
			</header>
			<section className='main'>
				<div className="container">

					{
						loading
							? <div className='loading'>Загрузка товаров...</div>
							: <div className="cards__container">{data.map((item) => <Card key={item.id} {...item} />)}</div>
					}

				</div>
			</section >
		</div >
	)
}

export default App

