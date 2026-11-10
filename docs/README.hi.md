Follows README version 0.12 (Director 0.12) · यह अनुवाद README संस्करण 0.12 पर आधारित है।

# AI Edit Studio — त्वरित शुरुआत

## एक स्टूडियो। आपका फ़ाइनल कट।

AI Edit Studio क्रिएटर्स, गेम डेवलपर्स और उनके एजेंट्स के लिए एक **लोकल-फ़र्स्ट वीडियो एडिटर** है। एक ही इंजन: लोगों के लिए प्रो टाइमलाइन, और एजेंट्स के लिए वही 59 टूल्स (MCP, HTTP/OpenAPI, CLI)। आपकी फ़ुटेज कभी आपकी मशीन से बाहर नहीं जाती; ओरिजिनल फ़ाइलें सिर्फ़ पढ़ी जाती हैं।

## इंस्टॉल करें और शुरू करें (Windows beta)

**npm से** (Node 20+ और FFmpeg ज़रूरी):

```bash
npm install -g ai-edit-studio
ai-edit-studio install      # data folder + connects Claude Code, Codex, Claude Desktop and Cursor
ai-edit-studio serve        # starts the editor on http://127.0.0.1:32146
```

किसी एजेंट के लिए MCP server के रूप में, पहले कुछ इंस्टॉल किए बिना: `claude mcp add ai-edit-studio -- npx -y ai-edit-studio mcp` (यही कमांड Cursor, Claude Desktop और Codex configs में भी काम करती है)।

**सोर्स (source) से चलाने पर**, सेटअप जाँचने के लिए: `node cli.mjs doctor`। यह FFmpeg, encoder, storage और (वैकल्पिक) speech engine को जाँचता है।

## पहला प्रॉम्प्ट आज़माएँ

> Use AI Edit Studio. Make a TikTok from `D:\clips\day1.mp4` and `D:\clips\day2.mp4`. Promise: "I built a game in 7 days".
> CTA "Follow for day 8". Give me the three hook variants, run the quality gate and make a publish pack.

## ईमानदार सीमाएँ

- Speech recognition सिर्फ़ लोकली चलता है और इसके लिए वैकल्पिक whisper.cpp इंस्टॉल चाहिए (या अपना ट्रांसक्रिप्ट लाएँ)। फ़ेस ट्रैकिंग नहीं है (reframe मापे गए motion को फ़ॉलो करता है), generative video नहीं है, और अपलोडिंग या पब्लिशिंग नहीं है।
- Energy, hook, highlights और Director mode motion, loudness, scene changes, beats और शब्दों का इस्तेमाल करते हैं — कहानी या पसंद (taste) का नहीं। Publish pack के पोस्ट टेक्स्ट सिर्फ़ आपके अपने टाइटल, brief और call to action से बने ड्राफ़्ट हैं।
- ब्राउज़र प्रीव्यू look, colour, text और transitions का अनुमान भर दिखाता है; असली नतीजा FFmpeg रेंडर का ही होता है। जिन फ़ॉर्मेट को ब्राउज़र नहीं चला सकता (जैसे कुछ MKV/HEVC), वे फिर भी ठीक से एडिट होते हैं; रेंडर किया हुआ प्रीव्यू देखें।
- SDR / H.264 आउटपुट; 4K Lanczos upscaling है, AI detail नहीं।
- Beta: अभी बाहर के कई यूज़र्स ने इसे वेरिफ़ाई नहीं किया है। बग रिपोर्ट GitHub issues के रूप में स्वागत योग्य हैं।
