export function getMethodColor(method: string) {
  switch (method.toUpperCase()) {
    case 'GET':
      return 'bg-blue-100 text-blue-700 border-blue-300';
    case 'POST':
      return 'bg-green-100 text-green-700 border-green-300';
    case 'PUT':
      return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    case 'DELETE':
      return 'bg-red-100 text-red-700 border-red-300';
    case 'PATCH':
      return 'bg-purple-100 text-purple-700 border-purple-300';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300';
  }
}
