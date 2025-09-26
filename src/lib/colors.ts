// src/lib/colors.ts
export const mustafaColors = [
  "bg-orange-300",
  "bg-orange-200",
  "bg-orange-100",
  "bg-gradient-to-br from-orange-200 via-orange-100 to-white"
];

export const amnaColors = [
  "bg-pink-300",
  "bg-pink-200",
  "bg-pink-100",
  "bg-gradient-to-br from-pink-200 via-pink-100 to-white"
];

export function getDefaultColorForEmail(email?: string | null) {
  if (!email) return "bg-gray-100";
  const e = email.toLowerCase();
  if (e === "mustafa.tahir12@gmail.com") return mustafaColors[0]; // orangish default
  if (e === "amnaarif1090@gmail.com") return amnaColors[0]; // pinkish default
  return "bg-gray-100";
}

export function getColorSetForEmail(email?: string | null) {
  if (!email) return ["bg-gray-100"];
  const e = email.toLowerCase();
  if (e === "mustafa.tahir12@gmail.com") return mustafaColors;
  if (e === "amnaarif1090@gmail.com") return amnaColors;
  return ["bg-gray-100"];
}
