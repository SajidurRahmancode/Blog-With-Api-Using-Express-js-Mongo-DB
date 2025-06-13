const API_BASE = "/api";
let authToken = localStorage.getItem("token") || null;

function showAlert(message, type = "success") {
    const alertArea = document.getElementById("alert-area");
    alertArea.innerHTML = `<div class='alert alert-${type} alert-dismissible fade show' role='alert'>${message}<button type='button' class='btn-close' data-bs-dismiss='alert'></button></div>`;
    setTimeout(() => { alertArea.innerHTML = ""; }, 4000);
}

function showSection(authenticated) {
    document.getElementById("auth-section").style.display = authenticated ? "none" : "block";
    document.getElementById("main-section").style.display = authenticated ? "block" : "none";
}

async function registerUser(e) {
    e.preventDefault();
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const res = await fetch(`${API_BASE}/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.status === "success") {
        showAlert("Registration successful! Please log in.", "success");
    } else {
        showAlert(data.message || "Registration failed", "danger");
    }
    e.target.reset();
}

async function loginUser(e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const res = await fetch(`${API_BASE}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.status === "success") {
        authToken = data.data.token;
        localStorage.setItem("token", authToken);
        showSection(true);
        loadBlogs();
        showAlert("Login successful!", "success");
    } else {
        showAlert(data.message || "Login failed", "danger");
    }
    e.target.reset();
}

async function logoutUser() {
    if (!authToken) return;
    const res = await fetch(`${API_BASE}/logout/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${authToken}` }
    });
    localStorage.removeItem("token");
    authToken = null;
    showSection(false);
    showAlert("Logged out.", "info");
}

async function loadBlogs() {
    const res = await fetch(`${API_BASE}/read-blog`, {
        headers: { "Authorization": `Bearer ${authToken}` }
    });
    const data = await res.json();
    const blogsList = document.getElementById("blogs-list");
    blogsList.innerHTML = "";
    if (data.status === "success" && data.data.length > 0) {
        data.data.forEach(blog => {
            blogsList.innerHTML += `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${blog.title}</h5>
                        <p class="card-text">${blog.post}</p>
                        <button class="btn btn-sm btn-warning me-2" onclick="editBlog('${blog._id}', '${blog.title.replace(/'/g, "&#39;")}', '${blog.post.replace(/'/g, "&#39;")}')">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteBlog('${blog._id}')">Delete</button>
                    </div>
                </div>
            `;
        });
    } else {
        blogsList.innerHTML = `<div class='alert alert-info'>No blogs found.</div>`;
    }
}

async function createOrEditBlog(e) {
    e.preventDefault();
    const blogID = document.getElementById("blog-id").value;
    const title = document.getElementById("blog-title").value;
    const post = document.getElementById("blog-post").value;
    if (blogID) {
        // Edit
        const res = await fetch(`${API_BASE}/edit-blog`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({ blogID, title, post })
        });
        const data = await res.json();
        if (data.status === "success") {
            showAlert("Blog updated!", "success");
            document.getElementById("blog-form").reset();
            document.getElementById("blog-id").value = "";
            document.getElementById("cancel-edit").style.display = "none";
            loadBlogs();
        } else {
            showAlert(data.message || "Update failed", "danger");
        }
    } else {
        // Create
        const res = await fetch(`${API_BASE}/create-blog`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({ title, post })
        });
        const data = await res.json();
        if (data.status === "success") {
            showAlert("Blog created!", "success");
            document.getElementById("blog-form").reset();
            loadBlogs();
        } else {
            showAlert(data.message || "Creation failed", "danger");
        }
    }
}

function editBlog(id, title, post) {
    document.getElementById("blog-id").value = id;
    document.getElementById("blog-title").value = title;
    document.getElementById("blog-post").value = post;
    document.getElementById("cancel-edit").style.display = "inline-block";
}

document.getElementById("cancel-edit").onclick = function() {
    document.getElementById("blog-form").reset();
    document.getElementById("blog-id").value = "";
    this.style.display = "none";
};

async function deleteBlog(id) {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    const res = await fetch(`${API_BASE}/delete-blog`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify({ blogID: id })
    });
    const data = await res.json();
    if (data.status === "success") {
        showAlert("Blog deleted!", "success");
        loadBlogs();
    } else {
        showAlert(data.message || "Delete failed", "danger");
    }
}

// Event listeners

document.getElementById("register-form").addEventListener("submit", registerUser);
document.getElementById("login-form").addEventListener("submit", loginUser);
document.getElementById("logout-btn").addEventListener("click", logoutUser);
document.getElementById("blog-form").addEventListener("submit", createOrEditBlog);

// On load
if (authToken) {
    showSection(true);
    loadBlogs();
} else {
    showSection(false);
}
