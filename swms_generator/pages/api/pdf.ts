import { NextApiHandler } from 'next';
import amqp from 'amqplib';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { body } = req;

    console.log(body);

    const queue = 'pdf';
    const msg = JSON.stringify({ data: body, pdf: 'swms' });

    const connection = await amqp.connect('amqp://admin:adminpassword@localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queue);
    await channel.sendToQueue(queue, Buffer.from(msg));
    await channel.close();
    await connection.close();
    res.status(200).json({ message: 'Success' });
  }
};

export default handler;
