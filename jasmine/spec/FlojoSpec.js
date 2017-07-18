describe("Flojo", function() {

	it("should be able to create a task", function() {
		var task = FLOJO.timed(100, null);

		expect(task).not.toBe(null);
	});
})