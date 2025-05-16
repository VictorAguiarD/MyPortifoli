document.addEventListener('DOMContentLoaded', function() {
    // Configurações iniciais
    const currentYear = new Date().getFullYear();
    document.getElementById('ano-atual').textContent = currentYear;
    
    // Verifica preferência de dark mode
    if (localStorage.getItem('darkMode') === 'enabled' || 
        (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
        updateDarkModeIcon();
    }
    
    // Configura menu hamburguer
    configurarMenuHamburguer();
    
    // Configura scroll do header
    configurarScrollHeader();
    
    // Configura botão de voltar ao topo
    configurarBotaoTopo();
    
    // Carrega dados
    carregarExperienciasLinkedIn();
    carregarProjetosGitHub();
    
    // Configura o formulário de contato
    const formContato = document.getElementById('form-contato');
    if (formContato) {
        formContato.addEventListener('submit', enviarFormulario);
    }
    
    // Suaviza a rolagem para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Funções de UI
function configurarMenuHamburguer() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.overlay');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                const hamburger = document.querySelector('.hamburger');
                const navMenu = document.querySelector('.nav-menu');
                const overlay = document.querySelector('.overlay');
                
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });
    
    // Fechar menu ao clicar no overlay
    if (overlay) {
        overlay.addEventListener('click', () => {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    }
}

function configurarScrollHeader() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function configurarBotaoTopo() {
    const btnTopo = document.getElementById('btn-topo');
    if (btnTopo) {
        btnTopo.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                btnTopo.style.opacity = '1';
                btnTopo.style.visibility = 'visible';
            } else {
                btnTopo.style.opacity = '0';
                btnTopo.style.visibility = 'hidden';
            }
        });
    }
}

// Dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    updateDarkModeIcon();
}

function updateDarkModeIcon() {
    const icon = document.querySelector('#dark-mode-toggle i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
}

document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);

// LinkedIn Integration
async function carregarExperienciasLinkedIn() {
    const container = document.getElementById('experiencia-container');
    if (!container) return;

    container.innerHTML = '<div class="carregando"><i class="fas fa-spinner fa-spin"></i> Carregando experiências...</div>';

    try {
        // Simulação de API, em um futuro breve colocar a api de fato
        const experiencias = await simularAPILinkedIn();
        
        container.innerHTML = '';
        
        if (experiencias.length === 0) {
            container.innerHTML = '<div class="sem-projetos">Nenhuma experiência encontrada.</div>';
            return;
        }
        
        experiencias.forEach(experiencia => {
            const item = criarItemExperiencia(experiencia);
            container.appendChild(item);
        });

        // Carrega habilidades após carregar experiências
        carregarHabilidadesLinkedIn();

    } catch (error) {
        console.error('Erro ao carregar experiências:', error);
        container.innerHTML = `
            <div class="erro">
                <p>Não foi possível carregar as experiências do LinkedIn.</p>
                <button onclick="carregarExperienciasLinkedIn()" class="btn-tentar-novamente">
                    Tentar novamente
                </button>
                <p>Você pode <a href="https://linkedin.com/in/victor-aguiar-069785266/" target="_blank">visualizar meu perfil completo no LinkedIn</a>.</p>
            </div>
        `;
    }
}

async function simularAPILinkedIn() {
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    
    return [
        {
            title: "Analista de Negócios em TI",
            company: "Grupo Ser Educacional",
            dateRange: "Período de trabalho: Jan 2025 - Presente",
            description: "Atuação na análise de negócios e processos de TI com foco em melhorias e eficiência operacional.",
            hardSkills: [
                "Análise financeira",
                "Planejamento e monitoramento de análise dos negócios",
                "Requisitos de negócio",
                "Análise de negócios de TI",
                "ETL (Extração, Transformação e Carga)",
                "Metodologias Agile",
                "Analítica de dados",
                "Processos empresariais",
                "RM TOTVS",
                "SQL Server",
                "BackOffice",
                "Regras de negócios",
                "Análise de sistema",
                "Inteligência Empresarial"
            ],
            softSkills: [
                "Resolução de problemas",
                "Comunicação eficaz",
                "Trabalho em equipe"
            ]
        },
        {
            title: "Assistente Administrativo",
            company: "Grupo Ser Educacional",
            dateRange: "Período de trabalho: Set 2023 a Jan 2025",
            description: "Suporte administrativo com na área acadêmica e criando dashbord via excel de alunos que não conseguiram se matricular automaticamente",
            hardSkills: [
                "Microsoft Excel",
                "Habilidades analíticas",
                "Análise de dados",
                "Conhecimento em rotinas acadêmicas",
                "Conhecimento em rotinas financeiras",
                "Criação de dashboard via Excel"
            ],
            softSkills: [
                "Trabalho em equipe",
                "Capacidade de organização",
                "Comunicação clara"
            ]
        }
    ];
}

function criarItemExperiencia(exp) {
    const item = document.createElement('div');
    item.className = 'experiencia-item';
    
    item.innerHTML = `
        <div class="experiencia-cabecalho">
            <div>
                <h3 class="experiencia-titulo">${exp.title}</h3>
                <p class="experiencia-empresa">${exp.company}</p>
            </div>
            <span class="experiencia-periodo">${exp.dateRange}</span>
        </div>
        <p class="experiencia-descricao">${exp.description}</p>
        
        <div class="experiencia-habilidades-container">
            <div class="habilidades-coluna">
                <h4 class="habilidades-titulo">Hard Skills</h4>
                <div class="experiencia-habilidades">
                    ${exp.hardSkills.map(skill => `<span class="experiencia-habilidade hard-skill">${skill}</span>`).join('')}
                </div>
            </div>
            
            <div class="habilidades-coluna">
                <h4 class="habilidades-titulo">Soft Skills</h4>
                <div class="experiencia-habilidades">
                    ${exp.softSkills.map(skill => `<span class="experiencia-habilidade soft-skill">${skill}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    
    return item;
}

async function carregarHabilidadesLinkedIn() {
    const container = document.getElementById('habilidades-container');
    if (!container) return;

    try {
        // Habilidades
        const habilidades = await simularHabilidadesLinkedIn();
        
        container.innerHTML = '';
        
        habilidades.forEach(habilidade => {
            const span = document.createElement('span');
            span.className = 'habilidade';
            span.textContent = habilidade;
            container.appendChild(span);
        });

    } catch (error) {
        console.error('Erro ao carregar habilidades:', error);
        container.innerHTML = `
            <span class="habilidade">Python</span>
            <span class="habilidade">Django/Flask</span>
            <span class="habilidade">JavaScript</span>
            <span class="habilidade">HTML/CSS</span>
            <span class="habilidade">Git</span>
            <span class="habilidade">SQL</span>
        `;
    }
}

async function simularHabilidadesLinkedIn() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return ["Basic- Python" , "SQL SERVER" , "HTML5" , "CSS3" , "Basic-JavaScript" , "Metodologia Scrum" ,
        "Análise de dados com python" , "Análise de Dados com SQL" , "RM Totvs"];
}

// GitHub Integration
async function carregarProjetosGitHub() {
    const container = document.getElementById('projetos-container');
    if (!container) return;
    
    container.innerHTML = '<div class="carregando"><i class="fas fa-spinner fa-spin"></i> Carregando projetos...</div>';

    try {
        const response = await fetch('https://api.github.com/users/VictorAguiarD/repos?sort=updated&direction=desc');
        
        if (!response.ok) {
            throw new Error('Erro ao carregar projetos do GitHub');
        }
        
        const projetos = await response.json();
        
        // Filtra projetos (adicione seus critérios)
        const projetosFiltrados = projetos.filter(projeto => 
            !projeto.fork && 
            !projeto.archived && 
            projeto.visibility === 'public'
        );
        
        container.innerHTML = '';
        
        if (projetosFiltrados.length === 0) {
            container.innerHTML = '<div class="sem-projetos">Nenhum projeto encontrado.</div>';
            return;
        }
        
        projetosFiltrados.forEach((projeto, index) => {
            const card = criarCardProjeto(projeto);
            card.style.animationDelay = `${index * 0.1}s`;
            container.appendChild(card);
        });
        
    } catch (error) {
        console.error('Erro ao carregar projetos:', error);
        container.innerHTML = `
            <div class="erro">
                <p>Não foi possível carregar os projetos do GitHub.</p>
                <button onclick="carregarProjetosGitHub()" class="btn-tentar-novamente">
                    Tentar novamente
                </button>
            </div>
        `;
    }
}

function criarCardProjeto(projeto) {
    const card = document.createElement('div');
    card.className = 'projeto-card';
    
    // Determina a categoria com base na linguagem ou descrição
    let categoria = 'outros';
    if (projeto.language) {
        categoria = projeto.language.toLowerCase().includes('python') ? 'python' : 
                   projeto.language.toLowerCase().includes('javascript') || 
                   projeto.language.toLowerCase().includes('html') || 
                   projeto.language.toLowerCase().includes('css') ? 'web' : 'outros';
    }
    
    // Determina a cor com base na linguagem principal
    let linguagemCor = '#3498db'; // Cor padrão (azul)
    if (projeto.language) {
        const linguagensCores = {
            'Python': '#3572A5',
            'JavaScript': '#f1e05a',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
            'Java': '#b07219',
            'C++': '#f34b7d',
            'C#': '#178600',
            'PHP': '#4F5D95',
            'Ruby': '#701516',
            'Swift': '#ffac45'
        };
        
        linguagemCor = linguagensCores[projeto.language] || linguagemCor;
    }
    
    // Cria o HTML do card
    card.innerHTML = `
        <div class="projeto-cabecalho" style="background-color: ${linguagemCor};">
            <div class="projeto-metricas">
                <span class="projeto-estrelas"><i class="far fa-star"></i> ${projeto.stargazers_count || 0}</span>
                <span class="projeto-forks"><i class="fas fa-code-branch"></i> ${projeto.forks_count || 0}</span>
            </div>
            ${projeto.language ? `<span class="projeto-linguagem">${projeto.language}</span>` : ''}
        </div>
        <div class="projeto-info">
            <h3>${projeto.name}</h3>
            <p>${projeto.description || 'Sem descrição disponível.'}</p>
            <div class="projeto-links">
                <a href="${projeto.html_url}" class="projeto-link" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-github"></i> Código
                </a>
                ${projeto.homepage ? `
                <a href="${projeto.homepage}" class="projeto-link" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-external-link-alt"></i> Demo
                </a>` : ''}
            </div>
        </div>
    `;
    
    // Adiciona atributo de categoria para filtragem
    card.setAttribute('data-categoria', categoria);
    
    return card;
}

// Formulário de Contato
async function enviarFormulario(e) {
    e.preventDefault();
    
    const form = e.target;
    const button = form.querySelector('button[type="submit"]');
    const buttonText = button.innerHTML;
    
    // Mostrar estado de carregamento
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    try {
        const formData = new FormData(form);
        
        // Envia o formulário para o FormSubmit
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Mostra mensagem de sucesso
            alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
            form.reset();
        } else {
            throw new Error('Erro ao enviar mensagem');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Erro ao enviar mensagem. Por favor, tente novamente mais tarde ou me contate diretamente por e-mail.');
    } finally {
        // Restaura o botão
        button.disabled = false;
        button.innerHTML = buttonText;
    }
}