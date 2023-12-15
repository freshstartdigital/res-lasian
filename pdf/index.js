import amqp from 'amqplib';
import puppeteer from 'puppeteer';
import handlebars from 'handlebars';
import fs from 'fs';

const main = async () => {
  const connection = await amqp.connect('amqp://admin:adminpassword@res_rabbitmq_container');
  const channel = await connection.createChannel();
  await channel.assertQueue('pdf');
  await channel.prefetch(1);
  await channel.consume(
    'pdf',
    async (message) => {
      const content = JSON.parse(message.content.toString());

      const { pdf, data } = content;

      const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium', // Specify the path to Chromium
        args: ['--no-sandbox', '--disable-setuid-sandbox'] // Recommended args for running in Docker
      });
      try {
        const page = await browser.newPage();
        const contentTemplate = fs.readFileSync(`./${pdf}.handlebars`, 'utf8');
        const template = handlebars.compile(contentTemplate);
        const html = template(data);
        await page.setContent(html);

        await page.pdf({
          path: `./pdf/${data.name}.pdf`,
          format: 'A4',
          printBackground: true,
          scale: 1.0,
          margin: { top: 0, right: 0, bottom: 0, left: 0 },
          timeout: 90000,
          landscape: true
        });
      } catch (error) {
        console.log('hitting error', error);
      } finally {
        await browser.close();
        await channel.ack(message);
      }
    },
    { noAck: false }
  );
};

main();
