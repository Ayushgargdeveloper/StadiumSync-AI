export type StoredHelpRequest = {
  id: string;
  category: string;
  urgency: string;
  message: string;
  seat: string;
  holder: string;
  createdAt: string;
};

const HELP_REQUESTS_KEY = "stadiumsync.helpRequests";

export function getHelpRequests(): StoredHelpRequest[] {
  try {
    const rawRequests = window.localStorage.getItem(HELP_REQUESTS_KEY);
    return rawRequests ? (JSON.parse(rawRequests) as StoredHelpRequest[]) : [];
  } catch {
    return [];
  }
}

export function saveHelpRequest(request: Omit<StoredHelpRequest, "id" | "createdAt">) {
  const storedRequest: StoredHelpRequest = {
    ...request,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };
  const requests = [storedRequest, ...getHelpRequests()].slice(0, 20);
  window.localStorage.setItem(HELP_REQUESTS_KEY, JSON.stringify(requests));
  window.dispatchEvent(new Event("stadiumsync:help-request"));
  return storedRequest;
}
