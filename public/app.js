const discountURL = 'http://localhost:8080/discounts/'
const userURL = 'http://localhost:8080/users/'
// let discountDb = getDiscountDb();
// let userDb = getUserDb();
// console.log(discountDb);

function showRelevantDiscounts() {
	setTimeout(function(){showDiscountDb()});
};

function addUsersData() {
	setTimeout(function(){addUser()}, 100);
};

function checkUsersData() {
	setTimeout(function(){loginToTheSite()}, 200);
}

function showDiscountDb() {
	fetch(discountURL, {
		method: 'get'
	}).then(rawstuff => rawstuff.json())
	  .then(discounts => showDiscounts(discounts))
	  .catch(err => console.error(err))
}

// function getDiscountDb() {
// 	fetch(discountURL, {
// 		method: 'get'
// 	}).then(response => response.json())
// 	.then(discountDb => return discountDb);
// }

function getUserDb() {
	fetch(userURL, {
		method: 'get'
	}).then(response => console.log(JSON.stringify(response.json())));
}

function displayDiscountInfo(item) {
	if(item.favorite === true) {
			console.log(item.favorite);
		$('#searchResults').append(
			'<div class="searchCard" id="'+item._id+'">' +
			'<h2>'+item.restaurant+'</h2>' +
			'<p>'+item.discount+'</p>' +
			'<p>'+item.discountType+'</p>'+
			'<form id="addToFavorites">' +
			'<input id="redHeart" class="favoriteHeart" type="image" src="http://images.clipartpanda.com/white-clip-art-small-red-heart-black-and-white-only-md.png" alt="submit">'+
			'</form>' +
			'<form id="reportDeal" method="post" action="mailto:the.aaron.lee.brooks@gmail.com?subject=Report on Discount ' + item._id + '">' +
			'<input id="reportDealButton" class="reportButton" type="submit" value="Report this Deal">' +
			'</form>' +
			'</div>');
			toggleFavorites(item);
	} else if(item.favorite === false) {
		$('#searchResults').append(
			'<div class="searchCard" id="'+item._id+'">' +
			'<h2>'+item.restaurant+'</h2>' +
			'<p>'+item.discount+'</p>' +
			'<p>'+item.discountType+'</p>'+
			'<form id="addToFavorites">' +
			'<input id="whiteHeart" class="favoriteHeart" type="image" src="http://1.bp.blogspot.com/-KFoLowC5yjg/T6yI6_1sTqI/AAAAAAAAAGM/eOb9HZ6W9gg/s1600/heart...png" alt="submit">' +
			'</form>' +
			'<form id="reportDeal" method="post" action="mailto:the.aaron.lee.brooks@gmail.com?subject=Report on Discount ' + item._id + '">' +
			'<button id="reportDealButton" class="reportButton" type="button">Report this Deal</button>' +
			'</form>' +
			'</div>');
			toggleFavorites(item);
	};

}

function toggleFavorites(item) {
		if(item.favorite === true) {
			console.log(item.favorite);
		$('#'+item._id+' #redHeart').on('click', function(event) {
			event.preventDefault();
			console.log('hello');
			$('#'+item._id+ ' #redHeart').replaceWith(
				'<input id="whiteHeart" class="favoriteHeart" type="image" src="http://1.bp.blogspot.com/-KFoLowC5yjg/T6yI6_1sTqI/AAAAAAAAAGM/eOb9HZ6W9gg/s1600/heart...png" alt="submit">'
				);
			// item.favorite = false;
			fetch(discountURL+item._id, {
				method: 'put',
				body:{
					_id: item._id,
					favorite: false
				}
			}).then(function() {
				console.log(item, 'new object')
				toggleFavorites(item)
			})

		});

	} else if(item.favorite === false) {
		$('#'+item._id+' #whiteHeart ').on('click', function(event) {
			event.preventDefault();
			console.log('hello');
			$('#'+item._id+ ' #whiteHeart').replaceWith(
				'<input id="redHeart" class="favoriteHeart" type="image" src="http://images.clipartpanda.com/white-clip-art-small-red-heart-black-and-white-only-md.png" alt="submit">'
				);
			item.favorite= true;
			console.log(item, 'new object')
			toggleFavorites(item);
	});
}}

const showDiscounts = function(discountArray) {
		console.log('here')
	$('#searchForm').on('submit', function(event) {
			console.log('here')
		event.preventDefault();
		const $userSearch = $('#searchField').val();
		const $userSelect = $('#textField').val();
		console.log(discountArray);
		console.log($userSelect);
		console.log($userSearch);

		$('#searchResults').empty();

		if ($userSelect === 'restaurant') {
			discountArray.forEach(function(data) {
				if (data.restaurant === $userSearch) {
					displayDiscountInfo(data)
				};
			});
		}

		if ($userSelect === 'foodType') {
			data.discountArray.forEach(function(data) {
				console.log(data.foodType);
				if (data.foodType === $userSearch) {
					displayDiscountInfo(data)
				};
			});
		}

		if ($userSelect === 'discountType') {
			discountArray.forEach(function(data) {
				console.log(data.discountType);
				if (data.discountType === $userSearch) {
					displayDiscountInfo(data)
				};
			});
		}

	})
	$('#favoriteButton').on('click', function(event) {
		event.preventDefault();
		$('#searchResults').empty();
		discountArray.forEach(function(data) {
			console.log(data.favorite);
			if (data.favorite === 'true') {
				console.log(data);
				displayDiscountInfo(data);
			};
		});
	});

}

function addUser() {
	$('#signup-modal').on('click', function(event) {
		event.preventDefault();
		vex.dialog.open({
    	message: 'Add a new deal:',
    	input: [
        	'<input name="username" type="text" placeholder="Username" required />',
        	'<input name="password" type="password" placeholder="Password" required />',
        	'<input name="confirm_password" type="password" placeholder="Confirm Password" required />'
    	].join(''),
    	buttons: [
        	$.extend({}, vex.dialog.buttons.YES, { text: 'Sign Up' }),
        	$.extend({}, vex.dialog.buttons.NO, { text: 'Back' })
    	],
    	callback: function (data) {
        	if (!data) {
            	console.log('Cancelled')
        	} else {
            	console.log('Username', data.username, 'Password', data.password, 'Confirm Password', data.confirm_password)
        	createUser(data);
    	}
    }
})
})
}

function createUser(data){
	console.log(data);
	fetch(userURL, {
		method: 'post',
		headers:{
			'Accept': 'application/json',
			'Content-Type': 'application/json'},
		body: {data}
	}).then(function(){console.log('success')})
	  .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
    });
}

function checkUser(data) {
	let favoritesArray = [];

	fetch(userURL, {
		method: 'get'
	}).then(response => response.json())
	  .then(userDb => {
	  	userDb.forEach(function(database) {
			console.log(data);
			console.log(database);
			if(data.username === database.username && data.password === database.password) {
				console.log("success")
				favoritesArray = database.favorites;
			};
		});
	}).then(function() {
		fetch(discountURL, {
			method: 'get'
		}).then(rawstuff => rawstuff.json())
	  	  .then(discounts => {
			favoritesArray.forEach(function(favId) {
				console.log(favId);
				discounts.forEach(function(data) {
				if(data._id === favId) {
				data.favorite = true;
				console.log(data.favorite);
		}})
		});
		console.log(discounts);
	});
	})
};

	
function loginToTheSite() {
	$('#login-modal').on('click', function(event) {
		event.preventDefault();
		vex.dialog.open({
	    message: 'Enter your username and password:',
	    input: [
	        '<input name="username" type="text" placeholder="Username" required />',
	        '<input name="password" type="password" placeholder="Password" required />'
	    ].join(''),
	    buttons: [
	        $.extend({}, vex.dialog.buttons.YES, { text: 'Login' }),
	        $.extend({}, vex.dialog.buttons.NO, { text: 'Back' })
	    ],
	    callback: function (data) {
	        if (!data) {
	            console.log('Cancelled')
	        } else {
	            console.log('Username', data.username, 'Password', data.password)
	        }
	        checkUser(data);
	    }

	})
	})
}

function addADeal() {
	$('#addButton').on('click', function(event) {
		event.preventDefault();
		vex.dialog.open({
	    message: 'Enter your new deal:',
	    input: [
	        '<input name="restaurant" type="text" placeholder="Restaurant" required />',
	        '<input name="cuisine" type="text" placeholder="Type of Food" required />',
	        '<input name="discount" type="text" placeholder="Discount" required />',
	        '<select name="discountType">',
				'<option value="weekly">Weekly</option>',
				'<option value="promo code">Promo Code</option>',
				'<option value="app">App</option>',
				'<option value="weekly">Secret</option>',
				'<option value="promo code">Social</option>',
			'</select>'
	    ].join(''),
	    buttons: [
	        $.extend({}, vex.dialog.buttons.YES, { text: 'Add deal' }),
	        $.extend({}, vex.dialog.buttons.NO, { text: 'Back' })
	    ],
	    callback: function (data) {
	        if (!data) {
	            console.log('Cancelled')
	        } else {
	            console.log('restaurant', data.restaurant, 'cuisine', data.cuisine, 'discount', data.discount, 'discountType', data.discountType)
	            data.favorite = false;
	            MOCK_DISCOUNT_DATA.discountData.push(data);
	        	console.log(MOCK_DISCOUNT_DATA);
	        }
	    }

	})
	})
}

$(function() {
	addUsersData();
	checkUsersData();
	showRelevantDiscounts();
	addADeal();
})