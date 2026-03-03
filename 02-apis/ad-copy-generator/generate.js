#!/usr/bin/env node

// ---------------------------------------------------------------------------
// LOAD ENVIRONMENT VARIABLES
// dotenv reads your .env file and puts the values into process.env
// This keeps your API key out of source code.
// ---------------------------------------------------------------------------
require("dotenv").config();

// The Anthropic SDK — this handles the HTTP requests to Claude's API for us.
// Under the hood, it's making POST requests to https://api.anthropic.com
const Anthropic = require("@anthropic-ai/sdk");

// ---------------------------------------------------------------------------
// PARSE CLI ARGUMENTS
// Usage: node generate.js "Your product description here"
// ---------------------------------------------------------------------------
const productDescription = process.argv.slice(2).join(" ");

if (!productDescription) {
  console.log("Usage: node generate.js <product description>");
  console.log("");
  console.log("Examples:");
  console.log('  node generate.js "AI-powered bio generator for real estate agents"');
  console.log('  node generate.js "Online course teaching businesses to use AI automation"');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// SET UP THE API CLIENT
// The SDK automatically reads ANTHROPIC_API_KEY from process.env.
// No need to pass it manually — this is a common pattern in SDKs.
// ---------------------------------------------------------------------------
const client = new Anthropic();

// ---------------------------------------------------------------------------
// THE PROMPT
// This is what we send to Claude. A well-structured prompt = better output.
// We ask for a specific JSON-like format so the output is consistent.
// ---------------------------------------------------------------------------
const prompt = `You are an expert ad copywriter. Given this product description, generate ad copy variations for three platforms.

Product: ${productDescription}

Generate the following (keep all copy in the same language as the product description):

## Facebook/Instagram Ad
- Headline (max 40 characters)
- Primary text (max 125 characters)
- Description (max 30 characters)

## Google Search Ad
- Headline 1 (max 30 characters)
- Headline 2 (max 30 characters)
- Headline 3 (max 30 characters)
- Description 1 (max 90 characters)
- Description 2 (max 90 characters)

## LinkedIn Ad
- Headline (max 70 characters)
- Intro text (max 150 characters)

For each variation, make it compelling, action-oriented, and specific to the product. No generic filler. Include character counts in parentheses after each line.`;

// ---------------------------------------------------------------------------
// MAIN FUNCTION
// This is an async function because API calls take time — we need to wait
// for Claude's response. That's what "await" does: pauses here until the
// API responds, without blocking other things from running.
// ---------------------------------------------------------------------------
async function generateAdCopy() {
  console.log("\nGenerating ad copy for:", productDescription);
  console.log("Calling Claude API...\n");

  // This is the actual API call. We send a message to Claude and wait
  // for the response. Every API call has the same structure:
  //   1. Which model to use
  //   2. How many tokens (words) max in the response
  //   3. The messages (what we're asking)
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  // The response comes back as a structured object. The actual text
  // is inside response.content[0].text
  const output = response.content[0].text;
  console.log(output);

  // Show usage stats — this is how you track API costs
  console.log("\n---");
  console.log(
    `Tokens used: ${response.usage.input_tokens} in / ${response.usage.output_tokens} out`
  );
}

// ---------------------------------------------------------------------------
// RUN IT
// .catch() handles any errors (bad API key, network issues, etc.)
// ---------------------------------------------------------------------------
generateAdCopy().catch((error) => {
  if (error.status === 401) {
    console.error("Error: Invalid API key. Check your .env file.");
  } else if (error.status === 429) {
    console.error("Error: Rate limited. Wait a moment and try again.");
  } else {
    console.error("Error:", error.message);
  }
  process.exit(1);
});
