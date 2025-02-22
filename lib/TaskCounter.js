
function TaskCounter(finalCallback) {
	let results = [];
	let errors = [];

	let started = 0;

	function decrement(err, res) {
		if(err) {
			errors.push(err);
		}

		if(arguments.length > 2) {
			arguments[0] = undefined;
			res = arguments;
		}

		if(typeof res !== "undefined") {
			results.push(res);
		}

		if(--started <= 0) {
            return callCallback();
		}
	}

	function increment(amount = 1) {
		started += amount;
	}

	function callCallback() {
		if(errors && errors.length === 0) {
			errors = undefined;
		}

		if(results && results.length === 0) {
			results = undefined;
		}

		finalCallback(errors, results);
    }

	return {
		increment,
		decrement
	};
}

module.exports = TaskCounter;