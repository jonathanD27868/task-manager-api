# Task Manager API

The API is hosted at:
https://d27868-node-2-task-manager-api.herokuapp.com/
<br><br>
<h1>The different usable url paths:</h1>
    <h2>Users paths</h2>
    <ul>
        <li>
            <h3>Create a user</h3>
            <h4>Method & path:</h4>
            <p>POST /users</p>
            <h4>Data needed:</h4>
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
        </li>
        <li>
            <h3>login a user</h3>
            <h4>Method & path:</h4>
            <p>POST /users/login</p>
            <h4>Data needed:</h4>
            <pre>
                {
                    "email":"john@example.com",
                    "password":"SuperMotDePasse"
                } 
            </pre>
            <h4>Returned data:</h4>
            <pre>
                The same than the ones returned while creating a user
            </pre>
        </li>
        <li>
            <h3>Logout a user</h3>
            <h4>Method & path:</h4>
            <p>POST /users/logout</p>
            <p>The user is logged out using its token</p>
        </li>
        <li>
            <h3>Logout a user from all devices</h3>
            <h4>Method & path:</h4>
            <p>POST /users/logoutAll</p>
            <h4>Data needed:</h4>
            <p>The user is logged out from all its devices using its tokens</p>
        </li>
        <li>
            <h3>Update a user</h3>
            <h4>Method & path:</h4>
            <p>PATCH /users/me</p>
            <h4>Data needed:</h4>
            <P>You can update the name, age, email or password</P>
            <pre>
                {
                    "age": 33,
                    "name": "miky",
                }
            </pre>
            <p>Password conditions:</p>
            <ul>
                <li>Must not contain the word "password"</li>
                <li>Must contain, at least, 7 characters</li>
            </ul>
            <h4>Returned data:</h4>
            <pre>
                {
                    "user": {
                        "age": 33,
                        "_id": "5e883e7...",
                        "name": "miky",
                        "email": "john@example.com",
                        "createdAt": "2020-04-04T07:59:53.719Z",
                        "updatedAt": "2020-04-04T07:59:53.758Z",
                        "__v": 1
                    },
                    "token": "eyJhbGciOi..."
                }
            </pre>
        </li>
        <li>
            <h3>Delete a user</h3>
            <h4>Method & path:</h4>
            <p>DELETE /users/me</p>
            <h4>Data needed:</h4>
            <p>The token is used</p>
            <h4>Returned data:</h4>
            <pre>
                {
                    "user": {
                        "age": 33,
                        "_id": "5e883e7...",
                        "name": "miky",
                        "email": "john@example.com",
                        "createdAt": "2020-04-04T07:59:53.719Z",
                        "updatedAt": "2020-04-04T07:59:53.758Z",
                        "__v": 1
                    },
                    "token": "eyJhbGciOi..."
                }
            </pre>
        </li>
        <li>
            <h3>Read profile</h3>
            <h4>Method & path:</h4>
            <p>GET /users/me</p>
            <h4>Data needed:</h4>
            <p>The token is used</p>
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
        </li>
        <li>
            <h3>Adding an avatar</h3>
            <h4>Method & path:</h4>
            <p>POST /users/me/avatar</p>
            <h4>Data needed:</h4>
            <p>enctype="multipart/form-data", the key must be named "avatar"</p>
        </li>
        <li>
            <h3>Delete an avatar</h3>
            <h4>Method & path:</h4>
            <p>DELETE /users/me/avatar</p>
            <h4>Data needed:</h4>
            <p>The token is used</p>
        </li>
    </ul>
    <h2>Tasks paths</h2>
    <ul>
        <li>
            <h3>Create a task</h3>
            <h4>Method & path:</h4>
            <p>POST /tasks</p>
            <h4>Conditions:</h4>
            <p>User must be connected and have a token</p>
            <h4>Data needed:</h4>
            <pre>
                {
                    "description": "First",
                    "completed": false
                }
            </pre>
            <p>The "completed" key is not required, its default value is false.</p>
            <h4>Returned data:</h4>
            <pre>
                {
                    "completed": false,
                    "_id": "5e884...",
                    "description": "First",
                    "owner": "5e883e7...",
                    "createdAt": "2020-04-04T09:05:42.877Z",
                    "updatedAt": "2020-04-04T09:05:42.877Z",
                    "__v": 0
                }
            </pre>
        </li>
        <li>
            <h3>Read a specific task</h3>
            <h4>Method & path:</h4>
            <p>GET /tasks/:id'</p>
            <h4>Conditions:</h4>
            <p>replace /:id in the url by the id's task</p>
            <h4>Returned data:</h4>
            <pre>
                {
                    "completed": false,
                    "_id": "5e884...",
                    "description": "First",
                    "owner": "5e883e7...",
                    "createdAt": "2020-04-04T09:05:42.877Z",
                    "updatedAt": "2020-04-04T09:05:42.877Z",
                    "__v": 0
                }
            </pre>
        </li>
        <li>
            <h3>Read all the tasks</h3>
            <h4>Method & path:</h4>
            <p>GET /tasks</p>
            <h4>Data needed:</h4>
            <p>The token is used</p>
            <h4>Returned data:</h4>
            <p>A table of task objects is returned</p>
            <pre>
                [
                    {
                        "completed": false,
                        "_id": "5e884...",
                        "description": "First",
                        "owner": "5e883e7...",
                        "createdAt": "2020-04-04T09:05:42.877Z",
                        "updatedAt": "2020-04-04T09:05:42.877Z",
                        "__v": 0
                    }
                ]
            </pre>
            <h4>Options</h4>
            <ul>
                <li>
                    <h6>Filtering your tasks</h6>
                    <p>To fetch only the complete/incomplete tasks use the completed key in the query with true or false</p>
                    <p>/tasks?completed=false</p>
                </li>
                <li>
                    <h6>Sortering your tasks</h6>
                    <p>You can sort your tasks by description/completed/createdAt/updatedAt</p>
                    <ul>
                        <li>/tasks?sortBy=description:desc</li>
                        <li>/tasks?sortBy=completed:desc</li>
                        <li>/tasks?sortBy=createdAt:desc</li>
                        <li>/tasks?sortBy=updatedAt:desc</li>
                    </ul>
                    <p>:desc => descending order, :asc => ascending order</p>
                </li>
            </ul>
        </li>
        <li>
            <h3>Update a task</h3>
            <h4>Method & path:</h4>
            <p>PATCH /tasks/:id'</p>
            <h4>Conditions:</h4>
            <p>Replace /:id in the url by the id's task</p>
        </li>
        <li>
            <h3>Delete a task</h3>
            <h4>Method & path:</h4>
            <p>DELETE /tasks/:id'</p>
            <h4>Conditions:</h4>
            <p>Replace /:id in the url by the id's task</p>
        </li>
        <li>
            <h3>Add a picture to a task</h3>
            <h4>Method & path:</h4>
            <p>POST /tasks/:id/picture</p>
            <h4>Conditions:</h4>
            <p>replace /:id/ in the url by the id's task</p>
            <h4>Data needed:</h4>
            <p>enctype="multipart/form-data", the key must be named "taskPicture"</p>
            <h4>Returned data:</h4>
            <pre>
                {
                    "completed": false,
                    "_id": "5e884...",
                    "description": "First",
                    "owner": "5e883e7...",
                    "createdAt": "2020-04-04T09:05:42.877Z",
                    "updatedAt": "2020-04-04T10:11:39.660Z",
                    "__v": 0
                }
            </pre>
        </li>
        <li>
            <h3>Display task's picture</h3>
            <h4>Method & path:</h4>
            <p>GET /tasks/:id/picture</p>
            <h4>Conditions:</h4>
            <p>replace /:id/ in the url by the id's task</p>
            <h4>Returned data:</h4>
            <p>Return the picture</p>
        </li>
        <li>
            <h3>Delete task's picture</h3>
            <h4>Method & path:</h4>
            <p>DELETE /tasks/:id/picture</p>
            <h4>Conditions:</h4>
            <p>Replace /:id/ in the url by the id's task</p>
            <h4>Returned data:</h4>
            <p>Return the task</p>
            <pre>
                {
                    "completed": false,
                    "_id": "5e884...",
                    "description": "First",
                    "owner": "5e883e7...",
                    "createdAt": "2020-04-04T09:05:42.877Z",
                    "updatedAt": "2020-04-04T10:20:43.254Z",
                    "__v": 0
                }
            </pre>
        </li>

    </ul>
