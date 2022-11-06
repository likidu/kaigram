type StateObj = {
  focusedId?: string;
  [key: string]: string | number;
};

export class Route {
  static setState(obj: StateObj): void {
    history.replaceState(
      {
        ...history.state,
        __onyx: obj,
      },
      ''
    );
  }

  static updateState(obj: Partial<StateObj>): void {
    history.replaceState(
      {
        ...history.state,
        __onyx: {
          ...history.state?.__onyx,
          ...obj,
        },
      },
      ''
    );
  }

  static getState(): StateObj {
    return history.state?.__onyx || {};
  }
}
