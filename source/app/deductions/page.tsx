"use client";

import { FormEvent, useEffect, useState } from "react";
import styles from "./deductions.module.css";

const STORAGE_KEY = "ap3x-deductions:owner-web-app-url";

function readStoredTarget(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function storeTarget(value: string): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
    return true;
  } catch {
    return false;
  }
}

function normalizeAppsScriptUrl(value: string): string | null {
  try {
    const url = new URL(value.trim());
    const isOwnerWebApp =
      url.protocol === "https:" &&
      url.hostname === "script.google.com" &&
      /^\/macros\/s\/[^/]+\/exec\/?$/.test(url.pathname) &&
      !url.username &&
      !url.password;

    if (!isOwnerWebApp) {
      return null;
    }

    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
}

export default function DeductionsShell() {
  const [appUrl, setAppUrl] = useState("");
  const [draftUrl, setDraftUrl] = useState("");
  const [setupMode, setSetupMode] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = normalizeAppsScriptUrl(readStoredTarget());
    const requestedSetup =
      new URLSearchParams(window.location.search).get("setup") === "1";

    if (saved) {
      setAppUrl(saved);
      setDraftUrl(saved);
    }
    setSetupMode(requestedSetup || !saved);
    setHydrated(true);
  }, []);

  function saveTarget(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = normalizeAppsScriptUrl(draftUrl);
    if (!normalized) {
      setError(
        "Paste the owner-only Apps Script deployment URL ending in /exec.",
      );
      return;
    }

    if (!storeTarget(normalized)) {
      setError(
        "Safari blocked local storage. Turn off private browsing for this page and try again.",
      );
      return;
    }
    window.history.replaceState({}, "", "/deductions");
    setAppUrl(normalized);
    setDraftUrl(normalized);
    setError("");
    setSetupMode(false);
  }

  if (!hydrated) {
    return (
      <main className={styles.loading} aria-label="Loading AP3X Deductions">
        <span className={styles.loadingMark}>AP3X</span>
      </main>
    );
  }

  if (setupMode || !appUrl) {
    return (
      <main className={styles.setup}>
        <section className={styles.setupCard} aria-labelledby="setup-title">
          <p className={styles.eyebrow}>AP3X Operations LLC</p>
          <div className={styles.iconFrame} aria-hidden="true">
            <img src="/deductions-icon-192.png" alt="" />
          </div>
          <h1 id="setup-title">Connect Deductions</h1>
          <p className={styles.intro}>
            This phone keeps your private Google deployment address on this
            device. The public AP3X site never stores or publishes it.
          </p>

          <form onSubmit={saveTarget} className={styles.form}>
            <label htmlFor="apps-script-url">Owner-only deployment URL</label>
            <input
              id="apps-script-url"
              name="apps-script-url"
              type="url"
              inputMode="url"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              placeholder="https://script.google.com/macros/s/…/exec"
              value={draftUrl}
              onChange={(event) => {
                setDraftUrl(event.target.value);
                setError("");
              }}
              aria-describedby={error ? "url-error url-help" : "url-help"}
              aria-invalid={Boolean(error)}
              required
            />
            <p id="url-help" className={styles.help}>
              Use the versioned <strong>/exec</strong> link—not /dev.
            </p>
            {error ? (
              <p id="url-error" className={styles.error} role="alert">
                {error}
              </p>
            ) : null}
            <button type="submit">Save on this iPhone</button>
          </form>

          {appUrl ? (
            <button
              className={styles.cancel}
              type="button"
              onClick={() => setSetupMode(false)}
            >
              Cancel
            </button>
          ) : null}

          <p className={styles.securityNote}>
            Google still enforces “Execute as me” and “Only myself.” Saving the
            link here does not grant access to anyone else.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.shell}>
      <iframe
        className={styles.appFrame}
        src={appUrl}
        title="AP3X Deductions"
        referrerPolicy="strict-origin"
      />
      <a
        className={styles.settingsLink}
        href="/deductions?setup=1"
        aria-label="Change the private Deductions deployment link"
      >
        <span aria-hidden="true">•••</span>
      </a>
    </main>
  );
}
