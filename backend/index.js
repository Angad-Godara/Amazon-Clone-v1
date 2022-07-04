const express = require('express')
const bp = require('body-parser')
require('dotenv').config()
const app = express()
const port = process.env.PORT

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

var cors = require('cors')
app.use(cors())

const stripe = require('stripe')(process.env.STRIPE_API);

app.post('/processing', async (req, res) => {
    try {
        const { total } = req.body
        if (total === 0) {
            return res.json(`can't pay the amount zero`)
        }
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'inr',
            payment_method_types: ['card'],
        });
        if (paymentIntent.client_secret) {
            res.json(paymentIntent)
        }
    } catch (error) {
        res.status(401).json(error);
    }
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})