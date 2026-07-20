const mobileNavButton = document.querySelector(".mobile-nav-toggle");
const navPanel = document.querySelector(".nav-panel");
const loginModal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const loginHelp = document.getElementById("loginHelp");
const loginUserId = document.getElementById("loginUserId");
const loginPassword = document.getElementById("loginPassword");
const loginCloseButton = document.getElementById("loginCloseButton");
const loginSkipButton = document.getElementById("loginSkipButton");

function closeLoginModal() {
  if (!loginModal) {
    return;
  }

  loginModal.classList.add("is-hidden");
  document.body.classList.remove("login-locked");
  sessionStorage.setItem("gnHomepageLoginSeen", "true");
}

function openLoginModal() {
  if (!loginModal) {
    return;
  }

  loginModal.classList.remove("is-hidden");
  document.body.classList.add("login-locked");

  window.setTimeout(() => {
    if (loginUserId) {
      loginUserId.focus();
    }
  }, 120);
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

if (loginModal) {
  const shouldOpenLogin = sessionStorage.getItem("gnHomepageLoginSeen") !== "true";

  if (shouldOpenLogin) {
    openLoginModal();
  }

  loginCloseButton?.addEventListener("click", closeLoginModal);
  loginSkipButton?.addEventListener("click", closeLoginModal);

  loginModal.addEventListener("click", (event) => {
    if (event.target === loginModal) {
      closeLoginModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !loginModal.classList.contains("is-hidden")) {
      closeLoginModal();
    }
  });

  loginForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const userId = loginUserId?.value.trim() ?? "";
    const password = loginPassword?.value.trim() ?? "";

    if (!userId || !password) {
      if (loginHelp) {
        loginHelp.textContent = "아이디와 비밀번호를 모두 입력해 주세요.";
        loginHelp.classList.remove("text-slate-500");
        loginHelp.classList.add("text-rose-600");
      }
      return;
    }

    if (loginHelp) {
      loginHelp.textContent = `${userId}님, 메인 화면으로 입장합니다.`;
      loginHelp.classList.remove("text-rose-600");
      loginHelp.classList.add("text-emerald-600");
    }

    window.setTimeout(() => {
      closeLoginModal();
      loginForm.reset();
      if (loginHelp) {
        loginHelp.textContent = "데모 로그인 창입니다. 입력 후 바로 메인 화면으로 이동합니다.";
        loginHelp.classList.remove("text-emerald-600");
        loginHelp.classList.add("text-slate-500");
      }
    }, 350);
  });
}

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
