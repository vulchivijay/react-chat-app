import React, { useState } from 'react';

import './index.css';

function Channels () {
  const [channels, setChannels] = useState([]);
  const [channelName, setChannelName] = useState("");
  const [channelDesc, setChannelDesc] = useState("");

  const handleChange = event => {
		if (event.target.name === "channelName") {
      setChannelName(event.target.value.replace(/\s/g, '').toLowerCase())
		} else {
      setChannelDesc(event.target.value);
		}
	}

  return (
    <div className="chat-channels">
      <h3 className="space-between">
        <span>Channels ({channels.length})</span>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#channelModal">Add</button>
      </h3>
      <div className="modal fade" tabIndex="-1" id="channelModal" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Chennel</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <input type="text" placeholder="Channel name" onChange={handleChange} name="channelName" value={channelName} />
                <input type="text" placeholder="About the channel" onChange={handleChange} name="channelDesc" value={channelDesc} />
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary">Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels;