/* import 'dotenv/config'

import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
    options: { timeout: 5000, idempotencyKey: 'abc' }
});

export async function paymentRoutes(app) {
    app.post('/', async (request, reply) => {
        try {
            const payment = new Payment(client);

            const {
                transaction_amount,
                token,
                description,
                installments,
                payment_method_id,
                issuerId,
                email,
                identificationType,
                number
            } = request.body


            const body = {
                transaction_amount,
                token,
                description,
                installments,
                payment_method_id,
                issuer_id: issuerId,
                payer: {
                    email,
                    identification: {
                        type: identificationType,
                        number
                    }
                }
            }

            const requestOptions = {
                idempotencyKey: client.options.idempotencyKey
            };

            payment.create({
                body, requestOptions
            })
                .then(result => console.log(result))
                .catch(error => console.log(error));

            return reply.status(201).send()
        } catch (error) {
            return reply.status(400).send(error.issues)
        }
    })


} */