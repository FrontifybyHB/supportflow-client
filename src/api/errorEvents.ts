export type ApiNetworkErrorEvent = {
  title: string;
  message: string;
  retry?: () => void;
};

type Listener = (event: ApiNetworkErrorEvent) => void;

const listeners = new Set<Listener>();

export function subscribeToApiNetworkErrors(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function publishApiNetworkError(event: ApiNetworkErrorEvent) {
  listeners.forEach((listener) => listener(event));
}
