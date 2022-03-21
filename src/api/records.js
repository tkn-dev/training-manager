export const getRecordsSpecifiedMonth = (curtYear, curtMon) => {
  const pvYearMon = () => {
    if (curtMon === 1) return `${curtYear - 1}-12`;
    return `${curtYear}-${curtMon - 1}`;
  };
  const nxYearMon = () => {
    if (curtMon === 12) return `${curtYear + 1}-1`;
    return `${curtYear}-${curtMon + 1}`;
  };
  return fetch('/records/search/specified-month', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prevYearMonth: pvYearMon(),
      nextYearMonth: nxYearMon(),
    }),
  }).then(async (res) => {
    const ret = await res.json();
    ret.status = res.status;
    return ret;
  });
};

export const postRecord = (record) => {
  return fetch('/records/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(record),
  }).then(async (res) => {
    const ret = await res.json();
    ret.status = res.status;
    return ret;
  });
};
