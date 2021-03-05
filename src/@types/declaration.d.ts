// declare module "*.css" {
//     const mapping: Record<string, string>;
//     export default mapping;
// }

declare module '*.json' {
    const mapping: {
        [key: string]: unknown
    }
    export default mapping
}
