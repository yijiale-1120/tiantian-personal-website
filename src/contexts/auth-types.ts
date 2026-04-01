export type AuthContextValue = {
  token: string | null;
  username: string | null;
  isReady: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};
