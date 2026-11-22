
// Lấy danh sách tài khoản
function getUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
}

// Đăng ký
function register() {
    const username = document.getElementById("registerUser").value.trim();
    const password = document.getElementById("registerPass").value;

    if (username.length < 3 || password.length < 4) {
        showMessage("Tên đăng nhập cần ít nhất 3 ký tự, mật khẩu 4 ký tự!");
        return;
    }

    const users = getUsers();

    if (users.some(user => user.username === username)) {
        showMessage("Tên đăng nhập đã tồn tại!");
        return;
    }

    users.push({
        username: username,
        password: password
    });

    localStorage.setItem("users", JSON.stringify(users));

    showMessage("Đăng ký thành công!");
}

// Đăng nhập
function login() {
    const username = document.getElementById("loginUser").value.trim();
    const password = document.getElementById("loginPass").value;

    const users = getUsers();

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        showMessage("Sai tên đăng nhập hoặc mật khẩu!");
        return;
    }

    localStorage.setItem("currentUser", username);

    showMessage("Đăng nhập thành công!");
    showWelcome();
}

// Đăng xuất
function logout() {
    localStorage.removeItem("currentUser");
    showMessage("Bạn đã đăng xuất!");
    document.getElementById("welcome").textContent = "";
}

// Hiển thị thông báo
function showMessage(message) {
    document.getElementById("message").textContent = message;
}

// Hiển thị người dùng
function showWelcome() {
    const username = localStorage.getItem("currentUser");

    document.getElementById("welcome").textContent =
        username ? "Xin chào, " + username : "";
}

// Kiểm tra trạng thái khi mở trang
showWelcome();
