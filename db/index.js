import { fileURLToPath } from "url";
import path from "path";

export default function getContactsPath() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.join(__dirname, "contacts.json");
}
