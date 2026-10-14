import { createApp } from "vue";

import { createAccessibilityChecker } from "./accessibility-checker";
import App from "./App.vue";

createAccessibilityChecker().enable();

createApp(App).mount("#app");
