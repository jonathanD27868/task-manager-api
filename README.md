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
        <p>Password conditions:</p>
        <ul>
            <li>Must not contain the word "password"</li>
            <li>Must contain, at least, 7 characters</li>
        </ul>
    </li>
</ul>
