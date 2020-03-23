const sgMail = require('@sendgrid/mail')

// set the api key
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// welcome message
const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'dastot.jonathan@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

// cancelation message
const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'dastot.jonathan@gmail.com',
        subject: 'Bye bye',
        text: 'See the html below',
        html: `<h1>Goodbye ${name}!</h1><p>Please let us know why you are leaving the app</p>`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}


