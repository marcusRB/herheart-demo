import herheartEhrFullDemoHtml from "../herheart_ehr_full_demo.html?raw";
import herheartFinancialSimulatorHtml from "../herheart_financial_simulator.html?raw";
import herheartStressTestHtml from "../herheart_stress_test.html?raw";
import { T } from "./tokens";

const EMBEDDED_PROMPT_BRIDGE = `
  window.sendPrompt = window.sendPrompt || function sendPrompt(prompt) {
    try {
      window.parent?.postMessage({ type: "embedded-prompt", prompt }, "*");
    } catch (error) {
      console.info(prompt);
    }
  };
`;

const buildEmbeddedSrcDoc = (templateSource, { extraScript = "" } = {}) => {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Lora:wght@400;500&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.34.1/dist/tabler-icons.min.css" />
    <style>
      :root {
        --font-sans: 'Inter', sans-serif;
        --font-serif: 'Lora', serif;
        --font-mono: 'SFMono-Regular', 'SF Mono', 'Cascadia Code', Consolas, 'Liberation Mono', Menlo, monospace;
        --border-radius-md: 10px;
        --border-radius-lg: 14px;
        --color-background-primary: ${T.surface};
        --color-background-secondary: ${T.surfaceAlt};
        --color-background-tertiary: ${T.bg};
        --color-background-info: ${T.tealFaint};
        --color-background-success: ${T.successFaint};
        --color-background-warning: ${T.amberFaint};
        --color-background-danger: ${T.dangerFaint};
        --color-text-primary: ${T.text};
        --color-text-secondary: ${T.textMid};
        --color-text-tertiary: ${T.textMuted};
        --color-text-info: ${T.teal};
        --color-text-success: ${T.success};
        --color-text-warning: ${T.amber};
        --color-text-danger: ${T.danger};
        --color-border-primary: ${T.border2};
        --color-border-secondary: ${T.border2};
        --color-border-tertiary: ${T.border};
        --color-border-info: ${T.teal};
      }

      html, body {
        margin: 0;
        padding: 0;
        background: ${T.bg};
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    </style>
  </head>
  <body>
    ${templateSource}
    ${extraScript ? `<script>${extraScript}</script>` : ""}
  </body>
</html>`;
};

export const HERHEART_EHR_FULL_DEMO_SRCDOC = buildEmbeddedSrcDoc(herheartEhrFullDemoHtml);

export const HERHEART_FINANCIAL_SIMULATOR_SRCDOC = buildEmbeddedSrcDoc(
  herheartFinancialSimulatorHtml,
  { extraScript: EMBEDDED_PROMPT_BRIDGE },
);

export const HERHEART_STRESS_TEST_SRCDOC = buildEmbeddedSrcDoc(herheartStressTestHtml, {
  extraScript: EMBEDDED_PROMPT_BRIDGE,
});