<h3>Simple Inventory Management:</h3>
<p>Is a simple inventory management&nbsp;app to do the following:</p>
<ul>
<li>Add new items to the inventory.</li>
<li>Update a&nbsp;specific item.</li>
<li>Delete a specific&nbsp;item</li>
<li>List all items</li>
<li>Get a specific item</li>
<li>Let Items go in: add item&nbsp;quantity of an existing item</li>
<li>Let items come out: take items of the inventory</li>
</ul>
<p>&nbsp;</p>
<p>Technologies:</p>
<p>Nodejs, MongoDB, Angular, Mongoose, AWS ( Lambda - API Gateway), Serverless(serverless-stack.com)</p>
<p>To run this application, you have to create AWS account, and cache credentials as the following :</p>
<p>&gt;&nbsp;serverless config credentials --provider aws --key KKKKK --secret XXXXX</p>
<p>&gt; git clone&nbsp;https://github.com/elbassel/simple-inventory-app-serverless.git</p>
<p>&gt; cd&nbsp;simple-inventory-app-serverless</p>
<p>&gt;npm install</p>
<p>&gt; serverless deploy</p>
<p>&nbsp;</p>
<p>APIs:</p>
<ul>
<li>GET /items&nbsp; &nbsp; to get all items</li>
<li>Get /items/:id&nbsp; &nbsp; to get items by ID</li>
<li>PUT /items/:id&nbsp; &nbsp;to update an item</li>
<li>Post&nbsp; /items&nbsp; &nbsp; to create an item</li>
<li>Patch&nbsp; &nbsp;/items/:id/quantity?operation=goIn|comeOut
<ul>
<li>to let items go in inventory or come out&nbsp;of inventory</li>
</ul>
</li>
</ul>
<p>Then you will notice the functions are deployed and their APIs are listed in the terminal.</p>
<p>&nbsp;</p>
<p>You can find the front end part here:</p>
<p><a href="https://github.com/elbassel/simple-inventory-app/tree/master/front-end">https://github.com/elbassel/simple-inventory-app/tree/master/front-end</a></p>
<p>To be able to run the front end get the frontend folder:</p>
<p>&gt; git clone&nbsp;<a href="https://github.com/elbassel/simple-inventory-app.git">https://github.com/elbassel/simple-inventory-app.git</a></p>
<p>&gt; cd front-end</p>
<p>&gt; npm install</p>
<p>Then get the API base from the terminal when you tried to run serverless backend functions.</p>
<p>Replace the host variable the API base route of the&nbsp;serverless backend app:</p>
<p>File:&nbsp; simple-inventory-app&gt;front-end&gt;src&gt;app&gt;item-service</p>
<p>Then run &gt; ng serve</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
