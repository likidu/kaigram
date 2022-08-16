/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="svelte" />
/// <reference types="vite/client" />

// For UI components
declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    // If you want to use on:beforeinstallprompt
    onbeforeinstallprompt?: (event: any) => any;
    // If you want to use myCustomAttribute={..} (note: all lowercase)
    onitemselected?: any;
    onitemchanged?: any;
    onitemfocus?: any;
    onitemblur?: any;
    onitemselect?: any;
    onitemmenu?: any;
    class?: string;
    // You can replace any with something more specific if you like
  }
}