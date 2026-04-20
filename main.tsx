import { appPromise } from '../server';

export default async (req: any, res: any) => {
  try {
    const app = await appPromise;
    return app(req, res);
  } catch (err: any) {
    console.error('Vercel API Error:', err);
    res.status(500).json({ error: 'Function failed to initialize', message: err.message });
  }
};
