import React, { useState } from 'react';
import mime from 'mime-types';
import uuidv4 from 'uuid/v4';
import firebase from './../../auth/firebase';

function ChatForm (props) {
  const channel = props.currentChannel;
  const messagesRef = props.messagesRef;
  const user = props.currentUser;
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState('');
  const authorizedImage = ['image/jpeg', 'image/png'];
  const storageRef = firebase.storage().ref();
  const [uploadTask, setUploadTask] = useState('');
  
  const handleChange = event => {
    setMsg(event.target.value);
  }

  const createMessage = () => {
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

  const isAuthorizedImage = filename => {
    return authorizedImage.includes(mime.lookup(filename));
  }

  const uploadFile = (file, metadata) => {
    // const pathToUpload = channel.id;
    // const ref = messagesRef;
    const filePath = `chat/public/${uuidv4}.jpg`;
    
    storageRef
      .child(filePath)
      .put(file, metadata)
    
      clearFile();
  }

  const clearFile = () => {
    setFile('');
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
          setLoading(false);
          console.log(error);
        })
    }
    else {
      if (file) {
        if (isAuthorizedImage(file.name)) {
          const metadata = { contentType: mime.lookup(file.name) };
          uploadFile(file, metadata);
        }
      } else {
        console.log('text area is empty');
      }
    }
  }

  const addFile = event => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  }

  return (
    <div className="chat-window-form space-between">
      <textarea onChange={handleChange} value={msg}></textarea>
      <div className="btn-group space-between">
        <input type="file" onChange={addFile} className="d-none"></input>
        <button onClick={sendMessage}>Send message</button>
      </div>
    </div>
  )
}

export default ChatForm;