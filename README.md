# Task Manager API

The API is hosted at:
https://d27868-node-2-task-manager-api.herokuapp.com/
<br><br>
<h2>The different usable url paths and explanations are coming soon</h2>
<ul>
    <li>
        <h3>Create a user</h3>
        <h4>Method & path:</h4>
        <p>POST /users</p>
        <h4>data needed:</h4>
        <pre>
            {
                "name": "john",
                "email": "john@example.com",
                "password": "SuperMotDePasse"
            }
        </pre>
        <p>You should receive an email as soon as the user is created</p>
        <p>Password conditions:</p>
        <ul>
            <li>Must not contain the word "password"</li>
            <li>Must contain, at least, 7 characters</li>
        </ul>
    </li>
    <h4>Returned data:</h4>
    <pre>
        {
            "user": {
                "age": 0,
                "_id": "5e883e7...",
                "name": "john",
                "email": "john@example.com",
                "createdAt": "2020-04-04T07:59:53.719Z",
                "updatedAt": "2020-04-04T07:59:53.758Z",
                "__v": 1
            },
            "token": "eyJhbGciOi..."
        }
    </pre>
    <p>In case of of error an "errors" key is send back</p>
    <li>
        <h3>login a user</h3>
        <h4>Method & path:</h4>
        <p>POST /users/login</p>
        <h4>data needed:</h4>
        <pre>
            {
                "email":"john@example.com",
                "password":"SuperMotDePasse"
            } 
        </pre>
        <h4>returned data:</h4>
        <pre>
            The same than the ones returned while creating a user
        </pre>
    </li>
    <li>
        <h3>logout a user</h3>
        <h4>Method & path:</h4>
        <p>POST /users/logout</p>
        <p>The user is logged out using its token</p>
    </li>
    <li>
        <h3>logout a user from all devices</h3>
        <h4>Method & path:</h4>
        <p>POST /users/logoutAll</p>
        <h4>data needed:</h4>
        <p><p>The user is logged out from all its devices using its tokens</p></p>
    </li>
</ul>
