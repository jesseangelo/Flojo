describe("Flojo", function() {

	var t;
	beforeEach(function(timed) {
		t = 0;
  		FLOJO.timed(100, function() {
			t = 1;
			timed();
		});
	})

	it("should run a timed task", function (timed) {
		expect(t).toBe(1);
		timed();
	});



	it("should be able to create a task", function() {
		var task = FLOJO.timed(100, function() {});
		expect(task).not.toBe(null);
	});



	var a;
    beforeEach(function(after) {
    	a = 0;
    	var testAfter = FLOJO.timed(100, function() {
	      a++;
	    });
	    FLOJO.after(testAfter, 200, function() {
	      a++;
	      after();
	    });
    })

	it("should run an after task", function(after) {

		expect(a).toBe(2);
		after();
	});
})