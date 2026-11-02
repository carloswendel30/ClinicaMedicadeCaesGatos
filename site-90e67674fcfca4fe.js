/* Configure com os links e páginas autênticas da sua própria oferta. */
const REVIEW_PHOTOS = {"Gabriel Nunes":{"file":"depoimento-gabriel.webp","position":"25% 5%","zoom":1.7,"src":"assets/image-9aabddb1f8f8bce5.webp"},"Rafael Costa":{"file":"depoimento-rafael.webp","position":"44% 47%","zoom":1.35,"src":"assets/image-002b1f5c1aa4b81a.webp"},"Camila Fernandes":{"file":"depoimento-camila.webp","position":"62% 10%","zoom":1.6,"src":"assets/image-79543291c79f3c05.webp"},"Juliana Martins":{"file":"depoimento-juliana.webp","position":"50% 18%","zoom":1.65,"src":"assets/image-24588959b0faecea.webp"},"Larissa Almeida":{"file":"depoimento-larissa.webp","position":"65% 15%","zoom":1.6,"src":"assets/image-ad73924b6702c1ba.webp"},"Renata Carvalho":{"file":"depoimento-renata.webp","position":"60% 28%","zoom":1.5,"src":"assets/image-07c3e8e546dd120f.webp"}};
const CONFIG = {
  termosUrl: '',
  privacidadeUrl: '',
  suporteUrl: '',
  videoUrl: '',
  videoPosterUrl: '',
  fotoMaterialUrl: '',
  // Incluir apenas relatos autênticos e autorizados: {nome, perfil, texto}.
  depoimentos: [
    {nome:'Camila Fernandes',perfil:'Estudante de Medicina Veterinária — Internato Clínico',nota:5,texto:'Os fluxogramas e os quadros de diagnóstico diferencial fizeram muita diferença para mim. Eles ajudam a visualizar a sequência do raciocínio e a entender por que cada hipótese deve ser considerada.'},
    {nome:'Juliana Martins',perfil:'Médica-veterinária recém-formada',nota:5,texto:'Eu sentia dificuldade para revisar tantos conteúdos depois da graduação. Os mapas deixaram o estudo mais leve, visual e organizado, principalmente nos temas que eu sempre confundia.'},
    {nome:'Larissa Almeida',perfil:'Pós-graduanda em Clínica Médica de Cães e Gatos',nota:5,texto:'O diferencial é que não são apenas resumos. O material conecta doenças, exames laboratoriais, testes clínicos e diagnósticos diferenciais de uma forma muito clara e prática.'},
    {nome:'Renata Carvalho',perfil:'Médica-veterinária plantonista',nota:5,texto:'O Checklist de Sinais de Alerta e os guias visuais são excelentes para revisar pontos importantes da clínica. É um material completo, bonito e muito fácil de consultar.'},
    {nome:'Gabriel Nunes',perfil:'Estudante de Medicina Veterinária — 8º período',nota:5,texto:'Eu já tinha vários resumos, mas continuava sem uma sequência clara para estudar. Aqui encontrei um caminho organizado pelos 15 sistemas, com mapas, fluxogramas e materiais que realmente se complementam.'},
    {nome:'Rafael Costa',perfil:'Médico-veterinário — Clínica Geral de Cães e Gatos',texto:'Mesmo trabalhando na área, existem conteúdos que precisam ser revisados constantemente. Ter tudo organizado de forma visual facilita muito a consulta e ajuda a enxergar melhor as conexões clínicas.'}
  ],
  // URLs de imagens reais dos PDFs desta edição. A seção aparece ao preencher.
  previasReais: []
};
const dialog=document.querySelector('#info-dialog');
function showInfo(title,text){document.querySelector('#dialog-title').textContent=title;document.querySelector('#dialog-text').textContent=text;dialog.showModal();}
function addReviewRating(card,review){if(Number.isInteger(review.nota)&&review.nota>0&&review.nota<=5){const stars=document.createElement('span');stars.className='review-stars';stars.setAttribute('role','img');stars.setAttribute('aria-label',review.nota+' de 5 estrelas');stars.textContent='★'.repeat(review.nota);card.append(stars);}}
function addReviewPhoto(avatar,review){const photo=REVIEW_PHOTOS[review.nome];if(!photo)return;avatar.replaceChildren();avatar.classList.add('tcard__av--photo');const img=document.createElement('img');img.src=photo.src;img.alt='';img.loading='eager';img.decoding='async';img.style.objectPosition=photo.position;img.style.transformOrigin=photo.position;img.style.transform='scale('+photo.zoom+')';avatar.append(img);}
document.querySelectorAll('[data-info]').forEach(button=>button.addEventListener('click',()=>{const type=button.dataset.info;const url=CONFIG[type+'Url'];if(url){window.location.assign(url);return;}const labels={termos:'Termos de Uso',privacidade:'Política de Privacidade',suporte:'Contato e Suporte'};showInfo(labels[type],type==='suporte'?'O canal de suporte será disponibilizado antes da abertura das vendas.':'As informações desta página serão disponibilizadas antes da abertura das vendas.');}));
document.querySelectorAll('dialog .dialog-close,dialog .dialog-ok').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
const track=document.querySelector('.material-track');
const dots=document.querySelector('.material-dots');
if(CONFIG.previasReais.length&&track){track.replaceChildren();dots.replaceChildren();CONFIG.previasReais.forEach((url,i)=>{const article=document.createElement('article');article.className='material-slide';article.setAttribute('role','group');article.setAttribute('aria-label',(i+1)+' de '+CONFIG.previasReais.length);const b=document.createElement('button');b.setAttribute('aria-label','Ampliar página real '+(i+1));const img=document.createElement('img');img.src=url;img.alt='Página real '+(i+1)+' dos Guias Visuais';img.loading='lazy';b.append(img);article.append(b);track.append(article);const dot=document.createElement('button');dot.dataset.slideIndex=i;dot.setAttribute('aria-label','Ver imagem '+(i+1));dot.setAttribute('aria-current',i===0?'true':'false');dots.append(dot);b.addEventListener('click',()=>{const d=document.querySelector('#image-dialog');d.querySelector('img').src=url;d.showModal();});});}
if(track){const reduced=window.matchMedia('(prefers-reduced-motion:reduce)').matches;const go=i=>{const cards=[...track.children];const index=Math.max(0,Math.min(cards.length-1,i));const left=cards[index].offsetLeft-cards[0].offsetLeft;track.scrollTo({left,behavior:reduced?'instant':'smooth'});};const current=()=>{const cards=[...track.children];let best=0;cards.forEach((c,i)=>{if(Math.abs(c.offsetLeft-cards[0].offsetLeft-track.scrollLeft)<Math.abs(cards[best].offsetLeft-cards[0].offsetLeft-track.scrollLeft))best=i;});return best;};document.querySelectorAll('[data-slide]').forEach(b=>b.addEventListener('click',()=>go(current()+(b.dataset.slide==='next'?1:-1))));dots.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>go(Number(b.dataset.slideIndex))));track.addEventListener('scroll',()=>{dots.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-current',i===current()?'true':'false'));},{passive:true});track.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(current()+(e.key==='ArrowRight'?1:-1));}});}
const play=document.querySelector('.video-play');
if(CONFIG.videoPosterUrl){const poster=document.createElement('img');poster.src=CONFIG.videoPosterUrl;poster.alt='Apresentação do material';poster.style='width:100%;height:100%;object-fit:cover';document.querySelector('.video-poster').replaceChildren(poster);}
if(CONFIG.videoUrl)document.querySelector('.video-label').textContent='VEJA O MATERIAL POR DENTRO';
if(play)play.addEventListener('click',()=>{if(!CONFIG.videoUrl){showInfo('Vídeo em breve','A apresentação em vídeo deste material estará disponível em breve.');return;}const video=document.createElement('video');video.src=CONFIG.videoUrl;video.controls=true;video.playsInline=true;video.preload='metadata';if(CONFIG.videoPosterUrl)video.poster=CONFIG.videoPosterUrl;document.querySelector('#material-video').replaceChildren(video);video.play().catch(()=>{});});
if(CONFIG.fotoMaterialUrl&&document.querySelector('#material-photo')){const img=document.createElement('img');img.src=CONFIG.fotoMaterialUrl;img.alt='Foto do material de Clínica Médica de Cães e Gatos';img.loading='lazy';document.querySelector('#material-photo').replaceChildren(img);}
if(CONFIG.depoimentos.length){
 const list=document.querySelector('.testimonial-list');
 list.classList.add('has-testimonials','marquee','testimonial-carousel');
 list.setAttribute('role','region');list.setAttribute('aria-label','Depoimentos em carrossel contínuo');list.tabIndex=0;list.replaceChildren();
 const reviewLoop=document.createElement('div');reviewLoop.className='marquee__track testimonial-loop';reviewLoop.style.setProperty('--dur','48s');
 CONFIG.depoimentos.forEach(d=>{const a=document.createElement('article');a.className='testimonial-card';addReviewRating(a,d);const q=document.createElement('blockquote');q.textContent=d.texto;const n=document.createElement('strong');n.textContent=d.nome;const p=document.createElement('small');p.textContent=d.perfil||'';a.append(q,n,p);reviewLoop.append(a);});
 [...reviewLoop.children].forEach(a=>{const copy=a.cloneNode(true);copy.inert=true;copy.setAttribute('aria-hidden','true');reviewLoop.append(copy);});
 list.append(reviewLoop);
 list.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();list.scrollBy({left:e.key==='ArrowRight'?300:-300,behavior:'smooth'});}});
}
const heroReviewTrack=document.querySelector('#tTrackTop');
if(heroReviewTrack&&CONFIG.depoimentos.length){
 heroReviewTrack.replaceChildren();
 heroReviewTrack.setAttribute('aria-label','Carrossel de depoimentos');
 heroReviewTrack.parentElement.hidden=false;
 document.querySelector('.client-strip__pending').hidden=true;
 CONFIG.depoimentos.forEach(d=>{const card=document.createElement('article');card.className='tcard';const head=document.createElement('div');head.className='tcard__head';const av=document.createElement('span');av.className='tcard__av';av.setAttribute('aria-hidden','true');av.textContent=d.nome.split(/\s+/).filter(Boolean).slice(0,2).map(n=>n[0]).join('');const identity=document.createElement('div');const name=document.createElement('strong');name.className='tcard__name';name.textContent=d.nome;const profile=document.createElement('p');profile.className='tcard__profile';profile.textContent=d.perfil||'';identity.append(name);addReviewRating(identity,d);identity.append(profile);head.append(av,identity);const quote=document.createElement('blockquote');quote.textContent=d.texto;card.append(head,quote);heroReviewTrack.append(card);});
 [...heroReviewTrack.children].forEach((card,i)=>addReviewPhoto(card.querySelector('.tcard__av'),CONFIG.depoimentos[i]));
 [...heroReviewTrack.children].forEach(card=>{const copy=card.cloneNode(true);copy.inert=true;copy.setAttribute('aria-hidden','true');heroReviewTrack.append(copy);});
 // Os depoimentos da hero continuam em movimento ao passar o mouse ou tocar.
}
// Palco e faixa de imagens com a estrutura do index de referência.
const indexTrack=document.querySelector('.index-track');
const indexDots=document.querySelector('.index-dots');
if(indexTrack){
 const actualImages=[...(CONFIG.fotoMaterialUrl?[CONFIG.fotoMaterialUrl]:[]),...CONFIG.previasReais];
 if(actualImages.length){indexTrack.replaceChildren();actualImages.forEach((url,i)=>{const card=document.createElement('article');card.className='slide';const fig=document.createElement('figure');fig.className='stage__fig';const img=document.createElement('img');img.src=url;img.alt='Página do material '+(i+1);img.loading='lazy';fig.append(img);card.append(fig);indexTrack.append(card);});const loop=document.querySelector('#material .pv-loop .marquee__track');loop.replaceChildren();actualImages.forEach((url,i)=>{const card=document.createElement('div');card.className='marquee__item pv-card';const fig=document.createElement('figure');fig.className='pv-card__fig';const img=document.createElement('img');img.src=url;img.alt='Página do material '+(i+1);img.loading='lazy';fig.append(img);card.append(fig);loop.append(card);});}
 const cards=[...indexTrack.children];
 const current=()=>{let closest=0;cards.forEach((card,i)=>{if(Math.abs(card.offsetLeft-indexTrack.scrollLeft)<Math.abs(cards[closest].offsetLeft-indexTrack.scrollLeft))closest=i;});return closest;};
 const move=i=>{i=Math.max(0,Math.min(cards.length-1,i));indexTrack.scrollTo({left:cards[i].offsetLeft,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});};
 cards.forEach((_,i)=>{const b=document.createElement('button');b.setAttribute('aria-label','Ver imagem '+(i+1));b.setAttribute('aria-current',i===0?'true':'false');b.addEventListener('click',()=>move(i));indexDots.append(b);});
 document.querySelectorAll('[data-index-step]').forEach(b=>b.addEventListener('click',()=>move(current()+Number(b.dataset.indexStep))));
 const update=()=>{const i=current();[...indexDots.children].forEach((b,n)=>b.setAttribute('aria-current',n===i?'true':'false'));document.querySelector('[data-index-step="-1"]').disabled=i===0;document.querySelector('[data-index-step="1"]').disabled=i===cards.length-1;};
 indexTrack.addEventListener('scroll',update,{passive:true});update();
 indexTrack.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(current()+(e.key==='ArrowRight'?1:-1));}});
 indexTrack.querySelectorAll('img').forEach(img=>{img.tabIndex=0;img.setAttribute('role','button');img.setAttribute('aria-label','Ampliar: '+img.alt);const zoom=()=>{const d=document.querySelector('#image-dialog');d.querySelector('img').src=img.src;d.querySelector('img').alt=img.alt;d.showModal();};img.addEventListener('click',zoom);img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();zoom();}});});
}
document.querySelectorAll('.pv-loop .marquee__track').forEach(loop=>{
 [...loop.children].forEach(card=>{const copy=card.cloneNode(true);copy.setAttribute('aria-hidden','true');copy.inert=true;loop.append(copy);});
});
