const EMPTY = {
  roster: [],
  rosterNextId: 1,
  keysCollected: 0,
  completedStations: [],
  isDark: true,
  drawNames: [],
  updatedAt: 0
};

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

async function github(path, options = {}) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN is not configured');

  const res = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers || {})
    }
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

function repoPath() {
  const owner = process.env.GITHUB_OWNER || 'NadaAzzzam';
  const repo = process.env.GITHUB_REPO || 'seerah-adventure';
  return `/repos/${owner}/${repo}/contents/data/shared.json`;
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const file = await github(repoPath());
      if (!file?.content) return res.status(200).json(EMPTY);

      const text = Buffer.from(file.content, 'base64').toString('utf8');
      return res.status(200).json(JSON.parse(text));
    }

    if (req.method === 'PUT') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const payload = {
        ...EMPTY,
        ...body,
        updatedAt: Date.now()
      };

      const existing = await github(repoPath());
      const requestBody = {
        message: 'Update shared classroom data',
        content: Buffer.from(JSON.stringify(payload, null, 2), 'utf8').toString('base64')
      };
      if (existing?.sha) requestBody.sha = existing.sha;

      await github(repoPath(), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      return res.status(200).json({ ok: true, updatedAt: payload.updatedAt });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
}
