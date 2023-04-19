import React, { useState, useEffect } from 'react';
import './list.css';
const ipcRenderer = window.electron.ipcRenderer;

const List: React.FC = () => {
  const [timeline, setTimeline] = useState<any>([]);

  const getTimeline: any = async () => {
    const request = await ipcRenderer.sendMessage('serverRequest', [
      { name: 'getTimeline', args: [{}] },
    ]);
    return new Promise((resolve, reject) => {
      ipcRenderer.on('serverRequest', (event, arg) => {
        resolve({ event: event, arg: arg });
      });
    });
  };

  const onMount = async () => {
    console.log('mounted');
    const timeLine = await getTimeline();
    console.log('timeLine:', timeLine);
    const feed = timeLine['event']['feed'];
    setTimeline(feed);
  };

  useEffect(() => {
    console.log('useEffect called');
    onMount();
  }, []);

  return (
    <div>
      <h1>List</h1>
      <div className="post-list">
        {timeline.map((item) => (
          <div className="post-wrapper">
            <div className="post-header">
              <img
                src={item.post.author.avatar}
                className="post-avatar-img"
                alt="none"
              />
              <div className="post-header-text">
                <div className="post-header-name">
                  {item.post.author.displayName}
                </div>
              </div>
              <div className="post-body">
                <div className="post-body-text">{item.post.record.text}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
