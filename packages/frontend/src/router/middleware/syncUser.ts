import { fetchMe } from "../../api/endpoints/user";
import { store } from "../../store";

export const syncUser =
  (fallback = "/dashboard/login") =>
  async () => {
    try {
      const res = await fetchMe();
      if (!res.data.success) return fallback;

      // Save user to the store
      store.account = res.data.data.account;

      return true;
    } catch {
      return fallback;
    }
  };
