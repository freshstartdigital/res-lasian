import amqp from 'amqplib';
import puppeteer from 'puppeteer';
import handlebars from 'handlebars';
import fs from 'fs';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fetch from 'node-fetch';

const main = async () => {
  const connection = await amqp.connect('amqp://admin:adminpassword@res_rabbitmq_container');
  const channel = await connection.createChannel();
  await channel.assertQueue('pdf');
  await channel.prefetch(1);
  await channel.consume(
    'pdf',
    async (message) => {
      const content = JSON.parse(message.content.toString());
      console.log('content', content);
      const { pdf, data, id } = content;

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
        const urlSafeName = data.name.replace(/ /g, '_');

        const pdfStream = await page.pdf({
          format: 'A4',
          printBackground: true,
          scale: 1.0,
          margin: { top: 0, right: 0, bottom: 0, left: 0 },
          timeout: 90000,
          landscape: true
        });

        const s3Client = new S3Client({ region: 'ap-southeast-2' });

        const uploadParams = {
          Bucket: 'reslasian',
          Key: `${urlSafeName}.pdf`,
          Body: pdfStream
        };
        const uploadCommand = new PutObjectCommand(uploadParams);
        const uploadResponse = await s3Client.send(uploadCommand);

        await fetch('http://api:8080/swms/file', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: id,
            file_name: `${urlSafeName}.pdf`,
            file_path: ``
          })
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

main().catch((error) => {
  console.error('error initialising', error);
});
