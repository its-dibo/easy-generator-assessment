import { AppModule } from './app.module.js';
import { createApp } from '@impactor/nest/create-app.js';

await createApp(AppModule, {
  package: import.meta.dirname,
  cors: {
    origin: process.env.APP_URLS?.split(' ')
      .map((el) => el.trim())
      .filter(Boolean),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',
  },
  validationPipe: {
    whitelist: false,
    forbidNonWhitelisted: false,
  },
});
