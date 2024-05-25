// next.config.js

module.exports = {
  env: {
    SERVER_URI: "http://localhost:5035/api",
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5035/api/:path*", // Replace with the base URL of your ASP.NET Web API
      },
    ];
  },
};
