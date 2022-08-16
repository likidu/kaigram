import { Configuration, LogLevel, PublicClientApplication, AccountInfo, PopupRequest, RedirectRequest, EndSessionRequest, SilentRequest, InteractionRequiredAuthError, AuthenticationResult } from '@azure/msal-browser'

/**
 * Configuration class for @azure/msal-browser:
 * https://azuread.github.io/microsoft-authentication-library-for-js/ref/msal-browser/modules/_src_config_configuration_.html
 */
const MSAL_CONFIG: Configuration = {
  auth: {
    // clientId: "2eb9245f-612b-46cc-994a-f5e35ef37da0"
    clientId: '20fbf64a-a5bf-46a6-afc1-8871d4f98f07',
    redirectUri: 'http://localhost:5000/blank.html',
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message)
            return
          case LogLevel.Info:
            console.info(message)
            return
          case LogLevel.Verbose:
            console.debug(message)
            return
          case LogLevel.Warning:
            console.warn(message)
            return
        }
      },
    },
  },
};

/**
 * AuthModule for application - handles authentication in app.
 */
export class Auth {
  private msalInstance: PublicClientApplication; // https://azuread.github.io/microsoft-authentication-library-for-js/ref/msal-browser/classes/_src_app_publicclientapplication_.publicclientapplication.html
  private account: AccountInfo | null; // https://azuread.github.io/microsoft-authentication-library-for-js/ref/msal-common/modules/_src_account_accountinfo_.html
  private loginRequest: PopupRequest; // https://azuread.github.io/microsoft-authentication-library-for-js/ref/msal-browser/modules/_src_request_popuprequest_.html
  private loginRedirectRequest: RedirectRequest; // https://azuread.github.io/microsoft-authentication-library-for-js/ref/msal-browser/modules/_src_request_redirectrequest_.html
  private tasksRedirectRequest: RedirectRequest;
  private tasksSilentRequest: SilentRequest; // https://azuread.github.io/microsoft-authentication-library-for-js/ref/msal-browser/modules/_src_request_popuprequest_.html

  constructor() {
    this.msalInstance = new PublicClientApplication(MSAL_CONFIG);
    this.account = null;

    this.loginRequest = {
      scopes: ["Tasks.Read"],
    };

    this.loginRedirectRequest = {
      scopes: ["Tasks.Read"],
      redirectStartPage: window.location.href,
    };

    // Add here scopes for access token to be used at MS Graph API endpoints.
    this.tasksRedirectRequest = {
      scopes: ["Tasks.Read"]
    };

    this.tasksSilentRequest = {
      scopes: ["openid", "profile", "Tasks.Read"],
      forceRefresh: false,
    };
  }

  /**
   * Calls loginPopup.
   */
  async login(): Promise<AccountInfo | null> {
    try {
      const response = await this.msalInstance.loginPopup(this.loginRequest);
      if (response !== null) {
        this.account = response.account;
      } else {
        this.account = this.getAccount();
      }
      return this.account;
    } catch (e) {
      console.error("[Auth] : Failed to loginPopup()", e);
    }
    return null;
  }

  /**
   * Logs out of current account.
   */
  logout(): void {
    let account: AccountInfo | undefined;
    if (this.account = account) {
      account = this.account;
    }

    const logOutRequest: EndSessionRequest = { account };

    this.msalInstance.logoutPopup(logOutRequest);
  }

  /**
   * Calls getAllAccounts and determines the correct account to sign into, currently defaults to first account found in cache.
   * TODO: Add account chooser code
   * 
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
   */
  private getAccount(): AccountInfo | null {
    // need to call getAccount here?
    const currentAccounts = this.msalInstance.getAllAccounts();
    if (currentAccounts === null) {
      console.log("[Auth] : No accounts detected");
      return null;
  }

    if (currentAccounts.length > 1) {
      // Add choose account code here
      console.log("[Auth] : Multiple accounts detected, need to add choose account code.");
      return currentAccounts[0];
    } else if (currentAccounts.length === 1) {
      return currentAccounts[0];
    }

    return null;
  }

  /**
   * Checks whether we are in the middle of a redirect and handles state accordingly. Only required for redirect flows.
   * 
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/initialization.md#redirect-apis
   */
  async loadAuthModule(): Promise<AccountInfo|null> {
    try {
      const response = await this.msalInstance.handleRedirectPromise();
      if (response !== null) {
        this.account = response.account;
      } else {
        this.account = this.getAccount();
      }
      return this.account;
    } catch (e) {
      console.error("[Auth] : Failed to handleRedirectPromise()", e);
    }
    return null;
  }

  /**
   * Gets the token to read tasks data from MS Graph silently, or falls back to interactive popup.
   */
  async getTasksTokenPopup(): Promise<string|null> {
    if (this.account) {
      this.tasksSilentRequest.account = this.account;
    }
    return this.getTokenPopup(this.tasksSilentRequest, this.tasksRedirectRequest);
  }

  /**
   * Gets a token silently, or falls back to interactive popup.
   */
  private async getTokenPopup(silentRequest: SilentRequest, interactiveRequest: PopupRequest): Promise<string|null> {
    try {
      const response = await this.msalInstance.acquireTokenSilent(silentRequest);
      return response.accessToken;
    } catch (e) {
      console.log("[Auth] : Silent token acquisition fails.");
      if (e instanceof InteractionRequiredAuthError) {
        // Acqure token popup flow
        try {
          console.log("[Auth] : Acquiring token using popup.");
          const response = await this.msalInstance.acquireTokenPopup(interactiveRequest);
          return response.accessToken;
        } catch (e) {
          console.error("[Auth] : Failed to acquireTokenPopup()", e);
          return null;
        }
      } else {
        console.error(e);
      }
    }

    return null;
  }
}
