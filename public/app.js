function showRelevantDiscounts(data) {
	setTimeout(function(){showDiscounts(data)}, 100);
};

function addUsersData(data) {
	setTimeout(function(){addUser(data)}, 100);
};

function checkUsersData(data) {
	setTimeout(function(){checkUser(data, MOCK_USER_DATA, MOCK_DISCOUNT_DATA)}, 100);
}

function displayDiscountInfo(item) {
	if(item.favorite === 'false') {
			console.log(item.favorite);
		$('#searchResults').append(
			'<div class="searchCard" id="'+item.id+'">' +
			'<h2>'+item.restaurant+'</h2>' +
			'<p>'+item.discount+'</p>' +
			'<p>'+item.discountType+'</p>'+
			'<form id="addToFavorites">' +
			'<input id="removeHeart" class="favoriteHeart" type="image" src="http://images.clipartpanda.com/white-clip-art-small-red-heart-black-and-white-only-md.png" alt="submit">'+
			'</form>' +
			'<form id="reportDeal" method="post" action="mailto:the.aaron.lee.brooks@gmail.com?subject=Report on Discount ' + item.id + '">' +
			'<input id="reportDealButton" class="reportButton" type="submit" value="Report this Deal">' +
			'</form>' +
			'</div>');
			addToFavorites(item);
			removeFromFavorites(item);
	} else if(item.favorite === 'true') {
		$('#searchResults').append(
			'<div class="searchCard" id="'+item.id+'">' +
			'<h2>'+item.restaurant+'</h2>' +
			'<p>'+item.discount+'</p>' +
			'<p>'+item.discountType+'</p>'+
			'<form id="addToFavorites">' +
			'<input id="addHeart" class="favoriteHeart" type="image" src="http://1.bp.blogspot.com/-KFoLowC5yjg/T6yI6_1sTqI/AAAAAAAAAGM/eOb9HZ6W9gg/s1600/heart...png" alt="submit">' +
			'</form>' +
			'<form id="reportDeal" method="post" action="mailto:the.aaron.lee.brooks@gmail.com?subject=Report on Discount ' + item.id + '">' +
			'<button id="reportDealButton" class="reportButton" type="button">Report this Deal</button>' +
			'</form>' +
			'</div>');
			removeFromFavorites(item);
			addToFavorites(item);
	};

}

function removeFromFavorites(item) {
	$('#'+item.id+' #addHeart ').on('click', function(event) {
		event.preventDefault();
		console.log('hello');
		$('#'+item.id+ ' #addHeart').replaceWith(
			'<input id="removeHeart" class="favoriteHeart" type="image" src="http://images.clipartpanda.com/white-clip-art-small-red-heart-black-and-white-only-md.png" alt="submit">'
			);
		item.favorite= false;
		console.log(item, 'new object')
		addToFavorites(item);
});
}

function addToFavorites(item) {
	$('#'+item.id+' #removeHeart').on('click', function(event) {
		event.preventDefault();
		console.log('hello');
		$('#'+item.id+ ' #removeHeart').replaceWith(
			'<input id="addHeart" class="favoriteHeart" type="image" src="http://1.bp.blogspot.com/-KFoLowC5yjg/T6yI6_1sTqI/AAAAAAAAAGM/eOb9HZ6W9gg/s1600/heart...png" alt="submit">'
			);
		item.favorite = true;
		console.log(item, 'new object')
		removeFromFavorites(item);
	});
}
const showDiscounts = function(data) {

	$('#searchForm').on('submit', function(event) {
		event.preventDefault();
		const $userSearch = $('#searchField').val();
		const $userSelect = $('#textField').val();

		console.log($userSelect);
		console.log($userSearch);

		$('#searchResults').empty();

		if ($userSelect === 'restaurant') {
			data.discountData.forEach(function(data) {
				if (data.restaurant === $userSearch) {
					displayDiscountInfo(data)
				};
			});
		}

		if ($userSelect === 'foodType') {
			data.discountData.forEach(function(data) {
				console.log(data.foodType);
				if (data.foodType === $userSearch) {
					displayDiscountInfo(data)
				};
			});
		}

		if ($userSelect === 'discountType') {
			data.discountData.forEach(function(data) {
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
		data.discountData.forEach(function(data) {
			console.log(data.favorite);
			if (data.favorite === 'true') {
				console.log(data);
				displayDiscountInfo(data);
			};
		});
	});

}

function addUser(data) {

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
        
        	createUser(data, MOCK_USER_DATA);
    	}
    }
})
})
}

function createUser(data, userdata){
	console.log(data);
	console.log(userdata.userData);
	data.favorites = [];
	userdata.userData.push(data);
	console.log(userdata.userData);
}

function checkUser(data, userdata, itemdata) {
	let favoritesArray = [];
	console.log(data);
	console.log(userdata.userData);
	const userDatabase = userdata.userData;
	const itemDatabase = itemdata.discountData;

	userDatabase.forEach(function(database) {
		console.log(data);
		console.log(database);
		if(data.username === database.username && data.password === database.password) {
			console.log("success")
			favoritesArray = database.favorites;
		};
	});
	favoritesArray.forEach(function(favId) {
		console.log(favId);
		itemDatabase.forEach(function(data) {
			if(data.id === favId) {
			data.favorite = true;
			console.log(data.favorite);
		}})
		console.log(itemDatabase);
		});
	};
	

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
        checkUsersData(data, MOCK_USER_DATA, MOCK_DISCOUNT_DATA);
    }

})
})


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

function createUser(data, userdata){
	console.log(data);
	console.log(userdata.userData);
	userdata.userData.push(data);
	console.log(userdata.userData);
}


$(function() {
	addUsersData(MOCK_USER_DATA);
	checkUsersData(MOCK_USER_DATA);
	showRelevantDiscounts(MOCK_DISCOUNT_DATA);
})