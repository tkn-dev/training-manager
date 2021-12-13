import React from 'react';

export default function CreateExercise(onCreate = (f) => f) {
  return (
    <>
      <h1>種目登録</h1>
      <p>名前</p>
      <input id="createExercise" type="text" />
      <button
        style={{ width: 60, height: 20 }}
        onClick={() => onCreate(document.getElementById('searchUser').value)}
        type="submit"
      >
        登録
      </button>
    </>
  );
}
