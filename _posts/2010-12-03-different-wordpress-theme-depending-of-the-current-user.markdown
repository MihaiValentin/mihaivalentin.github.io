---
layout: post
title: Different Wordpress theme, depending of the current user
categories:
- work
- blog
tags: []
meta:
  year: '2010'
  dev: WordPress, PHP
---

* Let's say you have a busy WordPress site.
* Let's say you want to add/remove/change some templates, pages or scripts inside your theme.
* Let's say you even want to create a new design or even try new themes to see how they get along with your page.
* **All of this without any other visitor or user noticing!**

##How?

Using my WordPress theme switch plugin you can do all the things mentioned above, and whenever you're done, you just begin using that theme.

##How does it work?
<img title="wordpress theme switch" src="/wp-content/uploads/2010/12/wordpress-theme-switch.gif" alt="" width="580" height="171" />

##Download plugin
<a href="/wp-content/uploads/2010/12/mv-theme-switch.zip">Click here to download the WordPress plugin</a>

##Configure the plugin
This plugin is aimed for web developers. It does not have an option page, but you can easily configure it's two parameters by editing it's source:

* **the user name** for which a different theme will be shown (line 11 in the source code below)
* **that theme's name** (the name of the folder which is in) (line 12 in the source code below)
{% highlight php %}
<?php
/*
Plugin Name: WP User theme switch - Different theme for a particular user
Plugin URI: https://www.mihaivalentin.com/different-wordpress-theme-depending-of-the-current-user/
Description: Useful for developing new versions of the site. The admin user will se the theme he works on, and the normal users will continue to see the normal theme.
Version: 1.0
Author: Mihai Valentin
Author URI: https://www.mihaivalentin.com/
*/
$mv_theme_switch = array(
  'user' => 'insert user for which you want to show a different theme here',
  'theme' => 'insert the "different" theme here'
);
require_once (ABSPATH . WPINC . '/pluggable.php');
global $current_user;
get_currentuserinfo();
function mv_theme_switch_callback($t) {
  global $mv_theme_switch;
  return $mv_theme_switch['theme'];
}
if ($current_user->user_login == $mv_theme_switch['user']) {
  add_filter('stylesheet', 'mv_theme_switch_callback');
  add_filter('template', 'mv_theme_switch_callback');
}
?>
{% endhighlight %}
For example:
{% highlight php %}
<?php
$mv_theme_switch = array(
  'user' => 'admin',
  'theme' => 'copy_of_current'
);
?>
{% endhighlight %}
This means that the user *admin* will be seeing the theme from *wp-content/themes/<strong>copy_of_current</strong>*, while the normal visitors will see the normal theme, the one set in *Appearance - Themes* in WordPress.
