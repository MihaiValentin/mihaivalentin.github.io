---
layout: post
title: Varnish configuration for WordPress
categories:
- blog
tags: []
---
Varnish is a HTTP accelerator that sits between the Visitor and your server. It's sole purpose is to cache the common requests and serve them faster, easing the work the backend server has to do.
I will list here a Varnish configuration suitable for a 5000 visitors/day WordPress Blog. It's cache hit rate is 95.6%, that means that only 4.4% of the requests reach the backend and use it's resources.
{% highlight cpp %}backend default {
    .host = "127.0.0.1";
    .port = "8080";
}
sub vcl_recv {
    /* These rules will apply for all the requests served */
    /* Post requests will not be cached */
    if (req.request == "POST") {
        return (pass);
    }
    /* Normalize encoding/compression */
    if (req.http.Accept-Encoding) {
        if (req.http.Accept-Encoding ~ "gzip") { set req.http.Accept-Encoding = "gzip";    }
        elsif (req.http.Accept-Encoding ~ "deflate") { set req.http.Accept-Encoding = "deflate"; }
        else { remove req.http.Accept-Encoding;    /* unknown algorithm, just remove */ }
    }
    /* Host: www.mysite.com; these rules will apply only for mysite.com */
    if (req.http.host ~ "^(?:www\.)?mysite.com") {
        unset req.http.vary;
        /* Remove the following line if your site is serving content in the language it reads from the Accept-Language header */
        unset req.http.accept-language;
        /* If I am logged in to wordpress, I DO NOT WANT TO SEE cached pages */
        if (req.http.cookie ~ "wordpress_logged_in") {
            return (pass);
        } else {    /* If I'm just a regular visitor */
            /* If the request is for pictures, javascript, css, etc */
            if (req.url ~ "\.(jpg|jpeg|png|gif|css|js)$") {
                /* Remove the cookie and make the request static */
                unset req.http.cookie;
                return (lookup);
            }
            /* Try to lookup in the cache */
            return (lookup);
        }
    }
    /* If the host header is empty, just return error */
    error 404 req.http.host;
    return (lookup);
}
sub vcl_fetch {
    /* Host: www.mysite.com */
    if (req.http.host ~ "^(?:www\.)?mysite.com") {
        /* Do not cache POST requests */
        if (req.request == "POST") {
            return (pass);
        }
        /* If the request is for pictures, javascript, css, etc */
        if (req.url ~ "\.(jpg|jpeg|png|gif|css|js)$") {
            /* Cache it, and make it last 2 hours */
            set beresp.ttl = 7200s;
            /* Make the request static by removing any cookies set by those static files */
            unset beresp.http.set-cookie;
            /* Deliver the cached object */
            return (deliver);
        }
        /* If I am logged in to wordpress, I DO NOT WANT TO SEE cached pages */
        if (req.http.cookie ~ "wordpress_logged_in") {
            return (pass);
        } else {
            /* Cache anything for 2 minutes. When the cache expires it will be cached again and again, at the time of the request */
            set beresp.ttl = 120s;
            return (deliver);
        }
    }
}{% endhighlight %}
