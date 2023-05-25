## HTML Forms and Inputs

One of the most interactive parts of a website is a form. It is through forms that users can send data back to the server or interact with web pages.

### What are HTML Forms?

In HTML, a form is created using the form tag. It's a way to allow users to send data to a server. The form element can contain various types of input elements like text fields, checkboxes, radio-buttons, submit buttons and more.

An HTML form is typically written as follows:

`<form>`  
 `<!-- Form inputs go here -->`  
`</form>`

### Creating a Simple Form

Let's start by creating a simple form with a few different types of inputs. Here's how we can write a form in HTML:

`<form action="/submit_form" method="post">`  
 `<label for="fname">First name:</label><br>`  
 `<input type="text" id="fname" name="fname"><br>`  
 `<label for="lname">Last name:</label><br>`  
 `<input type="text" id="lname" name="lname">`  
 `<input type="submit" value="Submit">`  
`</form>`

### Different Types of Input

HTML provides various types of inputs, each with its own unique role. Here are a few examples:

-  Text: for a single-line text input, you can use `<input type="text">`
-  Radio: for a radio button, you can use `<input type="radio">`
-  Checkbox: for a checkbox, you can use `<input type="checkbox">`
-  Submit: for a submit button, you can use `<input type="submit">`
