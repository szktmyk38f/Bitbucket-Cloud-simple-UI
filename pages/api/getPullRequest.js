import fetch from "node-fetch";
import HttpsProxyAgent from "https-proxy-agent";

export default async function handler(req, res) {
  const params = new URLSearchParams();
  params.append("grant_type", `${process.env.GRANT_TYPE}`);
  params.append("client_id", `${process.env.CLIENT_ID}`);
  params.append("client_secret", `${process.env.CLIENT_SECRET}`);


  const url = `https://api.bitbucket.org/2.0/repositories/${process.env.WORKSPACE}/${process.env.REPOSITORY}/pullrequests`;

  const proxyAgent = new HttpsProxyAgent(`${process.env.PROXY}`);
  const response = await fetch(
    "https://bitbucket.org/site/oauth2/access_token",
    {
      method: "POST",
      body: params,
      agent: `${process.env.PROXY}` !== "undefined" ? proxyAgent : "",
    }
  );

  const data = await response.json();
  const token = data["access_token"];

  const pullRequestsInfo = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    agent: `${process.env.PROXY}` !== "undefined" ? proxyAgent : "",
  });

  const pullRequests = await pullRequestsInfo.json();
  res.status(200).json({ pullRequests });
}
