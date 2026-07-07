export function initialsFromEmail(email: string | null): string {
  if (!email) {
    return 'ID';
  }

  const [name] = email.split('@');
  return (name ?? 'ID').slice(0, 2).toUpperCase();
}
