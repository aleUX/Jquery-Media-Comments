# jQuery Media Comments

Why?

Good question, this is more of a proof of concept, although a similar end result is obtained using Response.js, this takes a slightly different approach in that it adds media query capability to conventional html comments, this allows for no critical elements to be injected into the dom only when required, assets of the elements also do not get loaded until the Media Query is satified and the element is inserted into the dom.

##Instalation

jQuery Media Comments is dependant on jQuery so should be included in your source code after the jQuery library

    <script src="/path/to/jquery.media.comments.js"></script>

##Usage

Intialize the plugin by passing it a css selector to define the dom element to search for media queries

	$(function(){
	    $('.mediacomments').mediacomments({timeout:1});
	});

Simply wrap a section of code in a comment and add a media query to the same line as the opening comment tag

    <!-- @media only all and (min-width:400px)
	    <p>
		    <h2>Hello World !!</h2>
	    </p>
    -->

The plugin will scan the dom for comments that contain a media query then inject the contents of the comment into the dom at the same position as the comment when the media query is satisfied

## Options

Currently just a single option to set the timeout that the plugin should wait after the window resize event has finnished before firing, this was put in place to stop the wondow.resize event firing thousands of times during a window resize

## Limitations

Because jQuery Media Comments is based on html comments we are still bound by the rules of html, comments cannot be nested and so neither can Media Comment.

## Author
[Steve Podmore](https://github.com/Podders)





