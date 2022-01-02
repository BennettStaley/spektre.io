import type { NextApiRequest, NextApiResponse } from 'next';
import { exec as execCB } from 'child_process';
import { promisify } from 'util';

const exec = promisify(execCB);

type Data = {
  msg: string;
  err: string;
};

export const makeHandler =
  (script: string) =>
  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
      console.log(script);
      const { stderr, stdout } = await exec(script);
      console.log({ stderr, stdout });
      res.status(stderr === '' ? 200 : 500).json({ msg: stdout, err: stderr });
    } catch (e) {
      res.status(500).json({ msg: '', err: String(e) });
    }
  };
