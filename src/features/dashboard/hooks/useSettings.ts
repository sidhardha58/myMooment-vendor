/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { logoutAllSessions, resetPassword, updatePhoneNumber } from "../api/settingsApi";

export const useSettings = () => {
  const [loading, setLoading] = useState(false);

  /* ---------------- CHANGE PASSWORD ---------------- */
  const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      setLoading(true);

      const res = await resetPassword(oldPassword, newPassword);

      return res;
    } catch (err: any) {
      throw err?.response?.data || err;
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UPDATE PHONE ---------------- */
  const updatePhone = async (token: string) => {
    try {
      setLoading(true);

      const res = await updatePhoneNumber(token);

      return res;
    } catch (err: any) {
      throw err?.response?.data || err;
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- LOGOUT ALL ---------------- */
  const logoutAll = async () => {
    try {
      setLoading(true);

      const res = await logoutAllSessions();

      return res;
    } catch (err: any) {
      throw err?.response?.data || err;
    } finally {
      setLoading(false);
    }
  };

  return {
    changePassword,
    updatePhone,
    logoutAll,
    loading,
  };
};
