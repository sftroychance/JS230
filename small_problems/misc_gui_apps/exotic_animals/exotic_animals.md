# Project Notes

## Project Name
Exotic Animals

## Description
Create a page that displays a grid of animal images and shows a tooltip for each animal that contains more information about the animal.

Requirements
Choose any animals that you want.
Create markup that includes an image and caption for each animal.
Hide the captions initially.
Display the caption as a tooltip when the user hovers the mouse cursor over the image for more than two seconds. Close the tooltip when the user moves the mouse off the image.
Don't display the caption tooltip when the user moves the cursor off the image before the two second time delay elapses.

## HTML
use a grid layout with auto width
grid is a div that contains div elements
  - div contains figure (div might not be necessary here)
    - figure contains image and figcaption (hidden)

## CSS
test if transition will handle delay the way we want (2s delay, canceled with mouseout)
set figure as position relative, figcaption as position absolute
figcaption position: bottom left, looks like border width distance from left, have to test for distance from bottom (might be a calculated value based on img size)

We maybe could handle it all with css :hover, but stick with JS.

## JS
event listener on grid div (mousein/out)
on mousein: 2s delay then show figcaption
on mouseout: cancel transition (if necessary) and hide figcaption

- used jQuery for ease of fading
