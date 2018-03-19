console.log('Starting app');

setTimeout(() => {
	console.log('Inside of callback');
}, 2000);

setTimeout(() => {
	console.log('No Delay!');
}, 0);

console.log('Finishing app');


// Starting app
// Finishing app
// No Delay!
// Inside of callback