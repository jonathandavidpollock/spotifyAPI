var searchField = document.querySelector('.js-search-field');
var button = document.querySelector('.js-search-button');
var resultEl = document.querySelector('.results');
var searchSpot = document.querySelector('.searchText');
var sct = document.querySelector('.mainSection');

button.addEventListener('click', function(e){
	e.preventDefault();
	resultEl.innerHTML = '';
	var submittedText = searchField.value;
	submittedText = encodeURI(submittedText);
	var limitNumber = '9';
	var type = 'album';
	var api = `https://api.spotify.com/v1/search?query=${submittedText}&offset=0&limit=${limitNumber}&type=${type}`;
	console.log(api);
	makeRequest(api);
})

function makeRequest(url) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			var data = JSON.parse(request.responseText);
			var albums = data.albums;
			var items = albums.items;
			console.log(items);
			if(items== null || items==' '){
				searchSpot.innerHTML = "No Results Found";
			}	
			else {
				renderPage(items);	
			}	
		}
		else {
			console.log('response error', request);
		}
	}

	request.onerror = function() {
		console.log('Connection Error');
	}

	request.send();
}

function renderPage(results) {

	searchSpot.innerHTML = 'Results for ' + searchField.value;
	console.log(searchSpot);


	results.forEach( (result, index, array) => {
		var listItem = document.createElement('li');
		var textNode = '<img src="' + result.images[1].url + '" />';
		textNode += '<div class="container"><h3>' + result.name + '</h3>';
		textNode += '<p>'  + result.artists[0].name + '</p></div>';
		
		listItem.innerHTML = textNode;
		resultEl.appendChild(listItem); 
		textNode = '';
	})
	resultEl.insertAdjacentHTML('beforeend','<p class="btnContainer"><button class="viewMoreBtn">View More On Spotify</button></p>');
	sct.insertBefore(searchSpot, sct.firstChild);
}