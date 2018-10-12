---
layout: post
title: Use pictures from Facebook in your site. Upload once, use everywhere
categories:
- blog
tags: []
---
It's a common practice nowadays that most of the businesses, besides a classic website have a Facebook brand page.

It's also a common practice that the website should have a photo gallery and the Facebook brand page should have one or more albums.

But uploading pictures in two places is a tedious task. Sorting them in two places is even harder. And naming, tagging and adding description makes things even worse.

However, there's a solution!

Facebook allows you to pull pictures from it, using a JSONP API. As far as I know, the pictures can only be in an album inside a brand page (and not a personal page) and they must be made public for anyone (this is rather logic).

To begin, we must know two things: the Facebook user id and the album id. They can be found here:

<img title="user id and album id facebook" src="/wp-content/uploads/2011/05/user-id-and-album-id-facebook.jpg" alt="" width="580" height="412" />

Next, using this code, just bring the images from Facebook to our website. We used the user id and album id from the screenshot above inside the code.

{% highlight javascript %}jQuery(function($) {
    var fqlUserId = '321662419491';    // the user id
    var fqlAlbumId = '305695';    // the album id
    var fqlQuery = "SELECT src_big, caption, src_small, src FROM photo WHERE owner = " + fqlUserId + " AND aid = '" + fqlUserId + '_' + fqlAlbumId + "'";

    $.getJSON("https://api.facebook.com/method/fql.query?format=json&amp;callback=?&amp;query=" + escape(fqlQuery), function(data) {
        for (var i = 0; i < data.length; i++) {
            jQuery('<img src="' + data[i].src_small + '" alt="' + data[i].caption + '" />').appendTo('body');
        }
    });
});{% endhighlight %}

The code above will query the Facebook API, and then create an image tag for each of the image present in that specified album. This is how it will look like. Of course, it can be spaced, aligned, bordered nicely using CSS.

<img title="output" src="/wp-content/uploads/2011/05/output.jpg" alt="" width="580" height="96" />

Now anytime a picture is added, removed, changed in Facebook, the change will instantly reflect in your website.

To see what other information you can get on each picture, use <a href="http://developers.facebook.com/docs/reference/fql/photo/" target="_blank">http://developers.facebook.com/docs/reference/fql/photo/</a>

