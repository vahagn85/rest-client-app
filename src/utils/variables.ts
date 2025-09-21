import { VARIABLE_STORAGE } from '@/constants/variable';
import { VariableField } from '@/types/variable.type';

export function getVariables() {
  if (typeof window === 'undefined') return {};
  const saved = localStorage.getItem(VARIABLE_STORAGE);
  if (!saved) return {};
  try {
    const parsed: VariableField[] = JSON.parse(saved);
    return parsed.reduce(
      (acc, { key, value }) => {
        if (key) acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );
  } catch {
    return {};
  }
}

export function replaceVariables(text: string): string {
  const variable = getVariables();
  return text.replace(/{{(.*?)}}/g, (_, name) => variable[name] ?? '');
}
