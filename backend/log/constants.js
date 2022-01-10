const TRC_MSG = {};

const DBG_MSG = {
  QUERY_EXEC: 'query execute:',
  QUERY_RESULT: 'query returned:',
  FUNC_EXEC: 'execute function:',
  FUNC_RESULT: 'function returned:',
};

const INF_MSG = {
  SERVER_STARTED: 'server is started on port:',
  DB_CONNECTED: 'connected to a database',
};

const WRN_MSG = {};

const ERR_MSG = {};

const FTL_MSG = {};

Object.freeze(TRC_MSG, DBG_MSG, INF_MSG, WRN_MSG, ERR_MSG, FTL_MSG);

module.exports = { INF_MSG, DBG_MSG };
