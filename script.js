// ---- 登录逻辑 ----
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;
            const res = await fetch("https://your-railway-backend-url/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                // 登录成功
                localStorage.setItem("token", data.token);
                window.location.href = "index.html";
            } else {
                document.getElementById("loginError").innerText = data.message || "Login failed.";
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("signupEmail").value;
            const password = document.getElementById("signupPassword").value;
            const res = await fetch("https://your-railway-backend-url/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                // 注册成功
                localStorage.setItem("token", data.token);
                window.location.href = "index.html";
            } else {
                document.getElementById("signupError").innerText = data.message || "Signup failed.";
            }
        });
    }
});

// ---- 第三方 OAuth 跳转 ----
function oauthLogin(provider) {
    let url = "";
    if (provider === "google") {
        url = "https://your-railway-backend-url/auth/google";
    } else if (provider === "github") {
        url = "https://your-railway-backend-url/auth/github";
    }
    // 跳转到后端 OAuth 授权地址
    window.location.href = url;
}
