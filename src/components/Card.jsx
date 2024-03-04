import React from 'react'



const Card = (props) => {

	return (
		<div className="cards__item" key={props.id} >
			<p>{props.product}</p>
			<p>{props.brand}</p>
			<p>Стоимость: {props.price} &#8381;</p>
			<p>Артикул: {props.id}</p>
		</div >
	)
}

export default Card



