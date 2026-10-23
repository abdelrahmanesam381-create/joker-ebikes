// Shared form helpers for checkout and test ride

export const inputClass =
  "w-full border-[3px] border-ink bg-paper px-4 py-3 font-mono shadow-[4px_4px_0_#111111] focus:outline-4 focus:outline-offset-2 focus:outline-joker";

// Egyptian mobile: 010, 011, 012 or 015, then 8 digits
export const isEgyptianMobile = (phone: string) => /^01[0125]\d{8}$/.test(phone);
