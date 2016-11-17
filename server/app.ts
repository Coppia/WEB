import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as path from 'path';
import * as cors from 'cors';

// import { } from './routes';

const app: express.Application = express();

app.disable('x-powered-by');


app.use(json());

app.use(urlencoded({ extended: true }));

// allow cors only for local dev
app.use(cors({
  origin: 'http://localhost:4200'
}));



if (app.get('env') === 'production') {

  // in production mode run application from dist folder
  app.use('/assets', express.static(path.join(__dirname, '/../dist/client/assets'), {maxAge: 30}));
  app.use(express.static(path.join(__dirname, '/../dist/client')));

  // production error handler
  // no stacktrace leaked to user
  app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {

    res.status(err.status || 500);
    res.json({
      error: {},
      message: err.message
    });
  });
}

// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response, next) {
  let err = new Error('Not Found');
  next(err);
});


export { app };
