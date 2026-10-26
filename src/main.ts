import { createAccessibilityChecker } from "@storyblok/accessibility-checker";
import { createApp } from "vue";

import App from "./App.vue";
import "./styles.css";

createAccessibilityChecker({
  // Demo only: the checker answers Storyblok's Visual Editor origins by default. This also lets
  // other Storyfront environments (preview deployments, local) request checks. A real website
  // does not need this option.
  allowedOrigins: [/^https?:\/\/[^/]+$/],
}).enable();

createApp(App).mount("#app");
