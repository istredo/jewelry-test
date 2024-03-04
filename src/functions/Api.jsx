import md5 from 'md5';

export const API = 'https://api.valantis.store:41000/';


export const Auth = () => {
	const pw = 'Valantis';
	const time = new Date().toLocaleDateString().split('.').reverse().join('')
	return md5(`${pw}_${time}`);
};


export const fetchId = async () => {
	try {
		const res = await fetch(API, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Auth': Auth()
			},
			body: JSON.stringify({
				"action": "get_ids",
				"params": { "offset": 0, "limit": 210 }
			})
		});
		const data = await res.json();
		return data.result;
	} catch (error) {
		console.log(error);
	}
};


export const fetchItems = async () => {
	const listItems = await fetchId();
	try {
		const res = await fetch(API, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Auth': Auth()
			},
			body: JSON.stringify({ action: 'get_items', params: { ids: listItems } })
		})
		const data = await res.json();
		return data.result;
	} catch (error) {
		console.log(error);
	}
};


export const getFiltredId = (arr, id) => {
	const filterList = [];
	return arr.filter((item) => {
		const value = item[id];
		if (!filterList[value]) {
			filterList[value] = true;
			return true;
		}
		return false
	});
};