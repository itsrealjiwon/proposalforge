import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { clientName, projectName, industry, budget, timeline, requirements } = await req.json();

    const systemMessage = {
      role: "system",
      content: `You are a professional business proposal writer. Generate a complete, formal business proposal in markdown format. Include these sections:
1. Executive Summary
2. Project Overview
3. Scope of Work (with numbered deliverables)
4. Timeline & Milestones
5. Investment (pricing breakdown)
6. Terms & Conditions (brief)
7. Next Steps

Use professional language. Be specific to the client and industry. Return the proposal as plain text markdown, no JSON wrapping.`,
    };

    const userMessage = {
      role: "user",
      content: `Generate a business proposal with these details:
- Client: ${clientName}
- Project: ${projectName}
- Industry: ${industry}
- Budget Range: ${budget}
- Timeline: ${timeline}
- Requirements: ${requirements}`,
    };

    const response = await fetch("http://localhost:19911/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mimo-v2.5-pro",
        messages: [systemMessage, userMessage],
        temperature: 0.7,
        max_tokens: 3000,
        stream: false,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "AI generation failed" }, { status: 502 });
    }

    const data = await response.json();
    const proposal = data.choices?.[0]?.message?.content || "No proposal generated.";

    return NextResponse.json({ proposal });
  } catch (err) {
    console.error("Generate error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
