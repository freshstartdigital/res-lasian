export class Config {
  apiUrl: string;
  rabbitMQUrl: string | undefined;

  constructor() {
    this.apiUrl =
      process.env.NODE_ENV == 'production' ? 'http://api:8080' : 'http://localhost:8080';
  }

  async getRabbitURL() {
    this.rabbitMQUrl =
      process.env.NODE_ENV == 'production'
        ? 'amqp://admin:adminpassword@res_rabbitmq_container'
        : 'amqp://admin:adminpassword@localhost';
    return this;
  }
}
