/**
 * ai-recommendations.js — Smart Event Recommendations
 */
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('es-recommendations');
    if (!container) return;

    container.innerHTML = `
        <div class="ai-rec-box">
            <h2>✨ AI Event Recommendation</h2>
            <p>Tell me what you're interested in, and I'll find a match.</p>
            <div class="rec-input-group">
                <input type="text" id="rec-input" placeholder="e.g. I love live music and food...">
                <button id="rec-btn">Find Match</button>
            </div>
            <div id="rec-output" style="display: none;"></div>
        </div>
    `;

    const input = document.getElementById('rec-input');
    const button = document.getElementById('rec-btn');
    const output = document.getElementById('rec-output');

    button.onclick = () => {
        const text = input.value.toLowerCase();
        if (!text) return;

        output.style.display = 'block';
        output.innerHTML = "<em>Analyzing your interests...</em>";

        setTimeout(() => {
            let match = { title: "Cultural Discovery", desc: "Explore local hidden gems in your city!" };

            if (text.includes("music")) {
                match = { title: "🎸 Jazz Night", desc: "A perfect evening of live soul and rhythm." };
            } else if (text.includes("tech") || text.includes("code") || text.includes("ai")) {
                match = { title: "🧠 AI Workshop", desc: "Hands-on learning with the latest tech trends." };
            } else if (text.includes("food") || text.includes("eat")) {
                match = { title: "🍴 Street Food Fiesta", desc: "The ultimate culinary tour of local flavors." };
            }

            output.innerHTML = `<strong>Match Found: ${match.title}</strong><p>${match.desc}</p>`;
        }, 800);
    };
});