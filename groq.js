// ── GROQ VISION — classroom headcount ────────────────────────────────────────

async function takePhotoAndCount() {
  const cfg = JSON.parse(localStorage.getItem('config') || '{}');
  const key = cfg.groqKey;
  if (!key) return null;

  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
  } catch { return null; }

  const video = document.createElement('video');
  video.srcObject = stream;
  await new Promise(r => { video.onloadedmetadata = r; });
  await video.play();
  await new Promise(r => setTimeout(r, 800)); // let camera warm up

  const canvas = document.createElement('canvas');
  canvas.width  = video.videoWidth  || 1280;
  canvas.height = video.videoHeight || 720;
  canvas.getContext('2d').drawImage(video, 0, 0);
  stream.getTracks().forEach(t => t.stop());

  const base64 = canvas.toDataURL('image/jpeg', 0.85).split(',')[1];

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
        messages: [{
          role: 'user',
          content: [
            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64}` }},
            { type: 'text', text: 'This is a classroom photo. Count ALL people visible including partial faces, side profiles, and people in back rows. Return ONLY valid JSON like this exact format: {"count": 42, "confidence": "high"} — nothing else, no explanation.' }
          ]
        }],
        max_tokens: 60,
      }),
    });
    const data = await res.json();
    const raw  = data.choices?.[0]?.message?.content || '';
    const match = raw.match(/\{.*\}/s);
    if (match) return JSON.parse(match[0]);
  } catch(e) {
    console.warn('[Vision]', e);
  }
  return null;
}

// ── TELEGRAM ─────────────────────────────────────────────────────────────────

async function sendTelegram(text) {
  const cfg = JSON.parse(localStorage.getItem('config') || '{}');
  if (!cfg.tgToken || !cfg.tgChat) return;
  try {
    await fetch(`https://api.telegram.org/bot${cfg.tgToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: cfg.tgChat, text, parse_mode: 'HTML' }),
    });
  } catch(e) { console.warn('[Telegram]', e); }
}

// ── CSV EXPORT ────────────────────────────────────────────────────────────────

function exportCSV(records) {
  const rows = [['SL','Name','USN','Status','Time']];
  records.forEach(r => rows.push([r.sl, r.name, r.usn, r.status, r.time]));
  const csv  = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `attendance_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
