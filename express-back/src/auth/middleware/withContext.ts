import {ICtx} from "../utils/types";

const jwt = require('jsonwebtoken');
const withContext = (req, res, next) => {
  const rawToken = req.header('authorization');
  console.log('TOKEN: ', rawToken);
  if (rawToken) {
    const token = rawToken.split('Bearer ')[1];
    const decoded = jwt.verify(token, 'secret');
    const ctx: ICtx = {
      email: decoded.email,
    };
    req.ctx = ctx;
  }
  next();
};

export default withContext;
