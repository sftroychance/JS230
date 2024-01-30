// 1. Locate the template by ID and compile it to a template function. Render the post to the body element using the function.
// 2. Change your post object's body property to contain HTML elements as part of the string. Modify your Handlebars template to allow HTML to be output unescaped.
// 3. Add a property called tags on the post object that will be an array of strings to represent tags added to the blog post. Use the Handlebars each built-in helper to output all tags for the post.
// 4. Create a separate template for the HTML element that wraps each tag. Using the handlebars partial method, register the template as a partial using the name "tag" and replace the HTML for tags in the main template with a reference to the partial.
// 5. Create a posts array, adding the existing post to it. Add a second post with no tags property. Modify your template to check for the existence of tags, and if none exist, output a "Not tagged" message. Wrap the template in an each loop to output each post.

$(document).ready(function(){
  // let post = {
  //   title: 'Lorem ipsum dolor sit amet',
  //   published: 'April 1, 2015',
  //   body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
  //   tags: ['one', 'two', 'three'],
  // };

  const postArr = [
    {
      title: 'Lorem ipsum dolor sit amet',
      published: 'April 1, 2015',
      body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
      tags: ['one', 'two', 'three'],
    },
    {
      title: 'Number two ',
      published: 'April 2, 2015',
      body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
      tags: [],
    },
  ]

  const templateFunction = Handlebars.compile($('#post').html());
  Handlebars.registerPartial('partialTags', $('#tags').html());

  // post.body = '<p>' + post.body + '</p>';
  $('body').append(templateFunction({posts: postArr}));
});
