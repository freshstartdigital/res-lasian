import { NextApiHandler } from 'next';
import amqp from 'amqplib';
import { Config } from '@/lib/config';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { body } = req;

    console.log(body);

    const path = new Config().apiUrl;

    const response = await fetch(`${path}/swms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const data = await response.text();
      console.log('Go api error', data);
      res.status(500).json({ message: 'Error' });
      return;
    }

    const data = await response.json();

    console.log('Go api response', data);

    const queue = 'pdf';

    try {
      const msg = JSON.stringify({ data: body.swms_data, pdf: 'swms', id: data });

      const connection = await amqp.connect('amqp://admin:adminpassword@localhost');
      const channel = await connection.createChannel();
      await channel.assertQueue(queue);
      await channel.sendToQueue(queue, Buffer.from(msg));
      await channel.close();
      await connection.close();

      res.status(200).json({ message: 'Success' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error' });
    }
  }
};

export default handler;
