---
layout: post
title: WordPress tutorial - Making TinyMCE easier to use for content editors (using
  styles)
categories:
- blog
tags: []
---
If you are a WordPress theme designer and plugin developer then you surely know that the content editors usually have problems creating great-looking content for the blog.

What if they could apply nice styles to the text and pictures inside posts by just pressing one button? This tutorial helps you build them "that button".

For this example, I will allow the content editors to use the following styles:

* add a nice frame to images
* make text look like a notification
* layout text on left or on right columns
* and of course, reset the previously applied styles

As these styles are based entirely on CSS, the possibilities are endless. So to say, they may never touch other button on the toolbar, besides "Styles".

##First step - creating the CSS file containing the styles
As the title says, create post-styles.css file in your theme's directory. Use the code following code:.

{% highlight css %}.postReset {
    padding: 0;
    background: none;
    border: 0;
    width: auto;
    margin: 0;
    text-align: left;
}

.postNiceFrame {
    padding: 3px;
    background: #fff;
    border: 1px solid #ddd;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
}

.postAttention {
    background: none repeat scroll 0 0 #FFFFB1;
    border: 1px solid #D6D54D;
    padding: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
}

.postLeftColumn {
    width: 47%;
    margin-right: 3%;
    text-align: justify;
    float: left;
}

.postRightColumn {
    width: 47%;
    text-align: justify;
    float: right;
}{% endhighlight %}

##Second step - modify TinyMCE editor to display a "Styles" box
Paste the following code in your <strong>functions.php</strong> of your theme. I will explain it below.

{% highlight php %}<?php
/* Section 1 */
add_filter( 'mce_buttons', 'add_more_editor_buttons', 999 );
function add_more_editor_buttons($orig) {
    array_unshift ($orig, 'styleselect');
    return $orig;
}

/* Section 2 */
add_filter( 'tiny_mce_before_init', 'add_editor_styles' );
function add_editor_styles( $init_array ) {
    $arr = array(
        "Reset styles" => "postReset",
        "Nice Frame" => "postNiceFrame",
        "Attention" => "postAttention",
        "Left column" => "postLeftColumn",
        "Right column" => "postRightColumn"
    );
    $arrq = array();
    foreach($arr as $k=>$v) {$arrq[] = $k."=".$v;}
    $f = implode(";", $arrq);
    $init_array['theme_advanced_styles'] = $f;
    return $init_array;
}

/* Section 3 */
add_filter('mce_css', 'add_editor_new_css');
function add_editor_new_css() {
    return get_bloginfo('stylesheet_directory')."/post-styles.css";
}

/* Section 4 */
add_action('wp_print_styles', 'add_my_stylesheet');
function add_my_stylesheet() {
    wp_register_style('myStyleSheets', get_bloginfo('stylesheet_directory')."/post-styles.css");
    wp_enqueue_style( 'myStyleSheets');
}{% endhighlight %}

###Section 1 - Adding the "Styles" drop-down to the TinyMCE editor
TinyMCE can have a lot of toolbar buttons. Only few of them are added by default in WordPress, but many others can be added using the `mce_buttons` filter. The callback function provides an array with the existent buttons, to which you can append/prepend/insert new ones. In the first section of our code, we insert the button called `styleselect`. However, the drop-down will be empty, and we will fill it in the next section.

<img title="styles" src="/wp-content/uploads/2010/12/styles.gif" alt="" width="282" height="43" />

*Just as a side-note, there are a lot of buttons you can add, and <a href="http://tinymce.moxiecode.com/wiki.php/Buttons/controls" target="_blank">here is the list</a>*

###Section 2 - Filling the "Styles"  drop-down with the actual styles that will be used
The `tiny_mce_before_init` filter allows you to change some settings just before the editor is initialized.

As you can see, it begins with a key=>value array. The keys represent the title of the option of the drop-down and the value represents the CSS class that will be used to style the selected element. You can see that all the styles listed here have been defined in `post-styles.css`, at step 1.

<img src="/wp-content/uploads/2010/12/wordpress-tinymce-populate-styles-drop-down.gif" alt="" width="573" height="196" />

###Section 3 - Include post-styles.css in TinyMCE
This step is pretty much self-explanatory, and all it does is adding <em>post-styles.css</em> to TinyMCE, in order for the effect of the styles to be visible in the editor.

###Section 4 - Include post-styles.css in all your WordPress pages
Also self-explanatory, as you must add  `post-styles.css` to all your WordPress pages, in order for the posts using these styles to be displayed correctly.

##Third step - Test it and show it to your content editor(s)
It's really easy to use and they (even you) can get very good looking content with a minimum amount of work.

<img src="/wp-content/uploads/2010/12/wordpress-tinymce-styles-example.jpg" alt="" width="580" height="513" />

