const mobileNavButton = document.querySelector(".mobile-nav-toggle");
const navPanel = document.querySelector(".nav-panel");
const authPageType = document.body.dataset.authPage;
const authControls = document.querySelector("[data-auth-controls]");
const authUser = document.querySelector("[data-auth-user]");
const logoutButton = document.querySelector("[data-auth-logout]");
const changePasswordButton = document.querySelector("[data-auth-change-password]");

const defaultAccounts = [
  { id: "admin", password: "admin1234", label: "관리자", role: "admin" },
  { id: "gn01", password: "1001", label: "김교수", role: "member" },
  { id: "gn02", password: "1002", label: "이교수", role: "member" },
  { id: "gn03", password: "1003", label: "박교수", role: "member" },
  { id: "gn04", password: "1004", label: "최교수", role: "member" },
  { id: "gn05", password: "1005", label: "정교수", role: "member" },
  { id: "gn06", password: "1006", label: "강교수", role: "member" },
  { id: "gn07", password: "1007", label: "조교수", role: "member" },
  { id: "gn08", password: "1008", label: "윤교수", role: "member" },
  { id: "gn09", password: "1009", label: "장교수", role: "member" },
  { id: "gn10", password: "1010", label: "임교수", role: "member" }
];

const authStorageKey = "gnFieldProfessorCurrentUser";
const passwordStorageKey = "gnFieldProfessorPasswords";

function getPasswordOverrides() {
  const raw = localStorage.getItem(passwordStorageKey);
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(passwordStorageKey);
    return {};
  }
}

function setPasswordOverrides(overrides) {
  localStorage.setItem(passwordStorageKey, JSON.stringify(overrides));
}

function getAccounts() {
  const overrides = getPasswordOverrides();
  return defaultAccounts.map((account) => ({
    ...account,
    password: overrides[account.id] || account.password
  }));
}

function getAccountById(userId) {
  return getAccounts().find((account) => account.id === userId) || null;
}

function getCurrentUser() {
  const raw = localStorage.getItem(authStorageKey);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(authStorageKey);
    return null;
  }
}

function setCurrentUser(user) {
  localStorage.setItem(authStorageKey, JSON.stringify(user));
}

function clearCurrentUser() {
  localStorage.removeItem(authStorageKey);
}

function createLoginModal() {
  const wrapper = document.createElement("div");
  wrapper.id = "simpleLoginModal";
  wrapper.className = "fixed inset-0 z-[90] flex items-center justify-center bg-slate-900/60 px-4 py-8 backdrop-blur-md";
  wrapper.innerHTML = `
    <section class="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_28px_70px_-30px_rgba(15,23,42,0.45)] sm:p-10">
      <span class="inline-flex rounded-full bg-sky-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#1a365d]">
        Member Login
      </span>
      <h2 class="mt-5 text-3xl font-black text-[#1a365d]">교수진 로그인</h2>
      <p class="mt-4 break-keep-all text-sm leading-7 text-slate-600">
        관리자에게 받은 아이디와 비밀번호를 입력해 주세요. 로그인해야 홈페이지 내용을 확인할 수 있습니다.
      </p>
      <form id="simpleLoginForm" class="mt-8 space-y-4">
        <div>
          <label for="simpleLoginId" class="mb-2 block text-sm font-semibold text-slate-600">아이디</label>
          <input id="simpleLoginId" type="text" class="w-full rounded-2xl border border-slate-200 px-4 py-4 text-base outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100" placeholder="예: gn01" autocomplete="username">
        </div>
        <div>
          <label for="simpleLoginPassword" class="mb-2 block text-sm font-semibold text-slate-600">비밀번호</label>
          <input id="simpleLoginPassword" type="password" class="w-full rounded-2xl border border-slate-200 px-4 py-4 text-base outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100" placeholder="예: 1001" autocomplete="current-password">
        </div>
        <p id="simpleLoginHelp" class="min-h-[1.5rem] break-keep-all text-sm font-medium text-slate-500">
          현재 계정 형식은 gn01~gn10 / 1001~1010 이며, 관리자 계정은 admin / admin1234 입니다.
        </p>
        <button type="submit" class="inline-flex min-h-[54px] w-full items-center justify-center rounded-full bg-[#1a365d] px-6 py-4 text-base font-semibold text-white transition hover:scale-[1.02] active:scale-[0.98]">
          로그인
        </button>
      </form>
    </section>
  `;
  return wrapper;
}

function createChangePasswordModal(currentUser) {
  const wrapper = document.createElement("div");
  wrapper.id = "changePasswordModal";
  wrapper.className = "fixed inset-0 z-[95] flex items-center justify-center bg-slate-900/60 px-4 py-8 backdrop-blur-md";
  wrapper.innerHTML = `
    <section class="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_28px_70px_-30px_rgba(15,23,42,0.45)] sm:p-10">
      <div class="flex items-center justify-between gap-4">
        <div>
          <span class="inline-flex rounded-full bg-sky-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#1a365d]">
            Password Update
          </span>
          <h2 class="mt-4 text-3xl font-black text-[#1a365d]">비밀번호 변경</h2>
        </div>
        <button type="button" data-close-password-modal class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50">
          ✕
        </button>
      </div>
      <p class="mt-4 break-keep-all text-sm leading-7 text-slate-600">
        ${currentUser.label} (${currentUser.id}) 계정의 비밀번호를 새로 설정합니다.
      </p>
      <form id="changePasswordForm" class="mt-8 space-y-4">
        <div>
          <label for="currentPassword" class="mb-2 block text-sm font-semibold text-slate-600">현재 비밀번호</label>
          <input id="currentPassword" type="password" class="w-full rounded-2xl border border-slate-200 px-4 py-4 text-base outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100" autocomplete="current-password">
        </div>
        <div>
          <label for="newPassword" class="mb-2 block text-sm font-semibold text-slate-600">새 비밀번호</label>
          <input id="newPassword" type="password" class="w-full rounded-2xl border border-slate-200 px-4 py-4 text-base outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100" autocomplete="new-password">
        </div>
        <div>
          <label for="confirmPassword" class="mb-2 block text-sm font-semibold text-slate-600">새 비밀번호 확인</label>
          <input id="confirmPassword" type="password" class="w-full rounded-2xl border border-slate-200 px-4 py-4 text-base outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100" autocomplete="new-password">
        </div>
        <p id="changePasswordHelp" class="min-h-[1.5rem] break-keep-all text-sm font-medium text-slate-500">
          숫자 4자리 이상으로 바꾸면 교수님들이 쓰기 편합니다.
        </p>
        <button type="submit" class="inline-flex min-h-[54px] w-full items-center justify-center rounded-full bg-[#1a365d] px-6 py-4 text-base font-semibold text-white transition hover:scale-[1.02] active:scale-[0.98]">
          변경 저장
        </button>
      </form>
    </section>
  `;
  return wrapper;
}

function updateAuthUi(user) {
  if (!authControls || !authUser) {
    return;
  }

  authControls.classList.remove("hidden");
  authControls.classList.add("flex");
  authUser.textContent = `${user.label} 로그인`;
}

function protectPage() {
  if (authPageType !== "protected") {
    return;
  }

  const currentUser = getCurrentUser();

  if (currentUser) {
    updateAuthUi(currentUser);
    return;
  }

  document.body.classList.add("overflow-hidden");
  const modal = createLoginModal();
  document.body.appendChild(modal);

  const form = modal.querySelector("#simpleLoginForm");
  const idInput = modal.querySelector("#simpleLoginId");
  const passwordInput = modal.querySelector("#simpleLoginPassword");
  const helpText = modal.querySelector("#simpleLoginHelp");

  idInput?.focus();

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const userId = idInput?.value.trim() ?? "";
    const password = passwordInput?.value.trim() ?? "";

    if (!userId || !password) {
      helpText.textContent = "아이디와 비밀번호를 모두 입력해 주세요.";
      helpText.className = "min-h-[1.5rem] break-keep-all text-sm font-medium text-rose-600";
      return;
    }

    const matchedAccount = getAccounts().find((account) => account.id === userId && account.password === password);

    if (!matchedAccount) {
      helpText.textContent = "아이디 또는 비밀번호가 올바르지 않습니다.";
      helpText.className = "min-h-[1.5rem] break-keep-all text-sm font-medium text-rose-600";
      return;
    }

    setCurrentUser(matchedAccount);
    updateAuthUi(matchedAccount);
    modal.remove();
    document.body.classList.remove("overflow-hidden");
  });
}

function openChangePasswordModal() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return;
  }

  const existingModal = document.getElementById("changePasswordModal");
  if (existingModal) {
    existingModal.remove();
  }

  const modal = createChangePasswordModal(currentUser);
  document.body.appendChild(modal);
  document.body.classList.add("overflow-hidden");

  const closeButton = modal.querySelector("[data-close-password-modal]");
  const form = modal.querySelector("#changePasswordForm");
  const currentPasswordInput = modal.querySelector("#currentPassword");
  const newPasswordInput = modal.querySelector("#newPassword");
  const confirmPasswordInput = modal.querySelector("#confirmPassword");
  const helpText = modal.querySelector("#changePasswordHelp");

  currentPasswordInput?.focus();

  function closeModal() {
    modal.remove();
    document.body.classList.remove("overflow-hidden");
  }

  closeButton?.addEventListener("click", closeModal);

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const liveAccount = getAccountById(currentUser.id);
    const currentPassword = currentPasswordInput?.value.trim() ?? "";
    const newPassword = newPasswordInput?.value.trim() ?? "";
    const confirmPassword = confirmPasswordInput?.value.trim() ?? "";

    if (!liveAccount) {
      helpText.textContent = "계정 정보를 다시 확인해 주세요.";
      helpText.className = "min-h-[1.5rem] break-keep-all text-sm font-medium text-rose-600";
      return;
    }

    if (liveAccount.password !== currentPassword) {
      helpText.textContent = "현재 비밀번호가 맞지 않습니다.";
      helpText.className = "min-h-[1.5rem] break-keep-all text-sm font-medium text-rose-600";
      return;
    }

    if (newPassword.length < 4) {
      helpText.textContent = "새 비밀번호는 4자리 이상으로 입력해 주세요.";
      helpText.className = "min-h-[1.5rem] break-keep-all text-sm font-medium text-rose-600";
      return;
    }

    if (newPassword !== confirmPassword) {
      helpText.textContent = "새 비밀번호 확인이 일치하지 않습니다.";
      helpText.className = "min-h-[1.5rem] break-keep-all text-sm font-medium text-rose-600";
      return;
    }

    const overrides = getPasswordOverrides();
    overrides[currentUser.id] = newPassword;
    setPasswordOverrides(overrides);
    setCurrentUser({ ...currentUser, password: newPassword });

    helpText.textContent = "비밀번호가 변경되었습니다. 다음 로그인부터 새 비밀번호를 사용해 주세요.";
    helpText.className = "min-h-[1.5rem] break-keep-all text-sm font-medium text-emerald-600";

    window.setTimeout(closeModal, 900);
  });
}

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    clearCurrentUser();
    window.location.reload();
  });
}

if (changePasswordButton) {
  changePasswordButton.addEventListener("click", openChangePasswordModal);
}

if (mobileNavButton && navPanel) {
  mobileNavButton.addEventListener("click", () => {
    const isOpen = navPanel.classList.toggle("is-open");
    navPanel.classList.toggle("hidden", !isOpen && window.innerWidth < 1024);
    mobileNavButton.setAttribute("aria-expanded", String(isOpen));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      navPanel.classList.remove("hidden");
      navPanel.classList.remove("is-open");
      mobileNavButton.setAttribute("aria-expanded", "false");
    } else if (!navPanel.classList.contains("is-open")) {
      navPanel.classList.add("hidden");
    }
  });
}

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 1024 && navPanel && mobileNavButton) {
      navPanel.classList.remove("is-open");
      navPanel.classList.add("hidden");
      mobileNavButton.setAttribute("aria-expanded", "false");
    }
  });
});

protectPage();

const revealTargets = document.querySelectorAll(".reveal");

if (revealTargets.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((target) => observer.observe(target));
}

const chartCanvas = document.getElementById("jobChart");

if (chartCanvas && typeof Chart !== "undefined") {
  const labels = [
    "기계",
    "재료",
    "HRD",
    "전기전자",
    "기타",
    "건설",
    "산업안전",
    "조선해양",
    "정보통신",
    "경영회계사무",
    "공예",
    "디자인"
  ];

  const values = [63, 28, 10, 8, 5, 3, 2, 2, 2, 1, 1, 1];

  const baseColors = [
    "#d4a017",
    "#a8b2bd",
    "#4f8fba",
    "#5fa8d3",
    "#77b6ea",
    "#8abfe8",
    "#9dc9ee",
    "#aed3f4",
    "#bfdcf8",
    "#d0e5fb",
    "#c1d9f2",
    "#b2cde8"
  ];

  const hoverColors = [
    "#e0af2b",
    "#b9c2cb",
    "#3f81ae",
    "#4f99c8",
    "#67a8dd",
    "#79b3df",
    "#8dbde6",
    "#9fc9ee",
    "#b0d4f4",
    "#c2def8",
    "#b2cce8",
    "#a3c0de"
  ];

  new Chart(chartCanvas, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "직종별 인원",
          data: values,
          borderRadius: 14,
          borderSkipped: false,
          backgroundColor: baseColors,
          hoverBackgroundColor: hoverColors,
          maxBarThickness: 48
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1400,
        easing: "easeOutQuart",
        delay(context) {
          return context.type === "data" ? context.dataIndex * 80 : 0;
        }
      },
      interaction: {
        mode: "index",
        intersect: false
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: "#0f172a",
          padding: 14,
          cornerRadius: 12,
          titleFont: {
            family: "Pretendard",
            size: 13,
            weight: "700"
          },
          bodyFont: {
            family: "Pretendard",
            size: 13
          },
          callbacks: {
            title(context) {
              return context[0].label;
            },
            label(context) {
              return `인원 ${context.parsed.y}명`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: "#475569",
            font: {
              family: "Pretendard",
              size: 12
            },
            maxRotation: 0,
            minRotation: 0
          }
        },
        y: {
          beginAtZero: true,
          suggestedMax: 70,
          ticks: {
            stepSize: 10,
            color: "#475569",
            font: {
              family: "Pretendard",
              size: 12
            },
            callback(value) {
              return `${value}명`;
            }
          },
          grid: {
            color: "rgba(148, 163, 184, 0.18)"
          }
        }
      }
    }
  });
}
