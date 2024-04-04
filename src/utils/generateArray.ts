export default function generateArray(length?: number) {
  return Array.from({ length: length ? length : 100 }, (_, i) => i + 1).sort(() => Math.random() - 0.5)
}