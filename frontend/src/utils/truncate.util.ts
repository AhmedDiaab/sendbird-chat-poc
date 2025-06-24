export function truncate(str: string, maxLength: number = 40): string {
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
}