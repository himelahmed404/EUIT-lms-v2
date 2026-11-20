export function initPage(signal) {
  const form = document.getElementById("profile-details");
  const storageKey = "eit.profile.EIT-24-0148";
  let state = {};
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved && typeof saved === "object") state = saved;
  } catch {}
  function persist() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
      return true;
    } catch {
      return false;
    }
  }
  const say = (id, text) => {
    const target = document.getElementById(id);
    if (!signal.aborted && target) target.textContent = text;
  };
  const panels = [...document.querySelectorAll("[data-pf-panel]")];
  const links = [...document.querySelectorAll("[data-pf-tab]")];
  function selectPanel() {
    const id =
      panels.find((p) => "#" + p.id === location.hash)?.id || "pf-account";
    panels.forEach((p) => {
      p.hidden = p.id !== id;
    });
    links.forEach((link) => {
      if (link.dataset.pfTab === id)
        link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
  links.forEach((link) =>
    link.addEventListener(
      "click",
      (e) => {
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        if (location.hash !== link.hash) history.pushState(null, "", link.hash);
        selectPanel();
      },
      { signal },
    ),
  );
  window.addEventListener("hashchange", selectPanel, { signal });
  window.addEventListener("popstate", selectPanel, { signal });
  selectPanel();

  for (const name of ["name", "email", "guardian"])
    if (typeof state[name] === "string")
      form.elements[name].value = state[name];
  form.addEventListener(
    "input",
    (e) => {
      e.target.setCustomValidity("");
      say("details-status", "");
    },
    { signal },
  );
  form.addEventListener(
    "submit",
    (e) => {
      e.preventDefault();
      const { name, email, guardian } = form.elements;
      name.setCustomValidity(name.value.trim() ? "" : "Enter your full name.");
      guardian.setCustomValidity(
        !guardian.value.trim() ||
          (/^\+?[\d ()-]{6,24}$/.test(guardian.value.trim()) &&
            guardian.value.replace(/\D/g, "").length >= 6)
          ? ""
          : "Enter a phone number.",
      );
      if (!form.reportValidity()) return;
      Object.assign(state, {
        name: name.value.trim(),
        email: email.value.trim(),
        guardian: guardian.value.trim(),
      });
      const saved = persist();
      document.dispatchEvent(
        new CustomEvent("student-profile-updated", { detail: state }),
      );
      say(
        "details-status",
        saved
          ? "Changes saved on this device."
          : "Updated for this visit. Browser storage is unavailable.",
      );
    },
    { signal },
  );
  const photoInput = document.getElementById("photo-file");
  const choosePhoto = document.getElementById("photo-select");
  choosePhoto.addEventListener("click", () => photoInput.click(), { signal });
  photoInput.addEventListener(
    "change",
    async () => {
      const file = photoInput.files[0];
      if (!file) return;
      photoInput.value = "";
      if (
        !["image/png", "image/jpeg", "image/webp"].includes(file.type) ||
        file.size > 5 * 1024 * 1024
      ) {
        say("photo-status", "Choose a JPG, PNG or WebP image under 5 MB.");
        return;
      }
      const url = URL.createObjectURL(file);
      choosePhoto.disabled = true;
      try {
        const img = new Image();
        img.src = url;
        await img.decode();
        if (signal.aborted) return;
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 192;
        const size = Math.min(img.naturalWidth, img.naturalHeight);
        canvas
          .getContext("2d")
          .drawImage(
            img,
            (img.naturalWidth - size) / 2,
            (img.naturalHeight - size) / 2,
            size,
            size,
            0,
            0,
            192,
            192,
          );
        state.photo = canvas.toDataURL("image/png");
        const saved = persist();
        document.dispatchEvent(
          new CustomEvent("student-profile-updated", { detail: state }),
        );
        say(
          "photo-status",
          saved
            ? "Photo saved on this device."
            : "Photo updated for this visit.",
        );
      } catch {
        say("photo-status", "Could not open that image.");
      } finally {
        URL.revokeObjectURL(url);
        choosePhoto.disabled = false;
      }
    },
    { signal },
  );

  document.querySelectorAll("[data-pref]").forEach((input) => {
    const key = input.dataset.pref;
    if (!input.disabled && typeof state.prefs?.[key] === "boolean")
      input.checked = state.prefs[key];
    input.addEventListener(
      "change",
      () => {
        state.prefs = { ...state.prefs, [key]: input.checked };
        say(
          "pref-status",
          persist()
            ? "Preferences saved on this device."
            : "Preferences updated for this visit.",
        );
      },
      { signal },
    );
  });
  document.getElementById("copy-referral").addEventListener(
    "click",
    async () => {
      try {
        await navigator.clipboard.writeText("NUSRAT148");
        say("copy-status", "Referral code copied.");
      } catch {
        say("copy-status", "Select and copy the code NUSRAT148.");
      }
    },
    { signal },
  );
  document.querySelector("[data-redeem-action]").addEventListener(
    "click",
    (e) => {
      if (!e.target.closest("button")) return;
      say("pf-redeem-msg", "Demo installment total with PUJA15: ৳4,250.");
      e.currentTarget.replaceChildren();
    },
    { signal },
  );
  const password = document.getElementById("profile-password");
  password.addEventListener(
    "input",
    () => {
      password.elements.repeat.setCustomValidity("");
      say("password-status", "");
    },
    { signal },
  );
  password.addEventListener(
    "submit",
    (e) => {
      e.preventDefault();
      password.elements.repeat.setCustomValidity(
        password.elements.next.value === password.elements.repeat.value
          ? ""
          : "The passwords must match.",
      );
      if (!password.reportValidity()) return;
      password.reset();
      say(
        "password-status",
        "Demo password check passed. Your sign-in password has not changed.",
      );
    },
    { signal },
  );
  const otherDevice = document.querySelector("[data-other-device]");
  otherDevice.hidden = !!state.otherDeviceSignedOut;
  document.getElementById("device-logout").addEventListener(
    "click",
    () => {
      state.otherDeviceSignedOut = true;
      persist();
      otherDevice.hidden = true;
      say("device-status", "Android phone signed out in this demo.");
    },
    { signal },
  );
}
