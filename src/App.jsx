import React from 'react'
import './App.scss'

import Card from './components/Card';
import Search from './components/Search';
import { fetchItems, getFiltredId } from './functions/Api'



function App() {
	const [data, setData] = React.useState([])
	const [sortList, setSortList] = React.useState([]);
	const [page, setPage] = React.useState(1)
	const [loading, setLoading] = React.useState(true)


	const products = async () => {
		const productsList = await fetchItems();
		setData(getFiltredId(productsList, 'id'))
		setSortList(getFiltredId(productsList, 'id'))
		setLoading(false)
	}

	if (loading) {
		products()
	}

	const pagination = (arr, currentPage, length) => {
		return arr.slice((currentPage - 1) * length, currentPage * length);
	}
	let maxPage = Math.ceil(sortList.length / 50)
	return (
		<div className="App">
			<header className='header'>
				<div className="container">
					<Search setSortList={setSortList} setPage={setPage} data={data} />
					<a className='bio' href="https://istredo.fun/" target="_blank" rel="noopener noreferrer">Связаться со мной и посмотреть портфолио</a>
				</div>
			</header>
			<section className='main'>
				<div className="container">
					<div className="pagination">
						<button type="button" className="btn" onClick={() => setPage(page - 1)} disabled={page === 1}>&lt;</button>
						<div className="curent__page">Текущая страница: {page}</div>
						<button type="button" className="btn" onClick={() => setPage(page + 1)} disabled={page === maxPage}>&gt;</button>
					</div>
					{
						loading
							? <div className='loading'>Загрузка товаров...</div>
							: <div className="cards__container">{pagination(sortList, page, 50).map((item) => <Card key={item.id} {...item} />)}</div>
					}

				</div>
			</section >
		</div >
	)
}

export default App

