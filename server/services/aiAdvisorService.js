/**
 * AutoDezire AI Advisor Service
 * Context-aware personalized automobile advisor integrating LLM API (Gemini / OpenAI)
 * with robust context-aware intelligent fallback.
 */

const https = require('https');

/**
 * Handles chat query with full structured context.
 */
async function generateAdvisorResponse({
  message,
  conversationHistory = [],
  userProfile = {},
  selectedVehicle = null,
  suitabilityResult = null,
  recommendedVehicles = [],
}) {
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  // Build the structured context prompt
  const systemContext = buildStructuredSystemPrompt({
    userProfile,
    selectedVehicle,
    suitabilityResult,
    recommendedVehicles,
  });

  if (geminiKey) {
    try {
      return await callGeminiAPI(geminiKey, systemContext, message, conversationHistory);
    } catch (err) {
      console.warn('[AI Advisor] Gemini API call error:', err.message);
    }
  }

  if (openaiKey) {
    try {
      return await callOpenAIAPI(openaiKey, systemContext, message, conversationHistory);
    } catch (err) {
      console.warn('[AI Advisor] OpenAI API call error:', err.message);
    }
  }

  // Fallback to our context-aware intelligent rule-based engine
  return generateContextualFallbackAnswer(message, {
    userProfile,
    selectedVehicle,
    suitabilityResult,
    recommendedVehicles,
  });
}

function buildStructuredSystemPrompt({ userProfile, selectedVehicle, suitabilityResult, recommendedVehicles }) {
  let prompt = `You are AutoDezire AI Advisor, an expert personalized automobile advisor for India.
Your mission: Help this specific user understand vehicle suitability for THEIR exact lifestyle, budget, and driving patterns.

USER PROFILE:
- Height: ${userProfile.height || 172} cm, Age: ${userProfile.age || 28}
- Budget: ₹${userProfile.budget || 14} Lakh
- Daily Running: ${userProfile.dailyKm || 35} km (${userProfile.cityPercent || 60}% City, ${userProfile.highwayPercent || 30}% Highway, ${userProfile.ruralPercent || 10}% Rural)
- Road Conditions: ${userProfile.roadConditions || 'Mixed with Potholes'}
- Family / Passengers: ${userProfile.regularPassengers || 2} regular passengers (Children: ${userProfile.hasChildren ? 'Yes' : 'No'}, Elderly: ${userProfile.hasElderly ? 'Yes' : 'No'})
- Top 3 Priorities: ${(userProfile.topPriorities || ['Safety', 'Ground Clearance', 'Comfort']).join(', ')}

`;

  if (selectedVehicle && suitabilityResult) {
    prompt += `CURRENTLY EVALUATED VEHICLE:
- Model: ${selectedVehicle.brand} ${selectedVehicle.model} (${selectedVehicle.category} - ${selectedVehicle.bodyType})
- Price Range: ${selectedVehicle.priceDisplay}
- Engine: ${selectedVehicle.engine}, Power: ${selectedVehicle.power}, Torque: ${selectedVehicle.torque}
- Mileage: ${selectedVehicle.mileage}, Ground Clearance: ${selectedVehicle.groundClearance} mm, Safety: ${selectedVehicle.safetyRating} Star (${selectedVehicle.safetyAgency})
- Boot Space: ${selectedVehicle.bootSpace} L, Seating: ${selectedVehicle.seatingCapacity}
- Overall Suitability Score: ${suitabilityResult.overallScore}/100 (${suitabilityResult.overallStatus})
- Budget Compatibility: ${suitabilityResult.budgetStatus} (${suitabilityResult.budgetMessage})
- Requirement-wise Scores:
${Object.entries(suitabilityResult.requirementScores || {})
  .map(([k, v]) => `  * ${k}: ${v}/10`)
  .join('\n')}
- Top Strengths for User: ${(suitabilityResult.topStrengths || []).join(' | ')}
- Considerations / Warnings for User: ${(suitabilityResult.considerations || []).join(' | ')}
`;
  }

  if (recommendedVehicles && recommendedVehicles.length > 0) {
    prompt += `\nTOP RECOMMENDED ALTERNATIVES:
${recommendedVehicles.slice(0, 3).map((v, i) => `${i + 1}. ${v.brand} ${v.model} (Score: ${v.overallScore}/100, Price: ${v.priceDisplay})`).join('\n')}
`;
  }

  prompt += `
RULES:
1. ALWAYS reference the user's specific profile (e.g. daily km, highway usage, budget, height, family requirements).
2. DO NOT invent specifications. If a spec is not in the database, clearly state it is unavailable.
3. Explain recommendations and scores directly from the structured suitability evaluation.
4. Keep tone professional, encouraging, objective, and concise. Use bullet points where appropriate.
`;

  return prompt;
}

/**
 * Calls Google Gemini REST API
 */
async function callGeminiAPI(apiKey, systemPrompt, userMessage, history) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const contents = [];
  // Add system instruction as first user/model context or system prompt
  contents.push({
    role: 'user',
    parts: [{ text: systemPrompt + '\n\nPlease acknowledge and wait for user questions.' }]
  });
  contents.push({
    role: 'model',
    parts: [{ text: 'Understood. I am ready to advise this user based on their specific profile and vehicle evaluation.' }]
  });

  // Add past conversation turns
  history.slice(-4).forEach(h => {
    contents.push({
      role: h.sender === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }]
    });
  });

  contents.push({
    role: 'user',
    parts: [{ text: userMessage }]
  });

  const payload = JSON.stringify({ contents });

  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      },
      res => {
        let data = '';
        res.on('data', chunk => (data += chunk));
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            const answer = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
            if (answer) resolve(answer);
            else reject(new Error('No candidate returned by Gemini'));
          } catch (e) {
            reject(e);
          }
        });
      }
    );

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

/**
 * Calls OpenAI Chat Completions API
 */
async function callOpenAIAPI(apiKey, systemPrompt, userMessage, history) {
  const url = 'https://api.openai.com/v1/chat/completions';
  const messages = [{ role: 'system', content: systemPrompt }];

  history.slice(-4).forEach(h => {
    messages.push({
      role: h.sender === 'user' ? 'user' : 'assistant',
      content: h.text
    });
  });

  messages.push({ role: 'user', content: userMessage });

  const payload = JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages,
    max_tokens: 600,
    temperature: 0.7
  });

  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
      },
      res => {
        let data = '';
        res.on('data', chunk => (data += chunk));
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            const answer = parsed.choices?.[0]?.message?.content;
            if (answer) resolve(answer);
            else reject(new Error('No response choices from OpenAI'));
          } catch (e) {
            reject(e);
          }
        });
      }
    );

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

/**
 * Intelligent context-aware fallback engine for instant, accurate answers
 */
function generateContextualFallbackAnswer(message, { userProfile, selectedVehicle, suitabilityResult, recommendedVehicles }) {
  const q = message.toLowerCase();
  const vehicleName = selectedVehicle ? `${selectedVehicle.brand} ${selectedVehicle.model}` : 'this vehicle';
  const budget = userProfile.budget || 14;
  const dailyKm = userProfile.dailyKm || 35;
  const highwayPct = userProfile.highwayPercent || 30;
  const priorities = userProfile.topPriorities || ['Safety', 'Ground Clearance', 'Comfort'];

  // Question 1: "Why did you recommend this car / vehicle?"
  if (q.includes('why') && (q.includes('recommend') || q.includes('suggest') || q.includes('fit'))) {
    if (selectedVehicle && suitabilityResult) {
      return `Based on your profile, **${vehicleName}** scores **${suitabilityResult.overallScore}/100 (${suitabilityResult.overallStatus})** for your needs.\n\nHere is why it fits you:\n- **Top Priorities Match**: You selected **${priorities.join(', ')}**. ${vehicleName} scores **${suitabilityResult.requirementScores?.safety || 8}/10 in Safety** and **${suitabilityResult.requirementScores?.groundClearance || 8}/10 in Ground Clearance**.\n- **Driving Pattern**: With ${highwayPct}% highway travel and ${dailyKm} km daily commute, its ${selectedVehicle.engine} delivers stable dynamics.\n- **Budget**: At ${selectedVehicle.priceDisplay}, it is **${suitabilityResult.budgetStatus}** for your ₹${budget} Lakh budget limit.`;
    }
    return `We analyze your daily commute (${dailyKm} km), road conditions (${userProfile.roadConditions || 'Mixed'}), passenger requirements, and top 3 priorities (${priorities.join(', ')}) to compute requirement-specific scores rather than just generic specs.`;
  }

  // Question 2: "Why didn't you recommend the Thar?" or Thar specific
  if (q.includes('thar')) {
    return `While the **Mahindra Thar** is unmatched in 4x4 off-roading (10/10 Ground Clearance), its suitability drops for high-mileage daily commuting (${dailyKm} km/day) and long highway trips because:\n1. **Mileage / Running Cost (4/10)**: Real-world mileage is 10-12 kmpl.\n2. **Rear Cabin Practicality (4/10)**: 4-seater with tight ingress and limited 150L boot space.\n3. **Highway Ride Comfort (5/10)**: Ladder-frame bounce compared to monocoque crossovers like Tata Nexon or Creta.\n\nIf off-roading is your primary desire, Thar is great, but for your balanced daily profile, a monocoque SUV is significantly more practical.`;
  }

  // Question 3: Height & Comfort (e.g. "I am 6'2\"..." or tall driver)
  if (q.includes('height') || q.includes("6'") || q.includes('6.2') || q.includes('tall') || q.includes('headroom') || q.includes('legroom')) {
    const height = userProfile.height || 185;
    if (selectedVehicle) {
      return `For someone **${height > 180 ? `${height} cm tall (approx 6'0"+)` : 'of your height'}**, **${vehicleName}** provides **${suitabilityResult?.requirementScores?.comfort || 8}/10 in Comfort**.\n- Front seat travel and tilt/telescopic steering allow generous legroom.\n- Upright SUV/crossover roofline offers adequate headroom without feeling cramped.\n- If you frequently carry tall passengers in the rear, sedans like Honda City or mid-size SUVs like Hyundai Creta offer the most rear knee room.`;
    }
    return `For tall drivers (>180 cm), we evaluate seat height, headroom, and steering reach. SUVs and spacious sedans with height-adjustable driver seats provide the most ergonomic comfort.`;
  }

  // Question 4: Disadvantages / Limitations / Compromises
  if (q.includes('disadvantage') || q.includes('weakness') || q.includes('limitation') || q.includes('compromise') || q.includes('cons') || q.includes('bad')) {
    if (suitabilityResult && suitabilityResult.considerations?.length > 0) {
      const items = suitabilityResult.considerations.map(c => `- ${c}`).join('\n');
      return `Here are the primary considerations for **${vehicleName}** based on your specific profile:\n\n${items}\n\n*AutoDezire transparently flags these points so you know exactly where compromises might exist.*`;
    }
    return `Every automobile involves trade-offs between performance, space, running costs, and price. Check the **Considerations** card on your evaluation dashboard for tailored trade-offs.`;
  }

  // Question 5: Budget increase (e.g. "What happens if I increase my budget by ₹2 lakh?")
  if (q.includes('budget') || q.includes('increase') || q.includes('2 lakh') || q.includes('price')) {
    return `If you increase your budget from **₹${budget} Lakh** to **₹${budget + 2} Lakh**:\n1. You can step up from base/mid variants to higher variants equipped with **6 Airbags, 360-degree cameras, and ADAS active safety**.\n2. In the SUV category, models like **Hyundai Creta SX** or **Maruti Grand Vitara Strong Hybrid (27.97 kmpl)** enter your direct consideration range, drastically reducing monthly fuel expenses.`;
  }

  // Question 6: Comparison / Which is better between two
  if (q.includes('between') || q.includes('compare') || q.includes('versus') || q.includes('vs')) {
    return `When comparing vehicles on AutoDezire, we focus on **suitability for you**, not just spec numbers:\n- For **high daily running**: Prioritize Strong Hybrid or EV options (Grand Vitara, Tiago EV).\n- For **highway comfort & safety**: Prioritize high safety rating and monocoque stability (Nexon, Honda City, XUV700).\n- For **rough terrain**: Prioritize 200mm+ ground clearance and all-terrain suspension (Nexon, Thar).\n\nYou can use our dedicated **Compare** page in the left sidebar to see a side-by-side suitability breakdown!`;
  }

  // Default contextual response
  if (selectedVehicle && suitabilityResult) {
    return `Regarding **${vehicleName}**: It currently holds an **Overall Suitability of ${suitabilityResult.overallScore}/100 (${suitabilityResult.overallStatus})** for your profile.\n\nKey highlights for your usage:\n- **Safety**: ${suitabilityResult.requirementScores?.safety || 8}/10\n- **Comfort**: ${suitabilityResult.requirementScores?.comfort || 8}/10\n- **Mileage & Running Cost**: ${suitabilityResult.requirementScores?.mileageRunningCost || 6}/10\n- **Highway Stability**: ${suitabilityResult.requirementScores?.highwayStability || 9}/10\n\nFeel free to ask about specific road conditions, passenger comfort, maintenance, or alternative model comparisons!`;
  }

  return `AutoDezire AI Advisor is ready to assist. You can ask why a specific vehicle was recommended, compare options, explore budget adjustments, or evaluate comfort for your exact height and driving route!`;
}

module.exports = {
  generateAdvisorResponse,
  buildStructuredSystemPrompt
};
