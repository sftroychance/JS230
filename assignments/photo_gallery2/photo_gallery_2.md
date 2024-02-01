# Description
We are provided with HTML and CSS for this project; the HTML includes Handlebars templates we will be using; one of those templates is a partial, which we will also need to use as a standalone template.

This is a photo gallery page.
- we will use an API to get photos for our slideshow, with id and caption included, as well as created date, likes count, and favorites count; we will create figures for all the photos and add them to the slideshow and display the first one, as well as display the photo info for that photo
- based on the photo selected in the slideshow, we will call the API to get comments for that photo and display them.
- when the photo is advanced via slideshow arrows (maybe add keyup events for keyboard arrows?), we make a new API call for comments for that photo
- at the bottom is a form to submit a new comment; calls API to add comment and also display the new comment (add it to existing comments in JS or make a new request for all comments?)
- when we click like or favorite, will send API call to get new total; we need to also increment the value we already have from retrieving our photos on page load

# initial questions:
- is it possible or desirable to cache comments, maybe do an API call to return data only if the data has changed? (this might need to be configured on the server side, so might not be possible)
- when we submit a new comment, we update the comments on the server; do we then make a new API request to get comments? (what if other users have made comments in the interim?)

# strategy
- we will be adding functionality step by step in the lessons, so don't drift ahead
- use native JS (I'll use Fetch API) to start off, then maybe convert it to jQuery later

# implementation
- load photo slides and populate first photo info
- differences from LS solution:
  - I compiled my templates one by one and registered the partial; LS selected all the templates at once and in a loop registered all the templates, saving the resultant functions to an object, with the key being the 'id' attribute of the template script
  - LS also registered the partial in a loop, with the selector being a special data-type attribute on the partial (loop just in case other partials are added)
  - I created a function loadPhotos() to process all the photos and the initial photoInfoArea; LS went ahead and wrote a function to process photoInfo, passing ID as argument (since we will reuse this functionality with each photo selected)

Actions:
- created loadPhotoInfo() function
- created compileTemplates(), refactored to loops

- set up events for arrows on slideshow

strategy for advancing/reversing slides is to select the current node and insert it at the end of the parent child elements or insert it at the beginning of the parent child elements; this way the current photo is always the first figure in the list, so the figure + figure css selector will work
to advance:
- slides.insertAdjacentElement('beforeend', slides.firstElementChild);
to reverse:
- slides.insertAdjacentElement('afterbegin', lastElementChild)

this strategy works! and the transitions work as well
- created function `loadPhotoDetails()`, which loads the photo info and also the comments. Rather than taking the id number as an argument, it grabs the current slide ID number by checking the data-id attribute on the first figure


The LS solution here goes for setting classes on the figures to hide/show, but the fade transition works fine with css and just changing the order of figures. I defined the transition in the `figure` and `figure + figure`, and I set a delay equal to the fade-out time, so the fade in does not start until the fade out is completed (otherwise they fade into each other, which might not look so great for actual photos).

When adding the event listener for the like/favorites buttons, ran into a long frustration with the event listener. It looks like if you select the template elements for the event listener, the template does not update the DOM quickly enough for the event listener to be activated (but there is no error with that attempt).

Also: I added event listeners to elements that were being removed and readded every time I would advance the slide show; I would need to put in new event listeners every time the template is rendered (and again, with the delay, they might not get added).

So the solution is always adding event listeners to an ancestor that is part of the original HTML, and then drilling down to the target object. jQuery makes this much easier because you can give a selector as the actual target `$(ancestor).on('click', 'selector', callback);`

Completed this portion of the exercises, processing likes and favorites.
Notes:
- There is no mechanism to keep us from hitting like and favorite over and over. Because we are setting the event listener on an ancestor, we cannot give the option to run the listener only once (if we hit 'like' we could not also hit 'favorite'). It does not seem to be part of the LS solution.
- The LS solution is to send the POST request, then update the like/favorite button with the new count, and then load the photos again from the API; this only replaces the data structure and does not affect the DOM. My solution is to update photoData with the new value returned by our POST request instead of making another API call. Rather than update the like/favorite button directly, I instead call `loadPhotoInfo()` again; it doesn't involve an API call, just re-rendering the info section. That re-renders more than is necessary, though, when we just need text on one button updated.
- the assignment did not indicate what type of data the server expects; I used JSON, and it worked. The LS solution uses `application/x-www-form-urlencoded; charset=utf-8` with text in the body. I'll use that format for the next part of the assignment.

Final part of the assignment: adding comments
- serialize form data (urlencoded)
- send post request with query string in body
- render new comment on page (templated)
- reset the form

Straightforward, using more helper functions this time around
- a function to gather the form data
- a function to encode an object to text to submit

I still hard-code the method and action for the form, though this time I did set the event listener on the form submit rather than the button click, as it seems to be standard.
