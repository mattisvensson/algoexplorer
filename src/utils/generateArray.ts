export default function generateArray() {
  return Array.from({ length: 50 }, (_, i) => i + 1).sort(() => Math.random() - 0.5)
}