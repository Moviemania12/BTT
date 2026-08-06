"use client";
export default function NlpEvolutionTimeline() {
  const eras = [
    { year: "1950s–80s", label: "Rule-Based NLP", sub: "Handcrafted grammars · ELIZA · Symbol manipulation", color: "#475569", bg: "#f1f5f9" },
    { year: "1990s–2000s", label: "Statistical NLP", sub: "HMMs · N-grams · IBM Translation · Phrase-based MT", color: "#0369a1", bg: "#e0f2fe" },
    { year: "2013", label: "Word Embeddings", sub: "Word2Vec · GloVe · Dense vectors · Semantic analogy", color: "#7c3aed", bg: "#ede9fe" },
    { year: "2014–16", label: "Sequence Models", sub: "LSTM · GRU · Attention (Bahdanau) · Seq2Seq", color: "#0f766e", bg: "#ccfbf1" },
    { year: "2017", label: "Transformer", sub: "Attention Is All You Need · Parallelizable · Foundation of LLMs", color: "#2563eb", bg: "#dbeafe" },
    { year: "2018–19", label: "BERT + GPT", sub: "Bidirectional encoders · Decoder LMs · Pretraining era", color: "#ca8a04", bg: "#fef9c3" },
    { year: "2020–22", label: "Scale Era", sub: "GPT-3 175B · Few-shot · Emergent capabilities · ChatGPT", color: "#16a34a", bg: "#dcfce7" },
    { year: "2023–25", label: "Foundation Models", sub: "Llama · Mistral · Gemini · Claude · Reasoning models", color: "#dc2626", bg: "#fef2f2" },
  ];
  return (
    <svg viewBox="0 0 820 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="nlp-title">
      <title id="nlp-title">NLP Evolution Timeline from Rule-Based 1950s to Foundation Models 2025</title>
      <rect width="820" height="360" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">NLP EVOLUTION — FROM RULES TO LARGE LANGUAGE MODELS</text>
      {eras.map((e, i) => {
        const x = i < 4 ? 20 : 430;
        const y = 38 + (i % 4) * 76;
        return (
          <g key={i}>
            <rect x={x} y={y} width="390" height="64" rx="8" fill={e.bg} stroke={e.color} strokeWidth="1.5" />
            <rect x={x} y={y} width="90" height="64" rx="8" fill={e.color} />
            <text x={x + 45} y={y + 30} fontFamily="Arial,sans-serif" fontSize="10" fontWeight="800" fill="#fff" textAnchor="middle">{e.year.split("–")[0]}</text>
            <text x={x + 45} y={y + 46} fontFamily="Arial,sans-serif" fontSize="8" fill="#e2e8f0" textAnchor="middle">{e.year.includes("–") ? "–" + e.year.split("–")[1] : ""}</text>
            <text x={x + 100} y={y + 25} fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill={e.color}>{e.label}</text>
            <text x={x + 100} y={y + 43} fontFamily="Arial,sans-serif" fontSize="8" fill="#374151">{e.sub}</text>
          </g>
        );
      })}
      <text x="410" y="350" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Each era built on the previous — Transformers unified all prior NLP techniques into a single scalable architecture</text>
    </svg>
  );
}
