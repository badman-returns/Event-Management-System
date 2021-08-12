import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';
import express, { NextFunction, Response, Request } from 'express';
import MasterTables from './database/createTablesAndInsertMasterData';
import { PublicRouter } from './routes';
import { AdminRouter } from './routes';
const dotenv = require('dotenv');
dotenv.config();

class App {
  public app: express.Application;
  public apiV1Routes: express.Router;

  constructor() {
    this.app = express();
    this.apiV1Routes = express.Router();
    this.initializeMiddlewares();
    this.initializeLogger();
    this.initializeErrorHandling();
    this.routes();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.raw());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(logger('[:date[web]] :method :url :status :res[content-length] - :remote-addr - :response-time ms'));
  }

  private initializeErrorHandling() {

  }

  private initializeLogger() {
    const LOG_PREFIX = new Date().getDate() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getFullYear() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
    const log = console.log;
    console.log = function () {
      const args = Array.from(arguments);
      args.unshift(LOG_PREFIX + ": ");
      log.apply(console, args);
    }
  }


  public async createDefaultTables() {
    try {

      console.log(`Creating User Table and Super Admin User...`);
      await MasterTables.createUserTableAndSuperAdminUser();

      console.log(`Creating Events Table`);
      await MasterTables.createEventsTable();

      console.log(`Creating Participants Table`);
      await MasterTables.createParticipantsTable();

    } catch (error) {
      throw new Error(error);
    }
  }

  private routes() {
    this.app.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.send('Event Management System');
    });
    this.app.use('/api/v1', this.apiV1Routes);
    this.apiV1Routes.use('/', PublicRouter);
    this.apiV1Routes.use('/admin', AdminRouter);
  }
}

export default App;