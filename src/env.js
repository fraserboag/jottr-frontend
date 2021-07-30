let apiUrl = "https://api.jottrapp.com";

if (process.env.NODE_ENV === "development") apiUrl = "http://localhost:5000";

export default apiUrl;