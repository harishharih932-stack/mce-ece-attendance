// ── VOICE — Microsoft Neerja (Edge) ─────────────────────────────────────────

let _voice = null;

function loadVoice() {
  return new Promise(resolve => {
    const pick = () => {
      const voices = speechSynthesis.getVoices();
      const priority = [
        'Microsoft Neerja Online (Natural) - English (India)',
        'Microsoft Neerja - English (India)',
        'Microsoft Heera Online (Natural) - English (India)',
        'Microsoft Heera - English (India)',
      ];
      for (const name of priority) {
        const v = voices.find(v => v.name === name);
        if (v) { _voice = v; resolve(v); return; }
      }
      // Fallback: any en-IN
      _voice = voices.find(v => v.lang === 'en-IN') || voices[0];
      resolve(_voice);
    };
    if (speechSynthesis.getVoices().length) pick();
    else speechSynthesis.onvoiceschanged = pick;
  });
}

function speak(text) {
  return new Promise(resolve => {
    speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.voice  = _voice;
    utt.rate   = 1.6; // Even faster Mangaluru style
    utt.pitch  = 1.0;
    utt.volume = 1.0;
    utt.onend  = resolve;
    utt.onerror = resolve;
    speechSynthesis.speak(utt);
  });
}

// ── GROQ WHISPER — voice detection ──────────────────────────────────────────

const PRESENT_WORDS = ['present','yes','here','haan','han','yep','yeah','yah','ha','prent','presents','pragent','presen'];
const ABSENT_WORDS  = ['absent','no','not here','nahi','nai','illa','nope','absunt'];

async function recordAndTranscribe(seconds) {
  const cfg = JSON.parse(localStorage.getItem('config') || '{}');
  const key = cfg.groqKey;
  if (!key) return '';

  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch { return ''; }

  const recorder = new MediaRecorder(stream);
  const chunks   = [];

  return new Promise(resolve => {
    recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
    recorder.onstop = async () => {
      stream.getTracks().forEach(t => t.stop());
      try {
        const blob     = new Blob(chunks, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('file',            blob, 'audio.webm');
        formData.append('model',           'whisper-large-v3-turbo');
        formData.append('response_format', 'text');
        formData.append('language',        'en');
        formData.append('prompt',          'The user is saying "present" or "absent" for attendance. They might have an Indian accent.');

        const res  = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
          method:  'POST',
          headers: { 'Authorization': `Bearer ${key}` },
          body:    formData,
        });
        const text = (await res.text()).toLowerCase().trim();
        console.log('[Whisper]', text);
        resolve(text);
      } catch(e) {
        console.warn('[Whisper error]', e);
        resolve('');
      }
    };
    recorder.start();
    setTimeout(() => recorder.stop(), seconds * 1000);
  });
}

function classifyResponse(text) {
  if (!text) return null;
  if (PRESENT_WORDS.some(w => text.includes(w))) return 'present';
  if (ABSENT_WORDS.some(w =>  text.includes(w))) return 'absent';
  return null;
}
