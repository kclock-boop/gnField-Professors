const mobileNavButton = document.querySelector(".mobile-nav-toggle");
const navPanel = document.querySelector(".nav-panel");
const authPageType = document.body.dataset.authPage || "public";
const authRequiredRole = document.body.dataset.authRole || "member";
const authControls = document.querySelector("[data-auth-controls]");
const authUser = document.querySelector("[data-auth-user]");
const logoutButton = document.querySelector("[data-auth-logout]");
const changePasswordButton = document.querySelector("[data-auth-change-password]");
const adminLink = document.querySelector("[data-admin-link]");
const adminPanel = document.querySelector("[data-admin-panel]");

const defaultAccounts = [
  { id: "admin", password: "admin1234", label: "관리자", role: "admin" },
  { id: "gn101", password: "1101", label: "송경민", role: "member" },
  { id: "gn102", password: "1102", label: "김일록", role: "member" },
  { id: "gn103", password: "1103", label: "이상배", role: "member" },
  { id: "gn104", password: "1104", label: "강원형", role: "member" },
  { id: "gn105", password: "1105", label: "김성현", role: "member" },
  { id: "gn106", password: "1106", label: "옥운이", role: "member" },
  { id: "gn107", password: "1107", label: "이종욱", role: "member" },
  { id: "gn108", password: "1108", label: "현종호", role: "member" },
  { id: "gn109", password: "1109", label: "박정만", role: "member" },
  { id: "gn110", password: "1110", label: "이동주", role: "member" },
  { id: "gn111", password: "1111", label: "정만영", role: "member" },
  { id: "gn112", password: "1112", label: "이량훈", role: "member" },
  { id: "gn113", password: "1113", label: "최영옥", role: "member" },
  { id: "gn114", password: "1114", label: "김태종", role: "member" },
  { id: "gn115", password: "1115", label: "변점용", role: "member" },
  { id: "gn116", password: "1116", label: "김미종", role: "member" },
  { id: "gn117", password: "1117", label: "송성빈", role: "member" },
  { id: "gn118", password: "1118", label: "이민호", role: "member" },
  { id: "gn119", password: "1119", label: "강진규", role: "member" },
  { id: "gn301", password: "1301", label: "박창문", role: "member" },
  { id: "gn302", password: "1302", label: "이성희", role: "member" },
  { id: "gn303", password: "1303", label: "강소라", role: "member" },
  { id: "gn304", password: "1304", label: "박성준", role: "member" },
  { id: "gn305", password: "1305", label: "김종득", role: "member" }
];

const authStorageKey = "gnFieldProfessorCurrentUser";
const passwordStorageKey = "gnFieldProfessorPasswords";
const loginLogStorageKey = "gnFieldProfessorLoginLogs";
const noticeStorageKey = "gnFieldProfessorNotices";
const resourceMetaKey = "gnFieldProfessorResourceMeta";
const resourceDbName = "gnFieldProfessorResourceFiles";
const resourceStoreName = "files";

const resourceCategoryMap = {
  teaching: "교육자료",
  forms: "운영양식",
  reference: "참고자료",
  archive: "사례아카이브"
};

const noticeBadgeClassMap = {
  "공지": "bg-emerald-50 text-emerald-700",
  "안내": "bg-amber-50 text-amber-700",
  "배포": "bg-sky-50 text-sky-700",
  "회의": "bg-violet-50 text-violet-700"
};

const defaultNotices = [
  {
    id: "notice-default-1",
    category: "공지",
    title: "시험용 로그인 운영 안내",
    description: "계정 로그인, 비밀번호 변경, 관리자 안내문 사용 방법을 함께 확인해 주세요.",
    date: "2026-07-20",
    pinned: true,
    createdAt: "2026-07-20T09:00:00+09:00",
    createdBy: "시스템",
    createdById: "system",
    source: "default"
  },
  {
    id: "notice-default-2",
    category: "배포",
    title: "교수님 계정 안내문 배포",
    description: "인쇄용 계정 안내문과 로그인 설명 자료를 관리자 페이지 기준으로 정리했습니다.",
    date: "2026-07-20",
    pinned: false,
    createdAt: "2026-07-20T10:00:00+09:00",
    createdBy: "시스템",
    createdById: "system",
    source: "default"
  },
  {
    id: "notice-default-3",
    category: "안내",
    title: "운영 페이지 확장",
    description: "공지사항, 자료실, 일정, AX교재TF 페이지가 협의회 운영에 맞춰 순차적으로 확장되고 있습니다.",
    date: "2026-07-20",
    pinned: false,
    createdAt: "2026-07-20T11:00:00+09:00",
    createdBy: "시스템",
    createdById: "system",
    source: "default"
  }
];

const defaultResources = [
  {
    id: "default-1",
    title: "AX교재TF 운영 개요",
    category: "reference",
    description: "자료실 운영 방식과 기본 등록 규칙을 안내하는 기본 자료입니다.",
    kind: "link",
    externalUrl: "./ai-tf.html",
    fileName: "AX교재TF 페이지 링크",
    createdAt: "2026-07-24",
    createdBy: "시스템",
    source: "default"
  },
  {
    id: "default-2",
    title: "협의회 공지사항 바로가기",
    category: "forms",
    description: "운영 공지와 제출 일정은 공지사항 페이지에서도 함께 확인할 수 있습니다.",
    kind: "link",
    externalUrl: "./notices.html",
    fileName: "공지사항 링크",
    createdAt: "2026-07-24",
    createdBy: "시스템",
    source: "default"
  },
  {
    id: "default-3",
    title: "협의회 일정 페이지",
    category: "archive",
    description: "회의 일정과 진행 상황을 확인할 수 있는 연결 자료입니다.",
    kind: "link",
    externalUrl: "./schedule.html",
    fileName: "일정 페이지 링크",
    createdAt: "2026-07-24",
    createdBy: "시스템",
    source: "default"
  }
];

function getPasswordOverrides() {
  const raw = localStorage.getItem(passwordStorageKey);
  if (!raw) return {};

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
  if (!raw) return null;

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

function getLoginLogs() {
  const raw = localStorage.getItem(loginLogStorageKey);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem(loginLogStorageKey);
    return [];
  }
}

function setLoginLogs(logs) {
  localStorage.setItem(loginLogStorageKey, JSON.stringify(logs));
}

function readCustomNotices() {
  const raw = localStorage.getItem(noticeStorageKey);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem(noticeStorageKey);
    return [];
  }
}

function writeCustomNotices(notices) {
  localStorage.setItem(noticeStorageKey, JSON.stringify(notices));
}

function normalizeNoticeDate(value) {
  if (!value) return "";
  const parts = String(value).split("-");
  if (parts.length !== 3) return value;
  return `${parts[0]}년 ${parts[1]}월 ${parts[2]}일`;
}

function getAllNotices() {
  const custom = readCustomNotices();
  return [...defaultNotices, ...custom].sort((a, b) => {
    if (Boolean(b.pinned) !== Boolean(a.pinned)) return Number(b.pinned) - Number(a.pinned);
    const aTime = new Date(a.createdAt || a.date).getTime();
    const bTime = new Date(b.createdAt || b.date).getTime();
    return bTime - aTime;
  });
}

function recordLoginEvent(user) {
  const logs = getLoginLogs();
  logs.unshift({
    id: `login-${Date.now()}`,
    userId: user.id,
    label: user.label,
    role: user.role,
    page: window.location.pathname,
    timestamp: new Date().toISOString()
  });

  setLoginLogs(logs.slice(0, 200));
}

function formatDateTime(value) {
  if (!value) return "-";

  try {
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function isAdmin(user) {
  return user?.role === "admin";
}

function syncAdminUi(user) {
  if (adminLink) {
    adminLink.classList.toggle("hidden", !isAdmin(user));
    adminLink.classList.toggle("inline-flex", isAdmin(user));
  }

  if (adminPanel) {
    adminPanel.classList.toggle("hidden", !isAdmin(user));
  }
}

function updateAuthUi(user) {
  if (!authControls || !authUser) return;

  authControls.classList.remove("hidden");
  authControls.classList.add("flex");
  authUser.textContent = "로그인";
  syncAdminUi(user);
}

function buildNoticeCard(notice, currentUser) {
  const badgeClass = noticeBadgeClassMap[notice.category] || "bg-slate-100 text-slate-700";
  const canDelete = notice.source === "custom" && currentUser && isAdmin(currentUser);
  return `
    <article class="glass-card rounded-[2rem] p-7">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div class="flex flex-wrap items-center gap-2">
            <span class="inline-flex rounded-full px-3 py-1 text-xs font-bold ${badgeClass}">${notice.category}</span>
            ${notice.pinned ? '<span class="inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700">중요</span>' : ""}
          </div>
          <h2 class="mt-4 text-2xl font-black text-council-navy">${notice.title}</h2>
          <p class="mt-3 text-sm leading-7 text-slate-600">${notice.description}</p>
          <p class="mt-3 text-xs font-semibold text-slate-400">등록자 ${notice.createdBy || "시스템"}</p>
        </div>
        <div class="flex flex-col items-start gap-3 text-sm font-semibold text-slate-500 lg:items-end">
          <div>${normalizeNoticeDate(notice.date)}</div>
          ${canDelete ? `<button type="button" data-notice-delete="${notice.id}" class="inline-flex min-h-[42px] items-center justify-center rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100">삭제</button>` : ""}
        </div>
      </div>
    </article>
  `;
}

function initializeAuthUi() {
  const currentUser = getCurrentUser();
  if (currentUser) {
    updateAuthUi(currentUser);
    return currentUser;
  }

  if (authUser) {
    authUser.textContent = "로그인";
  }
  syncAdminUi(null);
  return null;
}

function showAdminOnlyMessage() {
  const wrapper = document.createElement("div");
  wrapper.className = "fixed inset-0 z-[99] flex items-center justify-center bg-slate-900/60 px-4 py-8 backdrop-blur-md";
  wrapper.innerHTML = `
    <section class="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_28px_70px_-30px_rgba(15,23,42,0.45)] sm:p-10">
      <span class="inline-flex rounded-full bg-rose-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-rose-700">
        Admin Only
      </span>
      <h2 class="mt-5 text-3xl font-black text-[#1a365d]">관리자 전용 페이지입니다</h2>
      <p class="mt-4 break-keep-all text-sm leading-7 text-slate-600">
        이 페이지는 관리자 계정으로 로그인했을 때만 열 수 있습니다. 메인 페이지로 돌아가 관리자 계정으로 다시 로그인해 주세요.
      </p>
      <a href="./index.html" class="mt-8 inline-flex min-h-[54px] w-full items-center justify-center rounded-full bg-[#1a365d] px-6 py-4 text-base font-semibold text-white transition hover:scale-[1.02] active:scale-[0.98]">
        메인으로 돌아가기
      </a>
    </section>
  `;
  document.body.appendChild(wrapper);
  document.body.classList.add("overflow-hidden");
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
        이 페이지는 AX교재TF 전용 화면입니다. 관리자에게 받은 아이디와 비밀번호를 입력한 뒤 접속해 주세요.
      </p>
      <form id="simpleLoginForm" class="mt-8 space-y-4">
        <div>
          <label for="simpleLoginId" class="mb-2 block text-sm font-semibold text-slate-600">아이디</label>
          <input id="simpleLoginId" type="text" class="w-full rounded-2xl border border-slate-200 px-4 py-4 text-base outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100" placeholder="예: gn101" autocomplete="username">
        </div>
        <div>
          <label for="simpleLoginPassword" class="mb-2 block text-sm font-semibold text-slate-600">비밀번호</label>
          <input id="simpleLoginPassword" type="password" class="w-full rounded-2xl border border-slate-200 px-4 py-4 text-base outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100" placeholder="예: 1101" autocomplete="current-password">
        </div>
        <p id="simpleLoginHelp" class="min-h-[1.5rem] break-keep-all text-sm font-medium text-slate-500">
          관리자에게 안내받은 아이디와 비밀번호를 입력해 주세요.
        </p>
        <button type="submit" class="inline-flex min-h-[54px] w-full items-center justify-center rounded-full bg-[#1a365d] px-6 py-4 text-base font-semibold text-white transition hover:scale-[1.02] active:scale-[0.98]">
          로그인
        </button>
      </form>
    </section>
  `;
  return wrapper;
}

function openLoginModal() {
  if (document.getElementById("simpleLoginModal")) return;

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

    if (!canAccessPage(matchedAccount)) {
      helpText.textContent = "이 페이지는 관리자 계정으로만 접속할 수 있습니다.";
      helpText.className = "min-h-[1.5rem] break-keep-all text-sm font-medium text-rose-600";
      return;
    }

    recordLoginEvent(matchedAccount);
    setCurrentUser(matchedAccount);
    updateAuthUi(matchedAccount);
    modal.remove();
    document.body.classList.remove("overflow-hidden");
    window.location.reload();
  });
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
          ×
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

function canAccessPage(user) {
  if (authRequiredRole !== "admin") return true;
  return isAdmin(user);
}

function protectPage() {
  const currentUser = initializeAuthUi();
  if (authPageType !== "protected") return;

  if (currentUser) {
    if (!canAccessPage(currentUser)) showAdminOnlyMessage();
    return;
  }

  openLoginModal();
}

function initAdminDashboard() {
  const dashboard = document.querySelector("[data-login-dashboard]");
  if (!dashboard) return;

  const logs = getLoginLogs();
  const totalEl = dashboard.querySelector("[data-login-total]");
  const memberEl = dashboard.querySelector("[data-login-member-count]");
  const adminEl = dashboard.querySelector("[data-login-admin-count]");
  const latestEl = dashboard.querySelector("[data-login-latest]");
  const tableBody = dashboard.querySelector("[data-login-log-body]");
  const emptyState = dashboard.querySelector("[data-login-empty]");
  const resetButton = dashboard.querySelector("[data-login-reset]");

  const memberLogins = logs.filter((log) => log.role === "member").length;
  const adminLogins = logs.filter((log) => log.role === "admin").length;
  const latest = logs[0];

  if (totalEl) totalEl.textContent = `${logs.length}건`;
  if (memberEl) memberEl.textContent = `${memberLogins}건`;
  if (adminEl) adminEl.textContent = `${adminLogins}건`;
  if (latestEl) latestEl.textContent = latest ? `${latest.label} · ${formatDateTime(latest.timestamp)}` : "기록 없음";

  if (tableBody) {
    tableBody.innerHTML = logs.slice(0, 20).map((log, index) => `
      <tr>
        <td class="px-5 py-4">${index + 1}</td>
        <td class="px-5 py-4 font-semibold text-council-navy">${log.label}</td>
        <td class="px-5 py-4">${log.userId}</td>
        <td class="px-5 py-4">${log.role === "admin" ? "관리자" : "교수/기관"}</td>
        <td class="px-5 py-4">${formatDateTime(log.timestamp)}</td>
        <td class="px-5 py-4">${log.page || "-"}</td>
      </tr>
    `).join("");
  }

  if (emptyState) {
    emptyState.classList.toggle("hidden", logs.length > 0);
  }

  resetButton?.addEventListener("click", () => {
    localStorage.removeItem(loginLogStorageKey);
    window.location.reload();
  });
}

function openChangePasswordModal() {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  const existingModal = document.getElementById("changePasswordModal");
  if (existingModal) existingModal.remove();

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

function openResourceDb() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("indexedDB_not_supported"));
      return;
    }

    const request = indexedDB.open(resourceDbName, 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(resourceStoreName)) {
        db.createObjectStore(resourceStoreName);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveResourceFile(resourceId, file) {
  const db = await openResourceDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(resourceStoreName, "readwrite");
    const store = transaction.objectStore(resourceStoreName);
    const request = store.put(file, resourceId);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function getResourceFile(resourceId) {
  const db = await openResourceDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(resourceStoreName, "readonly");
    const store = transaction.objectStore(resourceStoreName);
    const request = store.get(resourceId);

    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

async function deleteResourceFile(resourceId) {
  const db = await openResourceDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(resourceStoreName, "readwrite");
    const store = transaction.objectStore(resourceStoreName);
    const request = store.delete(resourceId);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function readCustomResourceMeta() {
  const raw = localStorage.getItem(resourceMetaKey);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem(resourceMetaKey);
    return [];
  }
}

function writeCustomResourceMeta(resources) {
  localStorage.setItem(resourceMetaKey, JSON.stringify(resources));
}

function formatResourceDate(value) {
  if (!value) return "-";

  try {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(date);
  } catch {
    return value;
  }
}

function formatFileSize(size) {
  if (!size && size !== 0) return "";

  if (size < 1024) return `${size}B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)}KB`;
  return `${(size / (1024 * 1024)).toFixed(1)}MB`;
}

function getAllResources() {
  const custom = readCustomResourceMeta();
  return [...defaultResources, ...custom].sort((a, b) => {
    const left = new Date(b.createdAt).getTime();
    const right = new Date(a.createdAt).getTime();
    return left - right;
  });
}

function buildResourceCard(resource, currentUser) {
  const canDelete = resource.source === "custom" && currentUser && (isAdmin(currentUser) || currentUser.id === resource.createdById);
  const kindLabel = resource.kind === "file" ? "파일" : "링크";
  const actionLabel = resource.kind === "file" ? "다운로드" : "열기";
  const metaLine = [
    resourceCategoryMap[resource.category] || "기타",
    resource.fileName || "",
    resource.kind === "file" && resource.fileSize ? formatFileSize(resource.fileSize) : ""
  ].filter(Boolean).join(" · ");

  return `
    <article class="soft-panel rounded-[1.6rem] p-6">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div class="min-w-0 flex-1 break-keep">
          <div class="flex flex-wrap items-center gap-2">
            <span class="rounded-full bg-council-mist px-3 py-1 text-xs font-bold text-council-navy">${resourceCategoryMap[resource.category] || "기타"}</span>
            <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">${kindLabel}</span>
          </div>
          <h3 class="mt-4 text-2xl font-black text-council-navy">${resource.title}</h3>
          <p class="mt-3 text-sm leading-7 text-slate-600">${resource.description || "설명 없음"}</p>
          <div class="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-slate-500">
            <span>등록일 ${formatResourceDate(resource.createdAt)}</span>
            <span>등록자 ${resource.createdBy || "시스템"}</span>
            ${metaLine ? `<span>${metaLine}</span>` : ""}
          </div>
        </div>
        <div class="flex flex-wrap gap-3">
          <button type="button" data-resource-open="${resource.id}" class="inline-flex min-h-[46px] items-center justify-center rounded-full bg-council-navy px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]">
            ${actionLabel}
          </button>
          ${canDelete ? `
            <button type="button" data-resource-delete="${resource.id}" class="inline-flex min-h-[46px] items-center justify-center rounded-full border border-rose-200 bg-rose-50 px-5 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-100">
              삭제
            </button>
          ` : ""}
        </div>
      </div>
    </article>
  `;
}

function setUploadFormEnabled(form, enabled) {
  if (!form) return;
  const fields = form.querySelectorAll("input, select, textarea, button");
  fields.forEach((field) => {
    if (field.id === "resourceUploadReset") return;
    field.disabled = !enabled;
  });
}

async function triggerResourceOpen(resourceId) {
  const resources = getAllResources();
  const target = resources.find((resource) => resource.id === resourceId);
  if (!target) return;

  if (target.kind === "link" && target.externalUrl) {
    window.open(target.externalUrl, "_blank", "noopener,noreferrer");
    return;
  }

  if (target.kind === "file") {
    const blob = await getResourceFile(resourceId);
    if (!blob) {
      alert("이 브라우저에 저장된 파일을 찾을 수 없습니다.");
      return;
    }

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = target.fileName || target.title;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

async function initResourceLibrary() {
  const page = document.querySelector("[data-resource-library]");
  if (!page) return;

  const currentUser = getCurrentUser();
  const list = document.getElementById("resourceList");
  const emptyState = document.getElementById("resourceEmptyState");
  const count = document.querySelector("[data-resource-count]");
  const visibleCount = document.querySelector("[data-resource-visible-count]");
  const loginState = document.querySelector("[data-resource-login-state]");
  const form = document.getElementById("resourceUploadForm");
  const help = document.getElementById("resourceUploadHelp");
  const badge = document.querySelector("[data-resource-form-badge]");
  const search = document.getElementById("resourceSearch");
  const resetButton = document.getElementById("resourceUploadReset");
  const filterButtons = Array.from(document.querySelectorAll("[data-resource-filter]"));

  let currentFilter = "all";

  function getFilteredResources() {
    const keyword = (search?.value || "").trim().toLowerCase();

    return getAllResources().filter((resource) => {
      const matchesFilter = currentFilter === "all" || resource.category === currentFilter;
      if (!matchesFilter) return false;

      if (!keyword) return true;

      const target = [
        resource.title,
        resource.description,
        resource.fileName,
        resource.createdBy
      ].join(" ").toLowerCase();

      return target.includes(keyword);
    });
  }

  function renderResources() {
    if (!list || !emptyState) return;

    const allResources = getAllResources();
    const filteredResources = getFilteredResources();

    if (count) count.textContent = `${allResources.length}건`;
    if (visibleCount) visibleCount.textContent = String(filteredResources.length);

    list.innerHTML = filteredResources.map((resource) => buildResourceCard(resource, currentUser)).join("");
    emptyState.classList.toggle("hidden", filteredResources.length > 0);
  }

  function updateFormState() {
    const loggedIn = Boolean(currentUser);
    if (loginState) {
      loginState.textContent = loggedIn ? `${currentUser.label} 로그인` : "비로그인";
      loginState.className = loggedIn
        ? "rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700"
        : "rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600";
    }

    if (badge) {
      badge.textContent = loggedIn ? "현재 등록 가능 상태" : "로그인 후 등록 가능";
      badge.className = loggedIn
        ? "inline-flex rounded-full bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-700 ring-1 ring-emerald-200"
        : "inline-flex rounded-full bg-sky-50 px-5 py-3 text-sm font-bold text-sky-700 ring-1 ring-sky-200";
    }

    if (help) {
      help.textContent = loggedIn
        ? "파일 또는 링크를 등록해 자료 목록을 바로 업데이트할 수 있습니다."
        : "자료 등록은 로그인 후 사용할 수 있습니다.";
      help.className = loggedIn
        ? "min-h-[1.5rem] text-sm font-medium text-emerald-700"
        : "min-h-[1.5rem] text-sm font-medium text-slate-500";
    }

    setUploadFormEnabled(form, loggedIn);
  }

  updateFormState();
  renderResources();

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentFilter = button.dataset.resourceFilter || "all";
      filterButtons.forEach((item) => {
        const active = item === button;
        item.className = active
          ? "rounded-full bg-council-navy px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          : "rounded-full border border-council-line bg-white px-5 py-3 text-sm font-semibold text-council-navy transition hover:bg-council-mist";
      });
      renderResources();
    });
  });

  search?.addEventListener("input", renderResources);

  list?.addEventListener("click", async (event) => {
    const target = event.target.closest("[data-resource-open], [data-resource-delete]");
    if (!target) return;

    const openId = target.getAttribute("data-resource-open");
    if (openId) {
      await triggerResourceOpen(openId);
      return;
    }

    const deleteId = target.getAttribute("data-resource-delete");
    if (deleteId) {
      const resources = readCustomResourceMeta();
      const targetResource = resources.find((resource) => resource.id === deleteId);
      if (!targetResource) return;

      const canDelete = currentUser && (isAdmin(currentUser) || currentUser.id === targetResource.createdById);
      if (!canDelete) return;

      const nextResources = resources.filter((resource) => resource.id !== deleteId);
      writeCustomResourceMeta(nextResources);
      await deleteResourceFile(deleteId);
      renderResources();
    }
  });

  resetButton?.addEventListener("click", () => {
    form?.reset();
    if (help) {
      help.textContent = currentUser
        ? "파일 또는 링크를 등록해 자료 목록을 바로 업데이트할 수 있습니다."
        : "자료 등록은 로그인 후 사용할 수 있습니다.";
      help.className = currentUser
        ? "min-h-[1.5rem] text-sm font-medium text-emerald-700"
        : "min-h-[1.5rem] text-sm font-medium text-slate-500";
    }
  });

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const liveUser = getCurrentUser();
    if (!liveUser) {
      if (help) {
        help.textContent = "자료 등록은 로그인 후 사용할 수 있습니다.";
        help.className = "min-h-[1.5rem] text-sm font-medium text-rose-600";
      }
      return;
    }

    const title = form.resourceTitle.value.trim();
    const category = form.resourceCategory.value;
    const description = form.resourceDescription.value.trim();
    const externalUrl = form.resourceLink.value.trim();
    const file = form.resourceFile.files?.[0] || null;

    if (!title) {
      help.textContent = "자료 제목을 입력해 주세요.";
      help.className = "min-h-[1.5rem] text-sm font-medium text-rose-600";
      return;
    }

    if (!externalUrl && !file) {
      help.textContent = "외부 링크 또는 파일 업로드 중 하나는 반드시 입력해 주세요.";
      help.className = "min-h-[1.5rem] text-sm font-medium text-rose-600";
      return;
    }

    if (externalUrl && file) {
      help.textContent = "링크와 파일 중 하나만 선택해 주세요.";
      help.className = "min-h-[1.5rem] text-sm font-medium text-rose-600";
      return;
    }

    const resourceId = `resource-${Date.now()}`;
    const createdAt = new Date().toISOString();
    const customResources = readCustomResourceMeta();

    const resource = {
      id: resourceId,
      title,
      category,
      description,
      kind: file ? "file" : "link",
      externalUrl: file ? "" : externalUrl,
      fileName: file ? file.name : externalUrl,
      fileSize: file ? file.size : 0,
      mimeType: file ? file.type : "",
      createdAt,
      createdBy: liveUser.label,
      createdById: liveUser.id,
      source: "custom"
    };

    try {
      if (file) {
        await saveResourceFile(resourceId, file);
      }

      customResources.push(resource);
      writeCustomResourceMeta(customResources);
      form.reset();

      help.textContent = "자료가 등록되었습니다. 목록에서 바로 확인할 수 있습니다.";
      help.className = "min-h-[1.5rem] text-sm font-medium text-emerald-600";
      renderResources();
    } catch {
      help.textContent = "자료 등록 중 오류가 발생했습니다. 다시 시도해 주세요.";
      help.className = "min-h-[1.5rem] text-sm font-medium text-rose-600";
    }
  });
}

function initNoticeBoard() {
  const board = document.querySelector("[data-notice-board]");
  if (!board) return;

  const currentUser = getCurrentUser();
  const list = document.getElementById("noticeList");
  const emptyState = document.getElementById("noticeEmptyState");
  const count = document.querySelector("[data-notice-count]");
  const visibleCount = document.querySelector("[data-notice-visible-count]");
  const importantCount = document.querySelector("[data-notice-important-count]");
  const latestTitle = document.querySelector("[data-notice-latest-title]");
  const status = document.querySelector("[data-notice-status]");
  const form = document.getElementById("noticeUploadForm");
  const help = document.getElementById("noticeUploadHelp");
  const badge = document.querySelector("[data-notice-form-badge]");
  const search = document.getElementById("noticeSearch");
  const resetButton = document.getElementById("noticeUploadReset");
  const filterButtons = Array.from(document.querySelectorAll("[data-notice-filter]"));

  let currentFilter = "all";

  function setNoticeFormEnabled(enabled) {
    if (!form) return;
    form.querySelectorAll("input, select, textarea, button").forEach((field) => {
      if (field.id === "noticeUploadReset") return;
      field.disabled = !enabled;
    });
  }

  function getFilteredNotices() {
    const keyword = (search?.value || "").trim().toLowerCase();
    return getAllNotices().filter((notice) => {
      const matchesFilter = currentFilter === "all" || notice.category === currentFilter;
      if (!matchesFilter) return false;
      if (!keyword) return true;

      const target = [
        notice.title,
        notice.description,
        notice.category,
        notice.createdBy
      ].join(" ").toLowerCase();

      return target.includes(keyword);
    });
  }

  function updateFormState() {
    const canWrite = Boolean(currentUser && isAdmin(currentUser));

    if (badge) {
      badge.textContent = canWrite ? "관리자 등록 가능 상태" : "관리자 로그인 후 등록 가능";
      badge.className = canWrite
        ? "inline-flex rounded-full bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-700 ring-1 ring-emerald-200"
        : "inline-flex rounded-full bg-sky-50 px-5 py-3 text-sm font-bold text-sky-700 ring-1 ring-sky-200";
    }

    if (help) {
      help.textContent = canWrite
        ? "공지 제목과 내용을 입력하면 바로 공지 목록에 반영됩니다."
        : "공지 등록은 관리자 계정으로 로그인한 뒤 사용할 수 있습니다.";
      help.className = canWrite
        ? "min-h-[1.5rem] text-sm font-medium text-emerald-700"
        : "min-h-[1.5rem] text-sm font-medium text-slate-500";
    }

    setNoticeFormEnabled(canWrite);
  }

  function renderNotices() {
    if (!list || !emptyState) return;

    const allNotices = getAllNotices();
    const filteredNotices = getFilteredNotices();

    if (count) count.textContent = `${allNotices.length}건`;
    if (visibleCount) visibleCount.textContent = String(filteredNotices.length);
    if (importantCount) importantCount.textContent = `${allNotices.filter((notice) => notice.pinned).length}건`;
    if (latestTitle) latestTitle.textContent = allNotices[0]?.title || "없음";
    if (status) status.textContent = allNotices.length ? "정상 운영 중" : "등록 대기";

    list.innerHTML = filteredNotices.map((notice) => buildNoticeCard(notice, currentUser)).join("");
    emptyState.classList.toggle("hidden", filteredNotices.length > 0);
  }

  updateFormState();
  renderNotices();

  if (form?.noticeDate && !form.noticeDate.value) {
    form.noticeDate.value = new Date().toISOString().slice(0, 10);
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentFilter = button.dataset.noticeFilter || "all";
      filterButtons.forEach((item) => {
        const active = item === button;
        item.className = active
          ? "rounded-full bg-council-navy px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          : "rounded-full border border-council-line bg-white px-5 py-3 text-sm font-semibold text-council-navy transition hover:bg-council-mist";
      });
      renderNotices();
    });
  });

  search?.addEventListener("input", renderNotices);

  list?.addEventListener("click", (event) => {
    const target = event.target.closest("[data-notice-delete]");
    if (!target) return;

    const liveUser = getCurrentUser();
    if (!liveUser || !isAdmin(liveUser)) return;

    const deleteId = target.getAttribute("data-notice-delete");
    const nextNotices = readCustomNotices().filter((notice) => notice.id !== deleteId);
    writeCustomNotices(nextNotices);
    renderNotices();
  });

  resetButton?.addEventListener("click", () => {
    form?.reset();
    if (form?.noticeDate) {
      form.noticeDate.value = new Date().toISOString().slice(0, 10);
    }
    updateFormState();
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const liveUser = getCurrentUser();
    if (!liveUser || !isAdmin(liveUser)) {
      if (help) {
        help.textContent = "공지 등록은 관리자 계정으로 로그인한 뒤 사용할 수 있습니다.";
        help.className = "min-h-[1.5rem] text-sm font-medium text-rose-600";
      }
      return;
    }

    const title = form.noticeTitle.value.trim();
    const category = form.noticeCategory.value;
    const description = form.noticeDescription.value.trim();
    const date = form.noticeDate.value;
    const pinned = Boolean(form.noticePinned.checked);

    if (!title) {
      help.textContent = "공지 제목을 입력해 주세요.";
      help.className = "min-h-[1.5rem] text-sm font-medium text-rose-600";
      return;
    }

    if (!description) {
      help.textContent = "공지 내용을 입력해 주세요.";
      help.className = "min-h-[1.5rem] text-sm font-medium text-rose-600";
      return;
    }

    if (!date) {
      help.textContent = "공지 날짜를 선택해 주세요.";
      help.className = "min-h-[1.5rem] text-sm font-medium text-rose-600";
      return;
    }

    const customNotices = readCustomNotices();
    customNotices.push({
      id: `notice-${Date.now()}`,
      category,
      title,
      description,
      date,
      pinned,
      createdAt: new Date().toISOString(),
      createdBy: liveUser.label,
      createdById: liveUser.id,
      source: "custom"
    });
    writeCustomNotices(customNotices);
    form.reset();
    form.noticeDate.value = new Date().toISOString().slice(0, 10);

    if (help) {
      help.textContent = "공지사항이 등록되었습니다. 아래 목록에서 바로 확인할 수 있습니다.";
      help.className = "min-h-[1.5rem] text-sm font-medium text-emerald-600";
    }

    renderNotices();
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

if (authUser) {
  authUser.addEventListener("click", () => {
    if (getCurrentUser()) return;
    openLoginModal();
  });
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
initAdminDashboard();
initResourceLibrary();
initNoticeBoard();

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
  const labels = ["기계", "재료", "HRD", "전기전자", "기타", "건설", "산업안전", "조선해양", "정보통신", "경영회계사무", "공예", "디자인"];
  const values = [63, 28, 10, 8, 5, 3, 2, 2, 2, 1, 1, 1];
  const baseColors = ["#d4a017", "#a8b2bd", "#4f8fba", "#5fa8d3", "#77b6ea", "#8abfe8", "#9dc9ee", "#aed3f4", "#bfdcf8", "#d0e5fb", "#c1d9f2", "#b2cde8"];
  const hoverColors = ["#e0af2b", "#b9c2cb", "#3f81ae", "#4f99c8", "#67a8dd", "#79b3df", "#8dbde6", "#9fc9ee", "#b0d4f4", "#c2def8", "#b2cce8", "#a3c0de"];

  new Chart(chartCanvas, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "직종별 인원",
        data: values,
        borderRadius: 14,
        borderSkipped: false,
        backgroundColor: baseColors,
        hoverBackgroundColor: hoverColors,
        maxBarThickness: 48
      }]
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
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#0f172a",
          padding: 14,
          cornerRadius: 12,
          titleFont: { family: "Pretendard", size: 13, weight: "700" },
          bodyFont: { family: "Pretendard", size: 13 },
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
          grid: { display: false },
          ticks: {
            color: "#475569",
            font: { family: "Pretendard", size: 12 },
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
            font: { family: "Pretendard", size: 12 },
            callback(value) {
              return `${value}명`;
            }
          },
          grid: { color: "rgba(148, 163, 184, 0.18)" }
        }
      }
    }
  });
}
