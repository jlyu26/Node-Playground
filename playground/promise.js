var asyncAdd = (a, b) => {
	return new Promise ((resolve, reject) => {
		setTimeout(() => {
			if (typeof a === 'number' && typeof b === 'number') {
				resolve(a + b);
			} else {
				reject('Arguments must be numbers!');
			}
		}, 1500);
	});
};

asyncAdd(2,5)
	.then((res) => {
		console.log('Result:', res);
		return asyncAdd(res, '30')			
			.then((res) => {
				console.log('2nd Result:', res);
			}, (errorMessage) => {
				console.log(errorMessage);
			})
	}, (errorMessage) => {
		console.log(errorMessage);
	});



// var somePromise = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		// resolve('It works!');
// 		reject('It fails!');
// 	}, 2500);	
// });

// somePromise
// 	.then((message) => {
// 		console.log('Resolve Success:', message);
// 	}, (errorMessage) => {
// 		console.log('Resolve Fails:', errorMessage);
// 	})
// 	.catch((err) => {
// 		console.log('Both Fail:', err);
// 	});




// Q: What exactly is the difference between these two statements?

// funcThatReturnsAPromise()
// 	.then(() => {  success  })
// 	.catch(() => { /* fail */ });


// funcThatReturnsAPromise()
// 	.then(() => { /* success */ }, () => { /* fail */ });



// A: .catch(foo) is equal to .then(undefined, foo)
// But there is a difference between the code samples:

// funcThatReturnsAPromise()
// 	.then(() => { /* success case of funcThatReturnsAPromise */ })
// 	.catch(() => { /* both fail case of funcThatReturnsAPromise 
//                      and fail case of "then" function */ });

// funcThatReturnsAPromise()
//	.then(() => { /* success case of funcThatReturnsAPromise */ }, 
//		() => { /* fail case of funcThatReturnsAPromise */ });

// Stack Overflow: https://stackoverflow.com/a/40068178