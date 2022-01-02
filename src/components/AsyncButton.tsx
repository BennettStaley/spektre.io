import { FC, useState } from 'react';

interface ButtonProps {
  onClick: () => Promise<string>;
  label: string;
  workingLabel: string;
}

export const AsyncButton: FC<ButtonProps> = ({
  onClick,
  label,
  workingLabel,
}) => {
  const [working, setWorking] = useState(false);
  const [err, setErr] = useState<string>();
  const [msg, setMsg] = useState<string>();
  if (msg) {
    label = `${label}: Msg: ${msg}`;
  }
  if (err) {
    label = `${label}: Err: ${err}`;
  }
  if (working) {
    label = workingLabel;
  }
  return (
    <div>
      <button
        onClick={
          working
            ? undefined
            : () => {
                setWorking(true);
                setErr(undefined);
                setMsg(undefined);
                onClick()
                  .then(
                    (res) => {
                      setMsg(res);
                    },
                    (rej) => {
                      setErr(String(rej));
                    },
                  )
                  .finally(() => {
                    setWorking(false);
                  });
              }
        }
      >
        {label}
      </button>
    </div>
  );
};
