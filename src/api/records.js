export const postRecord = (record) => {
  return fetch('/records/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(record),
  }).then((res) => res.json());
};
