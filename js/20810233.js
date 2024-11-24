const API = "https://web1-api.vercel.app/api";

async function loadData(request, templateId, viewId) {
  const response = await fetch(`${API}/${request}`);
  const data = await response.json();

  const source = document.getElementById(templateId).innerHTML;
  const template = Handlebars.compile(source);
  const context = { data };
  const view = document.getElementById(viewId);
  view.innerHTML = template(context);
}
