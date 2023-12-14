import amqp from 'amqplib';
import puppeteer from 'puppeteer';
import handlebars from 'handlebars';
import fs from 'fs';

const main = async () => {
    const connection = await amqp.connect('amqp://admin:adminpassword@rabbitmq_container');
    const channel = await connection.createChannel();
    await channel.assertQueue('pdf');
    await channel.prefetch(1);
    await channel.consume('pdf', async (message) => {
        const content = JSON.parse(message.content.toString());
        

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const contentTemplate = fs.readFileSync('./template.handlebars', 'utf8');
        const template = handlebars.compile(contentTemplate);
        const html = template(content);
        await page.setContent(html);
        await page.emulateMedia('screen');
        await page.pdf({
            path: `./pdf/${content.name}.pdf`,
            format: 'A4',
            printBackground: true
        });
        await browser.close();
        await channel.ack(message);

    }, { noAck: true });
}

main();