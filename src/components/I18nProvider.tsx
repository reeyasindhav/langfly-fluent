"use client";

import { useEffect, type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../lib/i18n";

export function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      document.documentElement.lang = lng;
      localStorage.setItem("i18nextLng", lng);
    };

    i18n.on("languageChanged", handleLanguageChange);

    const savedLng = localStorage.getItem("i18nextLng");
    if (savedLng && i18n.language !== savedLng) {
      i18n.changeLanguage(savedLng);
    } else {
      handleLanguageChange(i18n.language);
    }

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export function useTranslation(namespaces?: string | string[]) {
  return i18n.useTranslation(namespaces);
}

export function useLanguage() {
  const { i18n } = i18n.useTranslation();
  return {
    language: i18n.language,
    languages: i18n.languages,
    changeLanguage: i18n.changeLanguage.bind(i18n),
    isReady: i18n.isInitialized,
  };
}
