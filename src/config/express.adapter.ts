import express, {Application} from 'express';
import cors from 'cors';
import { AppRoutes } from '../presentation/routes';

export const createExpressApp = (): Application => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use("api/", AppRoutes.routes);

    return app;

};