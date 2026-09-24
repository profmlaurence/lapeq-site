from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

# Servir arquivos estáticos (CSS, imagens, JS)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Configurar templates Jinja2
templates = Jinja2Templates(directory="templates")

# Dados de contato exibidos no rodapé e na página de contato
CONTATO = {
    "local": "Bloco da Agroenergia, Sala 02 — UFT, Câmpus Palmas",
    "endereco": "Quadra 109 Norte, Av. NS-15, ALCNO-14, Plano Diretor Norte, 77001-090, Palmas - TO",
    "mapa": "Universidade Federal do Tocantins, Câmpus Palmas",
    "email": "lapeq@uft.edu.br",
    "telefone": "(63) 3229-4516",
    "telefone_link": "+556332294516",
    "instagram": "lapeq_uft",
    "pagina_uft": "https://www.uft.edu.br/campus/palmas/laboratorios/lapeq",
}


def render(request: Request, name: str, active_page: str):
    return templates.TemplateResponse(
        request=request,
        name=name,
        context={"active_page": active_page, "contato": CONTATO},
    )


@app.get("/", response_class=HTMLResponse)
def page_inicio(request: Request):
    return render(request, "index.html", "inicio")


@app.get("/servicos", response_class=HTMLResponse)
def page_servicos(request: Request):
    return render(request, "servicos.html", "servicos")


@app.get("/equipe", response_class=HTMLResponse)
def page_equipe(request: Request):
    return render(request, "equipe.html", "equipe")


@app.get("/social", response_class=HTMLResponse)
def page_social(request: Request):
    return render(request, "social.html", "social")


@app.get("/contato", response_class=HTMLResponse)
def page_contato(request: Request):
    return render(request, "contato.html", "contato")


@app.get("/sobre")
def page_sobre():
    # A apresentação fica na página inicial; mantém o link antigo funcionando
    return RedirectResponse(url="/#sobre", status_code=301)
