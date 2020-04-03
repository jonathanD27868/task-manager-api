const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')


beforeEach(setupDatabase)

// test sign up ok
test('Should sign up a new user', async () => {
    const response = await request(app).post('/users').send({
        name: "moi jonjon",
        email: "john@example.fr",
        password: "SuperMotDePasse"
    }).expect(201)

    // Assert that the db was changed correctly
    const user = await User.findById(response.body.user._id)    
    expect(user).not.toBeNull()

    // Assertions about the response
    expect(response.body).toMatchObject({
        user:{
            name: 'moi jonjon',
            email: 'john@example.fr'
        },
        token: user.tokens[0].token
    })

    // test passport not to be plain text
    expect(user.password).not.toBe('SuperMotDePasse')
})

// test login ok
test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    // test user's token equals the new token created
    const user = await User.findById(response.body.user._id)
    expect(user.tokens[1].token).toBe(response.body.token)
})

// test login fail
test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: "blablalba"
    }).expect(400)
})

// test get user profile
test('Should get profile user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

// test not get user profile unauthenticated
test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer 892092345`)
        .send()
        .expect(401)
    })

// test delete account
test('Should delete account for user', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    
    // test user deleted correctly
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

// test not delete account for unauthenticated user
test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', ``)
        .send()
        .expect(401)
})

// test upload avatar image
test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', './tests/fixtures/profile-pic.jpg')
        .expect(200)

    // test compare binary image
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

// test update fields
test('Should update valid user fields', async () => {
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: "Franck"
        }).expect(200)
    
    const user = await User.findById(userOneId)
    expect(user.name).toEqual("Franck")
    //expect(user.name).toBe("Franck")
    //ou
    // expect(response.body.name).toBe("Franck")
})

// test update nonexistent field
test('Should not update nonexistent user fields', async () => {
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: "Franck"
        }).expect(400)
})


/******************************************************************************
                            Test Challenges
******************************************************************************/


// Should not signup user with invalid name/email/password
test('Should not signup user with invalid name', async () => {
    await request(app)
        .post('/users')
        .send({
            email: "test@example.fr",
            password: "SuperMotDePasse"
        })
        .expect(400)
})

test('Should not signup user with invalid email', async () => {
    await request(app)
        .post('/users')
        .send({
            name:"blalba",
            email: "test.fr",
            password: "SuperMotDePasse"
        })
        .expect(400)
})

test('Should not signup user with invalid password', async () => {
    await request(app)
        .post('/users')
        .send({
            name:"blalba",
            email: "test.fr",
            password: "ThePassword"
        })
        .expect(400)
})

// Not update user if unauthenticated
test('Should not update user if unauthenticated', async () => {
    await request(app)
        .patch('/users/me')
        .send({
            name: "Franck"
        }).expect(401)
})

// Should not update user with invalid name/email/password
test('Should not update user with invalid name', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: ""
        }).expect(400)
})

test('Should not update user with invalid email', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            email: "@example.com"
        }).expect(400)
})

test('Should not update user with invalid password', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            password: "worstpasswordEver"
        }).expect(400)
})

// Should not delete user if unauthenticated
test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', ``)
        .send()
        .expect(401)
})

