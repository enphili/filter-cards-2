'use strict';

const BD = [
	{
	"title": "cart-1",
	"img": "image-1",
	"price": 1000,
	"tags": ["red", "black", "silver"]
	},
	{"title": "cart-2",
	"img": "image-2",
	"price": 2500,
	"tags": ["blue", "yellow"]},
	{"title": "cart-3",
	"img": "image-3",
	"price": 500,
	"tags": ["pink"]},
	{"title": "cart-4",
	"img": "image-4",
	"price": 1500,
	"tags": ["brown", "black", "pink"]},
	{"title": "cart-5",
	"img": "image-5",
	"price": 450,
	"tags": ["yellow", "red"]},
	{"title": "cart-6",
	"img": "image-6",
	"price": 3700,
	"tags": ["violet", "purple"]},
	{"title": "cart-7",
	"img": "image-7",
	"price": 801,
	"tags": ["silver", "red"]},
	];

const cartWrapper = document.querySelector('.cart-wrapper'),
			tagsWrapper = document.querySelector('.tags-wrapper'),
			title = document.querySelector('.title');

const allTagCloud = new Set();
const activeTagCloud = new Set();

const createCard = oneСard => {
	const {title, img, price, tags} = oneСard;
	const card = document.createElement('div');
	card.className = 'card';
	card.insertAdjacentHTML('afterbegin', `
		<span>Title: ${title}</span>
		<span>Image: ${img}</span>
		<span>Price: ${price} ₽</span>
		<span>Tags: ${tags.join(', ')}</span>
	`);
	return card;
};

const renderCards = filteredcards => {
	title.textContent = 'Some cards';
	cartWrapper.textContent = '';
	filteredcards.length ? filteredcards.forEach(card => cartWrapper.append(createCard(card))) : title.textContent = 'No cards';
};

const creatTagCloud = cards => {
	cards.forEach(card => {
		card.tags.forEach(el => {
			const tag = `<span class="tag">${el}</span>`;
			allTagCloud.add(tag);
		});
	});
};

const renderTagsCloud = bd => {
creatTagCloud(bd)
tagsWrapper.textContent = '';
allTagCloud.forEach(tag => tagsWrapper.insertAdjacentHTML('afterbegin', tag));
};

const arrayComparison = (arr1, arr2) => {
	if (!arr2) return true;
	for (let i = 0; i < arr2.length; i++) {
		if (arr1.indexOf(arr2[i]) < 0) return false;
	}
	return true;
};

const showCards = e => {
	const target = e.target;
	if (target.classList.contains('tag')) {
		target.classList.toggle('tag--active');
		const activeTag = target.textContent;
		if (target.classList.contains('tag--active')) {
			activeTagCloud.add(activeTag);
		} else {
			activeTagCloud.delete(activeTag);
		}
		const filteredcards = BD.filter(card => arrayComparison(card.tags, [...activeTagCloud]));
		activeTagCloud.size > 0 ? renderCards(filteredcards) : renderCards(BD);
	}
};


renderCards(BD);
renderTagsCloud(BD);
tagsWrapper.addEventListener('click', showCards);