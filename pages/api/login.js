import { API_URL } from '@/config/index';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { identifier, password } = req.body;
    const stapiRes = await fetch(`${API_URL}/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await stapiRes.json();

    console.log(data.jwt);

    if (stapiRes.ok) {
      // set cookie
      res.status(200).json({ user: data.user });
    } else {
      res
        .status(data.statusCode)
        .json({ message: data.message[0].messages[0].message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
