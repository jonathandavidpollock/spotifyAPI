var searchField = document.querySelector('.js-search-field');
var button = document.querySelector('.js-search-button');
var results = document.querySelector('.results');

button.addEventListener('click', function(e){
	var submittedText = searchField.value;
	var limitNumber = '10';
	var type = 'album';
	var api = `https://api.spotify.com/v1/search?query=${submittedText}&offset=0&limit=${limitNumber}&type=${type}`;
	console.log(api);
})