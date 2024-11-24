const API = "https://web1-api.vercel.app/api";
const AUTHENTICATE_API = "https://web1-api.vercel.app/users";

async function loadData(request, templateId, viewId) {
  const response = await fetch(`${API}/${request}`);
  const data = await response.json();

  const source = document.getElementById(templateId).innerHTML;
  const template = Handlebars.compile(source);
  const context = { data };
  const view = document.getElementById(viewId);
  view.innerHTML = template(context);
}

async function getAuthenticationToken(username, password) {
  let response = await fetch(`${AUTHENTICATE_API}/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  let result = await response.json();

  if (result.status === 200) {
    return result.token;
  }

  throw new Error(result.message);
}
