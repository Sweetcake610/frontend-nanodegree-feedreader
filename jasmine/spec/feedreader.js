/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
		it('all feeds are defined and have URL', function() {
			for(let feed of allFeeds) {
				expect(feed.url).toBeDefined();
				expect(feed.url).not.toBe(' ');
			}
		});

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
		 it('all feeds are defined and have name', function() {
			for(let feedN of allFeeds) {
				//feed = this.url;
				expect(feedN.name).toBeDefined();
				expect(feedN.name).not.toBe(' ');
			}
		});
    });


    /*Test suite named "The menu" that checks the menu element
	/*is hidden when feed is loaded and that it is visibile when menu
	/*icon is clicked
	*/
	describe('The menu', function() {
		var menuIcon = document.querySelector('.menu-icon-link');
		
		 it('menu element is hidden by default', function() {
			 expect($('body').hasClass('menu-hidden')).toBe(true);
		 });

		  it('menu changes visibility when icon is clicked', function() {
			  menuIcon.click();
			  expect($('body').hasClass('menu-hidden')).toBe(false);
			  
			  menuIcon.click();
			  expect($('body').hasClass('menu-hidden')).toBe(true);
		  });
	});

    /* Test that ensures when the loadFeed
    * function is called and completes its work, there is at least
    * a single .entry element within the .feed container.
    */
	describe('Initial Entries', function() {
		var feed = document.querySelector('.feed'); 
		
		 beforeEach(function(done) {
			loadFeed(0, function() {
				done();
			});
		});
      
		it('there is at least a single feed entry', function() {
			expect(feed.getElementsByClassName('entry').length).toBeGreaterThan(0);
		});
	});

    /* new test suite named "New Feed Selection" */
	/* When new feed is loaded by the loadFeed function
	/* the test check each feed for similar content. 
     */
	describe('New Feed Selection', function () {
		let initialFeed, firstFeed, secondFeed;
		
		beforeEach(function(done) {
			loadFeed(0, function() {
				initialFeed = document.querySelector('.feed').innerHTML;
				loadFeed(1, function() {
					firstFeed = document.querySelector('.feed').innerHTML;
					loadFeed(2, function() {
						secondFeed = document.querySelector('.feed').innerHTML;
						loadFeed(3, function() {
						 done();
						});
					});
				});
			});	
		});
		it('new feed is loaded and content changed', function() {
			let newFeed = document.querySelector('.feed').innerHTML;
			expect(newFeed).not.toMatch(initialFeed);
			expect(newFeed).not.toMatch(firstFeed);
			expect(newFeed).not.toMatch(secondFeed);
		});
		
		/*Have the test return to the initial feed page after test is completed
		*/
		afterEach(function(done) {
			loadFeed(3, function() {
				loadFeed(0, function() {
					done();
				});
			});
		});
	});
}());
