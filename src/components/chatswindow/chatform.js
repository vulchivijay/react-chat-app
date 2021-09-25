import React, { useState } from 'react';
import firebase from './../../auth/firebase';

function ChatForm (props) {
  const channel = props.currentChannel;
  const messagesRef = props.messagesRef;
  const user = props.currentUser;
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);
  
  const handleChange = event => {
    setMsg(event.target.value)
  }

  const createMessage = () => {
    console.log('test');
    const message = {
      "timestamp": firebase.database.ServerValue.TIMESTAMP,
      "user": {
        id: user.uid,
        name: user.displayName,
        avatar: user.photoURL
      },
      "content": msg,
    }
    return message;
  }

  const sendMessage = () => {
    if (msg) {
      setLoading(true);
      messagesRef
        .child(channel.id)
        .push()
        .set(createMessage())
        .then(() => {
          setLoading(false);
          setMsg('');
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        })
    }
    else {
      console.log('text area is empty');
    }
  }

  return (
    <div className="chat-window-form">
      <textarea onChange={handleChange}></textarea>
      <div className="btn-group space-between">
        <input type="file"></input>
        <button onClick={sendMessage}>Send message</button>
      </div>
    </div>
  )
}

export default ChatForm;