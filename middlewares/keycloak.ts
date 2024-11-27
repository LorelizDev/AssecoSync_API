import Keycloak from 'keycloak-connect';
import session from 'express-session';
import { app } from '../app';
import { SESSION_SECRET } from '../config';

const memoryStore = new session.MemoryStore();

const keycloak = new Keycloak({ store: memoryStore });

app.use(
  session({
    secret: SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

app.use(keycloak.middleware());

export default keycloak;
