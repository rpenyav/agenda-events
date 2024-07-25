import React from "react";

const Login: React.FC = () => {
  const clientId = "KU8ylV4QkNBc4JS8USXRkk0jW";
  const redirectUri = "https://bb2e-83-42-234-200.ngrok-free.app/callback";
  const authUrl = `https://analisi.transparenciacatalunya.cat/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`;

  return (
    <div>
      <h1>Login</h1>
      <a href={authUrl}>Login with Socrata</a>
    </div>
  );
};

export default Login;
