const TRC_MSG = {};

const DBG_MSG = {
  QUERY_EXEC: 'query execute',
};

const INF_MSG = {
  SERVER_STARTED: 'server is started on port',
  DB_CONNECTED: 'connected to a database',
};

const WRN_MSG = {};

const ERR_MSG = {};

const FTL_MSG = {};

Object.freeze(TRC_MSG, DBG_MSG, INF_MSG, WRN_MSG, ERR_MSG, FTL_MSG);

module.exports = { INF: INF_MSG, DBG: DBG_MSG };
