export const getRecordsBySpecifiedMonth = async (curtYear, curtMon) => {
  const pvYearMon = () => {
    if (curtMon === 1) return `${curtYear - 1}-12`;
    return `${curtYear}-${curtMon - 1}`;
  };
  const nxYearMon = () => {
    if (curtMon === 12) return `${curtYear + 1}-1`;
    return `${curtYear}-${curtMon + 1}`;
  };
  const res = await fetch('/records/get/specified-month', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prevYearMonth: pvYearMon(),
      nextYearMonth: nxYearMon(),
    }),
  });
  const ret = await res.json();
  ret.status = res.status;
  return await ret;
};

export const getRecordsByDate = async (date) => {
  const res = await fetch('/records/get/date', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      date: date,
    }),
  });
  const ret = await res.json();
  ret.status = res.status;
  return await ret;
};

export const postRecord = async (record) => {
  const res = await fetch('/records/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(record),
  });
  const ret = await res.json();
  ret.status = res.status;
  return await ret;
};
