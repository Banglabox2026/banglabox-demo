# Audio Samples — File Drop Guide

The demo page (`../index.html`) expects audio files at the paths listed below. **Total: 96 audio clips.**

All files should be:
- **WAV format**, 24 kHz, mono, 16-bit PCM
- **RMS-normalized to −23 LUFS** (matches paper §5 protocol)
- Trimmed to ≤100ms leading/trailing silence
- Filenames lowercase, hyphenated, ASCII only

---

## Section 1 — Headline System Comparison (35 clips)

The same 5 utterances synthesized by 7 systems each.

```
samples/main/
  utt01-news/      {human,banglabox,google,azure,narakeet,indicf5,yourtts}.wav
  utt02-custcare/  {human,banglabox,google,azure,narakeet,indicf5,yourtts}.wav
  utt03-teaching/  {human,banglabox,google,azure,narakeet,indicf5,yourtts}.wav
  utt04-health/    {human,banglabox,google,azure,narakeet,indicf5,yourtts}.wav
  utt05-ecom/      {human,banglabox,google,azure,narakeet,indicf5,yourtts}.wav
```

**Utterance texts:**
1. **utt01-news**: বাংলাদেশ ব্যাংক আজ নতুন মুদ্রানীতি ঘোষণা করেছে।
2. **utt02-custcare**: আমাদের পরিষেবা সম্পর্কে আপনার কোন প্রশ্ন থাকলে জানান।
3. **utt03-teaching**: আজকের পাঠে আমরা পদার্থবিজ্ঞানের গতির সূত্র শিখব।
4. **utt04-health**: প্রতিদিন তিনবার, খাবারের পরে এই ওষুধটি সেবন করবেন।
5. **utt05-ecom**: আপনার অর্ডার নম্বর সাত-চার-দুই-তিন আগামী রবিবার ডেলিভারি হবে।

---

## Section 2 — Zero-Shot Voice Cloning (24 clips: 6 refs + 18 cloned)

3 held-out speakers × (5s ref + 10s ref + 6 cloned outputs) = 24 clips.

All clones synthesize the **same** Bangla sentence:
> এই কণ্ঠস্বরটি কেবল কয়েক সেকেন্ডের রেফারেন্স থেকে তৈরি করা হয়েছে।

```
samples/cloning/
  spk01/
    ref-5s.wav  ref-10s.wav
    indicf5-5s.wav    indicf5-10s.wav
    yourtts-5s.wav    yourtts-10s.wav
    banglabox-5s.wav  banglabox-10s.wav
  spk02/  (same structure)
  spk03/  (same structure)
```

**Speaker selection:** 3 of the 5 held-out test speakers (paper §3 split):
- spk01 — Female, news register (cleaner case)
- spk02 — Male, conversational (mid difficulty)
- spk03 — Female, expressive (hardest — tests prosody transfer)

---

## Section 3 — Long-Form Synthesis (6 clips)

3 multi-sentence Bangla paragraphs × 2 conditions (naive vs chunked).

```
samples/longform/
  para01-news/      {naive,banglabox-chunked}.wav
  para02-literary/  {naive,banglabox-chunked}.wav
  para03-conv/      {naive,banglabox-chunked}.wav
```

**Naive condition:** stock Chatterbox inference, English-default hyperparams, no chunking, no VAD trim.
**Chunked condition:** sentence-split on । ! ? + per-sentence generation + Silero VAD tail-trim + 200ms inter-sentence pause + Bangla-calibrated hyperparams (temp 0.3, min-new-tokens 150).

**Texts:** see `index.html` sections 3.

---

## Section 4-7 — Bangla Edge Cases (16 clips)

4 categories × 2 examples × 2 systems (Google TTS vs BanglaBox) = 16 clips.

```
samples/edge/
  juktakkhor/   ex01-{google,banglabox}.wav   ex02-{google,banglabox}.wav
  honorifics/   ex01-{google,banglabox}.wav   ex02-{google,banglabox}.wav
  codeswitch/   ex01-{google,banglabox}.wav   ex02-{google,banglabox}.wav
  numerals/     ex01-{google,banglabox}.wav   ex02-{google,banglabox}.wav
```

**Texts:** see `index.html` sections 4-7.

---

## Section 8 — Ablation Audio (8 clips)

2 utterances × 4 configurations.

```
samples/ablation/
  utt01/  {full,no-vocab-ext,no-text-norm,no-prompt-mask}.wav
  utt02/  {full,no-vocab-ext,no-text-norm,no-prompt-mask}.wav
```

**Utterance 1** (numeral + honorific — exposes −text-norm and −vocab-ext):
> হযরত আদম আঃ ১০০০ বছর বেঁচে ছিলেন।

**Utterance 2** (cloning prompt — exposes −prompt-mask via SECS drop):
> আমার কণ্ঠস্বর শুনে চিনতে পারছ?

These are the 4 configs from the paper Table 6 upper block (skipping `+Trainable enc.` since its delta is negligible at −0.01).

---

## Section 9 — Failure Modes (3 clips)

```
samples/failure/
  f01-rare-conjunct.wav    # উচ্ছৃঙ্খল প্রস্ফুটিত স্ত্রীলিঙ্গ।
  f02-codeswitch.wav        # আমি email পাঠিয়ে তোমাকে notify করব, please check করো।
  f03-onomatopoeia.wav      # চারিদিকে শুধু হই-হুল্লোড়, ঝিঁঝিঁ পোকার ডাক, আর শোঁ-শোঁ বাতাস।
```

These are intentionally generated to surface the 3 failure modes documented in paper §6.

---

## Section 10 — Cross-Lingual Cloning (6 clips, bonus)

```
samples/crosslingual/
  en-ref.wav   en-banglabox-out.wav     # English reference → Bangla output
  hi-ref.wav   hi-banglabox-out.wav     # Hindi reference → Bangla output
  es-ref.wav   es-banglabox-out.wav     # Spanish reference → Bangla output
```

Reference audio sources should be redistribution-safe (e.g., Common Voice or LibriSpeech). All cloned Bangla outputs say:
> এই কণ্ঠস্বরটি অন্য ভাষা থেকে ক্লোন করা হয়েছে।

---

## Total clip count: 96

| Section | Clips |
|---------|------:|
| 1. Main comparison | 35 |
| 2. Voice cloning (6 refs + 18 clones) | 24 |
| 3. Long-form | 6 |
| 4. Juktakkhor | 4 |
| 5. Honorifics | 4 |
| 6. Code-switching | 4 |
| 7. Numerals | 4 |
| 8. Ablation | 8 |
| 9. Failure modes | 3 |
| 10. Cross-lingual | 6 |
| **TOTAL** | **96** |

---

## Anonymity checklist before publishing

- [ ] No real speaker names in filenames
- [ ] Strip all WAV metadata: `for f in $(find samples -name '*.wav'); do exiftool -all= -overwrite_original "$f"; done`
- [ ] Verify HTML/CSS/JS contain no real names, real institution, real GitHub usernames
- [ ] Test in a fresh incognito browser session
- [ ] Update the badge URLs in `index.html` (currently `href="#"`) to point to:
  - Anonymous paper PDF (anonymous.4open.science or similar)
  - Anonymous code repo
  - Anonymous HF model card
