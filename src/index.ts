import { setupWebGL } from "Utils/setup";
import setupFrontend from "Utils/setup-fe";

function main() {
  try {
    setupWebGL();
    setupFrontend();
  } catch (err) {
    if (err instanceof Error) {
      alert(err.message);
    }
  }
}

main();
