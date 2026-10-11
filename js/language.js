(function(){
  const path=location.pathname;
  const isPortal=path.includes('/portal/');
  const langKey=isPortal?'fazbear-portal-language':'fazbear-public-language';
  const map={
    'INÍCIO':'HOME','SOBRE NÓS':'ABOUT US','CARDÁPIO':'MENU','NOSSOS PERSONAGENS':'OUR CHARACTERS','FESTAS DE ANIVERSÁRIO':'BIRTHDAY PARTIES','CONTATO':'CONTACT','Área de funcionários':'Employee area','MENU':'MENU','ATENÇÃO:':'PLEASE NOTE:','EM CARTAZ':'NOW PLAYING','O lugar mais feliz para crianças e adultos':'The happiest place for kids and grown-ups alike','Bons momentos.':'Good times.','Ótima pizza.':'Great pizza.','Ver o cardápio':'See our menu','Planejar uma festa':'Plan a party','Diversão para todos':'Something for everybody','Conheça a Freddy\'s':'Learn about Freddy\'s','Refeição em família':'Family dining','Conheça a banda':'Meet the band','Central de aniversários':'Birthday headquarters','Ver pacotes de festa »':'View party packages »','Especial familiar de sexta-feira':'Friday night family special','Perguntar sobre reservas':'Ask about reservations','Sobre a Freddy\'s':'About Freddy\'s','O cardápio':'The menu','Festas de aniversário':'Birthday parties','Fale conosco':'Contact us','Nossos personagens':'Our characters',
    'INBOX':'INBOX','ARQUIVO':'FILE INDEX','MANUTENÇÃO':'MAINTENANCE LOG','MENSAGENS':'MESSAGES','PESSOAL':'PERSONNEL','SISTEMA':'SYSTEM','DESCONECTAR':'DISCONNECT','Área pública':'PUBLIC SITE','Conecte-se à rede':'CONNECT TO NETWORK','Nome':'Name','Código de acesso':'Access code','Funcionário':'Employee','Bem-vindo à rede interna':'Welcome to the internal network','Portal interno de funcionários':'Internal employee portal','ACESSO DE FUNCIONÁRIOS':'EMPLOYEE ACCESS','SOBRE ESTE TERMINAL':'ABOUT THIS TERMINAL'
  };
  function translate(root){
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(n=>{const value=n.nodeValue.trim();if(map[value])n.nodeValue=n.nodeValue.replace(value,map[value]);});
    document.documentElement.lang='en';
  }
  function addSwitch(){
    const header=document.querySelector(isPortal?'.corp-header':'.site-header');if(!header)return;
    const switcher=document.createElement('div');switcher.className='language-switch';switcher.innerHTML='<button type="button" data-lang="pt-BR">PT-BR</button><span>|</span><button type="button" data-lang="en">EN</button>';
    header.appendChild(switcher);
    switcher.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{localStorage.setItem(langKey,b.dataset.lang);location.reload()}));
  }
  function gate(){
    if(localStorage.getItem(langKey))return;
    const gate=document.createElement('div');gate.className=isPortal?'language-gate portal-gate':'language-gate';gate.innerHTML='<div class="language-box"><div class="language-kicker">FAZBEAR ENTERTAINMENT</div><h1>Selecione o idioma<br><small>Select your language</small></h1><p>Escolha o idioma para continuar.</p><div><button data-choice="pt-BR">PORTUGUÊS (BR)</button><button data-choice="en">ENGLISH</button></div></div>';
    document.body.appendChild(gate);gate.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{localStorage.setItem(langKey,b.dataset.choice);gate.remove();if(b.dataset.choice==='en')translate(document.body)}));
  }
  addSwitch();
  if(localStorage.getItem(langKey)==='en')translate(document.body);
  if(path.endsWith('/')||path.endsWith('/index.html')||path==='/')gate();
})();
