import { useState } from 'react';
import { AsyncButton } from '../../components/AsyncButton';

const makeOnClick = (url: string) => async () => {
  const res = await fetch(url);
  const json = await res.json();
  if (res.status === 500) {
    throw new Error(json.err);
  }
  return json.msg;
};

const zomboid = () => {
  return (
    <div>
      <AsyncButton
        label="Restart"
        workingLabel="Restarting..."
        onClick={makeOnClick('/api/zomboid/restart')}
      />
      <AsyncButton
        label="Stop"
        workingLabel="Stoping..."
        onClick={makeOnClick('/api/zomboid/stop')}
      />
      <AsyncButton
        label="Start"
        workingLabel="Starting..."
        onClick={makeOnClick('/api/zomboid/start')}
      />
    </div>
  );
};

export default zomboid;
