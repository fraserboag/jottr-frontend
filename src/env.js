let apiUrl = "https://jottrapi.boag.online";

if (process.env.NODE_ENV === "development") apiUrl = "http://localhost:5000";

export default apiUrl;