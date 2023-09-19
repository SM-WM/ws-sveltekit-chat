import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const idStore = writable<string | undefined>(undefined, (set) => {
    if (!browser) return;

    const cachedId = localStorage.getItem("id");
    if (cachedId) {
        set(cachedId);
        return;
    }

    const newId = crypto.randomUUID();
    localStorage.setItem("id", newId);
    set(newId);
});