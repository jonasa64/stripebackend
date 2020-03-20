const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')("SK_KEY");


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000 || process.env.PORT;



app.listen(port, () => console.log(`server stated on port ${port}`));


app.post('/payment', (req, res) => {
    const amount = req.body.amount;

    stripe.customers.create({
        email: req.body.email,
        source: req.body.stripeToken
    }).then(customer => stripe.charges.create({
        amount,
        description: "bought something from lauritz",
        currency: "dkk",
        customer: customer.id
    }).then(charge => res.send('payment was successful')).catch(err => res.send('Something went wrong')));


})




