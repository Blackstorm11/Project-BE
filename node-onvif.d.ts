declare module 'node-onvif' {
   export function connect(url: string, username: string, password: string): Promise<any>;
   export function disconnect(): void;
   // add other type declarations as needed
 }
 