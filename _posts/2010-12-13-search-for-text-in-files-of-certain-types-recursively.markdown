---
layout: post
title: Search for text in files of certain types, recursively
categories:
- blog
tags: []
---
Suppose you want to search a whole directory (and it's sub-directories) for files of certain type containing a certain string.

As `grep -r "test" *.php` will fail, because `*.php` will not match the sub-directories at all, and only provide results from the current directory, you can use the following function. Just add the code below in your home directory's `.bashrc` file:

{% highlight bash %}function findt() { find . -name "$2" -print | xargs grep "$1" --color=ALWAYS ;}{% endhighlight %}
Restart your session and you can use it like this:
{% highlight bash %}findt "function" "*.php"
findt "System.exit" "*.java"{% endhighlight %}
