import { useEffect, useState } from "react";

/**
 * Hook #1 — useLocalStorage
 * Menyimpan state ke localStorage secara persisten.
 * @param {string} key      kunci penyimpanan
 * @param {*}      initial  nilai awal jika belum ada data tersimpan
 */
export default function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : initial;
    } catch {
      // Jika localStorage gagal (mis. privacy mode), lanjut tanpa persistensi
      return initial;
    }
  });

  // useEffect: tulis ke localStorage setiap kali state berubah
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      return;
    }
  }, [key, value]);

  return [value, setValue];
}
