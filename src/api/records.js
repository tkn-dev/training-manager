export const postRecord = (record) => {
  return fetch('/records/api', {
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
