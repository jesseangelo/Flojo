describe("Flojo", function() {
	var FLOJO = require('../app/scripts/Flojo.js');

	it("should be able to create a task", function() {
		var task = FLOJO.timed(100, null);

		expect(task).not.toBe(null);
	});
})