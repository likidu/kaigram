import type { TdOptions } from "tdweb";

/**
 * Options for TDLib instance creation.
 */
const Options: TdOptions = {
    onUpdate: u => console.log(u), // Callback for all incoming updates.
    instanceName: 'tdlib', // Name of the TDLib instance. Currently only one instance of TdClient with a given name is allowed. All but one instances with the same name will be automatically closed. Usually, the newest non-background instance is kept alive. Files will be stored in an IndexedDb table with the same name.
    isBackground: false, // Pass true, if the instance is opened from the background.
    jsLogVerbosityLevel: 'info', // The initial verbosity level of the JavaScript part of the code (one of 'error', 'warning', 'info', 'log', 'debug').
    logVerbosityLevel: 2, // The initial verbosity level for the TDLib internal logging (0-1023).
    useDatabase: true, // Pass false to use TDLib without database and secret chats. It will significantly improve loading time, but some functionality will be unavailable.
    readOnly: false, // For debug only. Pass true to open TDLib database in read-only mode
    mode: 'asmjs', // For debug only. The type of the TDLib build to use. 'asmjs' for asm.js and 'wasm' for WebAssembly. If mode == 'auto' WebAbassembly will be used if supported by browser, asm.js otherwise.
  };

export default Options;
