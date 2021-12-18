import React, { useEffect, useState } from 'react';

export default function CreateExercise(onCreate = (f) => f) {
  const [message, setMessage] = useState();
  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setMessage(data));
  });
  return (
    <div className="App">
      <h1>front end</h1>
      <p>{message}</p>
    </div>
    // <>
    //   <h1>種目登録</h1>
    //   <p>名前</p>
    //   <input id="createExercise" type="text" />
    //   <button
    //     style={{ width: 60, height: 20 }}
    //     onClick={() => onCreate(document.getElementById('searchUser').value)}
    //     type="submit"
    //   >
    //     登録
    //   </button>
    // </>
  );
}
