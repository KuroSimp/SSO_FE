const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return emailPattern.test(value.trim());
}

export function requiredMessage(label: string): string {
  return `${label} is required.`;
}
