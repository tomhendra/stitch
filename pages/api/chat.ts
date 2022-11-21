import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import type { Message } from '~/models/app';

// function replyToMessage(message: Message): Message {
//   return {
//     sender: 'Test Bot',
//     body: `this is a reply to ${message.body}`,
//     timestamp: Date.now(),
//   };
// }

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'PUT') {
    const message = req.query.message;
    const reply = '';

    if (!reply) {
      return res.status(404).json({ error: 'Replay error' });
    }

    return res.status(200).json(reply);
  }

  return res.status(405).json({ error: 'Method not allowed' });
};

export default handler;
