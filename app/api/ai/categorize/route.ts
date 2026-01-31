import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title, description } = await req.json();

  // VERY SIMPLE PROMPT (works well)
  const prompt = `
You are a hostel maintenance classifier.
Given an issue title and description, return JSON with:
- category (one of: Plumbing, Electrical, Cleanliness, Internet, Furniture, Other)
- priority (Low, Medium, High, Emergency)

Title: ${title}
Description: ${description}

Respond ONLY with valid JSON.
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    }),
  });

  const data = await response.json();
  const text = data.choices[0].message.content;

  try {
    const parsed = JSON.parse(text);
    return NextResponse.json(parsed);
  } catch {
    // fallback
    return NextResponse.json({
      category: "Other",
      priority: "Low",
    });
  }
}
