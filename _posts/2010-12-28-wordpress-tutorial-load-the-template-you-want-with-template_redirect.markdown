---
layout: post
title: Wordpress tutorial - load the template you want with template_redirect
categories:
- blog
tags: []
---
If you're a web developer and you are using WordPress to create a website rather than a blog, I'm pretty sure you would try to achieve some of the following:

* use a different layout for a certain category (and maybe all it's subcategories)
* use a different layout for a certain post
* use a different layout for a certain post inside a certain category
* load a different page for a certain non-WordPress-URL

If so, then this tutorial is for you.

##template_redirect - where all begins
The drawing bellow illustrates how `template_redirect` works. Basically, you use it to intervene **just before** WordPress decides which template to use, and then override it with what you want.

<img title="template_redirect_request" src="/wp-content/uploads/2010/12/template_redirect_request.gif" alt="" width="544" height="254" />

The simplest way to show how `template_redirect` works would be to tell WordPress that, no matter which page is requested, just display "Testing template_redirect" on a blank page.
The code is below. I recommend you put it in `functions.php` file of your theme:
{% highlight php %}<?php
function my_template() {
     echo "Testing template_redirect";
     exit;
}
add_action('template_redirect', 'my_template');{% endhighlight %}
`add_action` is a function that allows you to hook to certain moments in the WordPress loading process and provide custom functionality. `template_redirect` is one of the many functionalities you can alter.
As a result of the `add_action` call, WordPress will execute `my_template` function every time a page is requested in order to find out which template should it load.
As I said above, this example just prints that text and does nothing afterward (because of the `exit` keyword). If exit would not be present, the text would have been printed, and WordPress would have continued with it's default logic.

##So, what can we really do inside template_redirect?
Because I don't like theory either, I will begin with some simples examples and explanations.

###Use a different template for a certain category (example "fun")
{% highlight php %}<?php
function my_template() {
    if (is_category() && get_query_var('cat') == get_cat_id('fun')) {
        include (TEMPLATEPATH . '/category-fun.php');
        exit;
    }
}
add_action('template_redirect', 'my_template');{% endhighlight %}

The first thing we check is whether we find ourselves in a category. is_category() tells me if I am currently trying to access a category page. This first condition is useful, because we wouldn't want to apply this rule to a post, to a page or the front page.

The next condition (`get_query_var('cat') == get_cat_id('fun')`) checks whether we are trying to access the "fun" category of our blog. `get_query_var` gets the numeric id of the category we are currently accessing.  `get_cat_id` gets the id for the given category name. We could also do `get_query_var('cat') == 7` **(assuming that "fun" has the id 7, but it is not recommended to leave numbers in your code, as later you won't have any idea what "7" represents)**

If both conditions are true, that means we are accessing the "fun" category and we load a different template for it. In this case, we include the file `category-fun.php` and then exit. As I said above, we exit because we loaded the template and we have to tell WordPress to stop executing the default logic.

If one or both conditions are false, then nothing happens, and WordPress continues to process it's default logic, thus loading the default category page.

###Use a different template for a certain category and all it's subcategories (example "fun")
Suppose now that our "fun" category has more subcategories, such as "jokes", "cats", "epic fails", "shows". If you want all these categories (including their parent - fun) to have the same template, there are two options:

* either you add more conditions to the function in the previous example (which is really not a good idea, as for any new subcategories you would also have to add new conditions)
* either you use the code below that explicitly states that both fun and it's subcategories (that may change in time) will be loaded using the given template (this is the good solution)
{% highlight php %}<?php function my_template() {
    if (is_category() &&
            (get_query_var('cat') == get_cat_id('fun') ||
            cat_is_ancestor_of(get_cat_id('fun'), get_query_var('cat')))) {
        include (TEMPLATEPATH . '/category-fun.php');
        exit;
    }
}
add_action('template_redirect', 'my_template');{% endhighlight %}
This example adds a new condition referring to the category ancestor. So basically now, all it does is check:

* whether it is the "fun" category itself **OR**
* whether it is a category that is a children of "fun"

###Use a different layout for a certain post
{% highlight php %}<?php function my_template() {
    if (is_single()) {
        global $post;
        if ($post->ID == 10) {
            include (TEMPLATEPATH . '/post-with-id-10.php');
            exit;
        }
        if ($post->post_name == 'hello-world') {
            include (TEMPLATEPATH . '/post-with-permalink-hello-world.php');
            exit;
        }
    }
}
add_action('template_redirect', 'my_template');{% endhighlight %}

The example below shows that you can check for any property of the post in order to take a decision about which template to load.

`is_single()` returns true if a single post is being accessed.

###Use a different layout for a certain post inside a certain category
{% highlight php %}<?php function my_template() {
    if (is_single()) {
        global $post;
        $current_post_categories = wp_get_post_categories($post->ID);
        if (in_array(get_cat_id('fun'),$current_post_categories)) {
            include (TEMPLATEPATH . '/post-in-fun.php');
            exit;
        }
    }
}
add_action('template_redirect', 'my_template');{% endhighlight %}
The first thing we do is to get the list of categories in which the current post belongs and then see if "fun" is one of them. If yes, that means the post is in the "fun" category and we load it's template.

###Load a different page for a certain non-WordPress-URL
This is a bit tricky, because if you want to have a custom link structure for some sections of your website, if they do not look like what WordPress knows, it will throw you a nice 404 not found response and will mess up both your SEO and your page (on some browsers like Internet Explorer, if it receives a 404, it displays their default 404 page). That's why first we have define a function like this:
{% highlight php %}<?php function include_wordpress_template($t) {
    global $wp_query;
    if ($wp_query->is_404) {
        $wp_query->is_404 = false;
        $wp_query->is_archive = true;
    }
    header("HTTP/1.1 200 OK");
    include($t);
}{% endhighlight %}
What this function does is it removes the 404 flag for WordPress, it sends the 200 OK header and then includes the requested template
{% highlight php %}<?php function my_template() {
    if ($_SERVER['REQUEST_URI'] == '/high-scores') {
        include_wordpress_template(TEMPLATEPATH . '/high-scores.php');
    }
}
add_action('template_redirect', 'my_template');{% endhighlight %}

What this function does is that if someone enters on `/high-scores`, it justs loads a certain template, without letting wordpress deciding whether it is a post or a page. It is extremly useful for embedding extra-functionality based on a custom link structure. It's like building a whole new attached to the structure of WordPress, but without needing to map it to the WordPress default entities such as "posts", "pages", "categories", "tags", etc.

##Where to go from here
This tutorial presented you some basic examples of how you can load custom templates depending on some given conditions. As you can see, the possibilities are limitless and this is where you must begin to make a simple WordPress blog become a complex website.

I recommend reading the WordPress Codex to find out what other cool functions you can use.
Some quick links for that are: <a href="http://codex.wordpress.org/Conditional_Tags" target="_blank">Conditional Tags</a>, <a href="http://codex.wordpress.org/Function_Reference/query_posts" target="_blank">Query posts</a>, <a href="http://codex.wordpress.org/Function_Reference" target="_blank">Function reference</a>
