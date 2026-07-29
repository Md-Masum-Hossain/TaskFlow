export const priorityBadgeVariants = {
  high: {
    bg: 'bg-red-100',
    text: 'text-red-700',
  },
  medium: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
  },
  low: {
    bg: 'bg-green-100',
    text: 'text-green-700',
  },
};

export const statusBadgeVariants = {
  todo: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
  },
  'in-progress': {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
  },
  completed: {
    bg: 'bg-green-100',
    text: 'text-green-700',
  },
};

function normalizeVariantKey(value) {
  return String(value || '').trim().toLowerCase();
}

function getVariant(variants, value, fallbackKey) {
  const normalizedValue = normalizeVariantKey(value);
  return variants[normalizedValue] || variants[fallbackKey];
}

export function getPriorityBadgeClass(priority = 'medium') {
  const variant = getVariant(priorityBadgeVariants, priority, 'medium');
  return `${variant.bg} ${variant.text}`;
}

export function getPriorityTextClass(priority = 'medium') {
  return getVariant(priorityBadgeVariants, priority, 'medium').text;
}

export function getStatusBadgeClass(status = 'todo') {
  const variant = getVariant(statusBadgeVariants, status, 'todo');
  return `${variant.bg} ${variant.text}`;
}

export function getStatusTextClass(status = 'todo') {
  return getVariant(statusBadgeVariants, status, 'todo').text;
}