# Assigment
To start with, we will use placeholder images to make four large images for the slides in our slideshow and four smaller, "thumbnail" images to be used for our slideshow navigation. The layout will be a single visible photo at the top of the page that takes up the width of the container, and the other images after it are hidden to start with. Below that are the four thumbnail images, laid out next to each other in a single row.

You can see an example that we have completed using placeholder images.

On the first thumbnail, we will have a class added that will designate it as the currently visible image in the slideshow. As we click on other thumbnails, we will remove that class from the current thumbnail and place it on the clicked one. There should be some visual indicator that the thumbnail is the active one, like a change in border color.

When the thumbnails are clicked, perform the active class toggle. Then, hide the currently visible image. Finally, based on which thumbnail was clicked, locate the image that was requested and show that image.

For some extra practice, instead of simply showing and hiding the images, use fade animations to first fade the visible one out, then fade the selected one in.

# notes
- At the top of the page, for the main image, we want to set up figure elements for each photo, and three of them are hidden--only one visible at a time (would a better solution be to have one container div and just change out the image for it on transition?); id for each is 'Photo#'

- define a class that denotes the visible image; the class is added to/removed from the thumbnail figure

- when the thumbnail is clicked, we toggle the class on the thumbnail that is being hidden and set the class on the thumbnail that is being selected

- visible class should include setting the border color for the thumbnail

- color placeholders are a function of the site generating placeholder images; however, the site in the given URL has shut down (though the placeholders still load), so it's hard to get documentation for how to link color images. I am using 'placehold.co' instead, which is well documented on their page.
