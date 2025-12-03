import { create } from "zustand";

const API = "https://nogbackend-production.up.railway.app";

export const useRegisterStore = create((set) => ({
  token: null,

  initToken: () => {
    const saved = localStorage.getItem("userToken");
    if (saved) set({ token: saved });
  },

  validateApplicant: (data) => {
    const errors = {};

    const get = (k) => (data && data[k] ? String(data[k]).trim() : "");

    const firstName = get('firstName');
    const lastName = get('lastName');
    const email = get('email');
    const phone = get('phone');
    const bio = get('bio');

    if (!firstName || firstName.length < 2) errors.firstName = 'First name must be at least 2 characters.';
    if (!lastName || lastName.length < 2) errors.lastName = 'Last name must be at least 2 characters.';

    // basic email validation
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) errors.email = 'Email is required.';
    else if (!emailRe.test(email)) errors.email = 'Enter a valid email address.';

    // phone: required. allow digits, spaces, +, -, parentheses; require at least 7 digits
    if (!phone) {
      errors.phone = 'Phone number is required.';
    } else {
      const digits = phone.replace(/[^0-9]/g, '');
      if (digits.length < 7) errors.phone = 'Enter a valid phone number with at least 7 digits.';
    }

    // bio: required, minimum length 10, maximum 1000
    if (!bio) {
      errors.bio = 'Bio / Notes is required.';
    } else if (bio.length < 10) {
      errors.bio = 'Bio must be at least 10 characters.';
    } else if (bio.length > 1000) {
      errors.bio = 'Bio must be 1000 characters or fewer.';
    }

    return { valid: Object.keys(errors).length === 0, errors };
  },

 

  applyApplicant: async (applicant) => {
    const { valid, errors } = useRegisterStore.getState().validateApplicant(applicant);
    if (!valid) return { success: false, errors };

    try {
      const res = await fetch(`${API}/api/applicant/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: (applicant.firstName || '').trim(),
          lastName: (applicant.lastName || '').trim(),
          email: (applicant.email || '').trim(),
          phone: applicant.phone ? String(applicant.phone).trim() : undefined,
          bio: applicant.bio ? String(applicant.bio).trim() : undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) return { success: false, message: data.message || 'Failed to apply', errors: data.errors };

      return { success: true, message: data.message || 'Application submitted' };
    } catch (err) {
      return { success: false, message: err.message || 'Network error' };
    }
  },

  logout: () => {
    localStorage.removeItem("adminToken");
    set({ token: null });
  },
}));
