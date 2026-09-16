import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Clipboard,
  Dumbbell,
  HandHeart,
  HeartHandshake,
  Instagram,
  Menu,
  PackageOpen,
  Sparkles,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig, whatsappLinks } from "@/lib/site-config";
import logoAsset from "@/assets/WhatsApp_Image_2026-09-16_at_08.44.58.jpeg.asset.json";
import photoPrayer from "@/assets/WhatsApp_Image_2026-09-16_at_08.11.38_7.jpeg.asset.json";
import photoBag from "@/assets/WhatsApp_Image_2026-09-16_at_08.11.38_1.jpeg.asset.json";
import photoPads from "@/assets/WhatsApp_Image_2026-09-16_at_08.11.38_3.jpeg.asset.json";
import photoTraining from "@/assets/WhatsApp_Image_2026-09-16_at_08.11.38_6.jpeg.asset.json";
import photoCare from "@/assets/WhatsApp_Image_2026-09-16_at_08.11.38.jpeg.asset.json";
import photoTeam from "@/assets/WhatsApp_Image_2026-09-16_at_08.13.09.jpeg.asset.json";
import photoFlag from "@/assets/WhatsApp_Image_2026-09-16_at_08.13.10.jpeg.asset.json";
import photoKick from "@/assets/WhatsApp_Image_2026-09-16_at_08.13.10_3.jpeg.asset.json";
import qrAsset from "@/assets/qrcode.png.asset.json";

const navItems = [
  ["Início", "inicio"],
  ["O Projeto", "projeto"],
  ["Nossa Missão", "missao"],
  ["Galeria", "galeria"],
  ["Participe", "participe"],
  ["Contato", "contato"],
] as const;

const gallery = [
  { src: photoBag.url, alt: "Professor orientando treino no saco de pancadas" },
  { src: photoPads.url, alt: "Jovem praticando golpes com aparadores" },
  { src: photoTraining.url, alt: "Crianças em posição de treino de Muay Thai" },
  { src: photoPrayer.url, alt: "Equipe reunida em um momento de oração" },
  { src: photoCare.url, alt: "Professor acolhendo um participante do projeto" },
  { src: photoTeam.url, alt: "Equipe e participantes reunidos após o treino" },
  { src: photoKick.url, alt: "Participante treinando chute no saco de pancadas" },
  { src: photoFlag.url, alt: "Equipe Jai Rak reunida com a bandeira do Brasil" },
];

const missionCards: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: Dumbbell, title: "Esporte", text: "O Muay Thai como ferramenta para desenvolver disciplina, perseverança e confiança." },
  { icon: HandHeart, title: "Amor", text: "Acolhimento, respeito e cuidado com cada criança e adolescente." },
  { icon: Sparkles, title: "Fé", text: "Uma missão fundamentada nos ensinamentos de Jesus Cristo e no amor ao próximo." },
];

const supportCards: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: HeartHandshake, title: "Apoio financeiro", text: "Contribua para a continuidade das atividades." },
  { icon: PackageOpen, title: "Doação de materiais", text: "Ajude com equipamentos e recursos necessários ao treinamento." },
  { icon: Users, title: "Parcerias", text: "Converse conosco sobre outras maneiras de apoiar." },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionIntro({ eyebrow, title, children, dark = false }: { eyebrow: string; title: string; children?: ReactNode; dark?: boolean }) {
  return (
    <div className="section-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className={dark ? "text-hero-foreground" : "text-foreground"}>{title}</h2>
      {children ? <p className={dark ? "text-hero-muted" : "text-muted-foreground"}>{children}</p> : null}
    </div>
  );
}

export function JaiRakSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [selectedValue, setSelectedValue] = useState("50");
  const [customValue, setCustomValue] = useState("");
  const [showPix, setShowPix] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const pixRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") setLightboxIndex((lightboxIndex + 1) % gallery.length);
      if (event.key === "ArrowLeft") setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex]);

  const contribution = selectedValue === "other" ? customValue : selectedValue;
  const displayContribution = contribution ? `R$ ${Number(contribution).toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}` : "defina um valor";
  const activeGalleryImage = lightboxIndex === null ? undefined : gallery.at(lightboxIndex);

  const revealPix = () => {
    setShowPix(true);
    window.setTimeout(() => pixRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
  };

  const copyPix = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.pixKey);
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 2500);
    } catch {
      const input = document.getElementById("pix-key") as HTMLInputElement | null;
      input?.focus();
      input?.select();
      setCopyStatus("error");
    }
  };

  return (
    <main className="overflow-x-hidden bg-background">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-hero-foreground/10 bg-hero/95 backdrop-blur-md">
        <div className="site-container grid h-18 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:h-20">
          <a href="#inicio" className="flex min-w-0 items-center gap-3" aria-label="Jai Rak Team — início">
            <img src={logoAsset.url} alt="Logomarca Jai Rak Team" className="h-12 w-12 shrink-0 rounded-full object-cover" />
            <div className="min-w-0 leading-none">
              <strong className="block truncate font-display text-lg text-hero-foreground">JAI RAK</strong>
              <span className="text-[0.62rem] font-bold uppercase text-primary">Team Muay Thai</span>
            </div>
          </a>
          <nav className="hidden items-center gap-5 xl:flex" aria-label="Navegação principal">
            {navItems.map(([label, id]) => <a key={id} href={`#${id}`} className="nav-link">{label}</a>)}
            <Button asChild variant="gold" size="xl"><a href="#apoie">Apoie o projeto</a></Button>
          </nav>
          <Button variant="ghost" size="icon" className="text-hero-foreground hover:bg-hero-foreground/10 hover:text-primary xl:hidden" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen ? (
          <nav id="mobile-menu" className="border-t border-hero-foreground/10 bg-hero px-5 py-5 xl:hidden" aria-label="Navegação mobile">
            <div className="mx-auto flex max-w-xl flex-col">
              {navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="border-b border-hero-foreground/10 py-3 font-display text-lg uppercase text-hero-foreground">{label}</a>)}
              <Button asChild variant="gold" size="xl" className="mt-5"><a href="#apoie" onClick={() => setMenuOpen(false)}>Apoie o projeto</a></Button>
            </div>
          </nav>
        ) : null}
      </header>

      <section id="inicio" className="hero-section relative flex min-h-[92svh] items-end overflow-hidden pt-18">
        <img src={photoFlag.url} alt="Equipe Jai Rak reunida com a bandeira do Brasil" className="absolute inset-0 h-full w-full object-cover object-[63%_center] sm:object-center" fetchPriority="high" />
        <div className="hero-overlay absolute inset-0" />
        <div className="site-container relative z-10 pb-14 pt-32 sm:pb-20 lg:pb-24">
          <div className="max-w-3xl">
            <span className="eyebrow text-primary">Muay Thai • Amor • Propósito</span>
            <h1 className="mt-5 font-display text-[clamp(3.5rem,9vw,7.8rem)] uppercase leading-[0.82] text-hero-foreground">JAI RAK <span className="text-primary">TEAM</span></h1>
            <p className="mt-5 max-w-2xl font-display text-[clamp(1.55rem,4vw,3.2rem)] uppercase leading-none text-hero-foreground">Muito além do Muay Thai.</p>
            <p className="mt-5 max-w-xl text-base leading-7 text-hero-muted sm:text-lg">Transformando vidas através do esporte, da disciplina e do amor de Jesus.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="gold" size="xl" onClick={() => scrollTo("participe")}>Faça parte do projeto <ChevronRight /></Button>
              <Button variant="lightOutline" size="xl" onClick={() => scrollTo("missao")}>Conheça nossa missão</Button>
            </div>
          </div>
        </div>
        <button type="button" className="absolute bottom-6 right-6 z-10 hidden items-center gap-2 text-xs font-bold uppercase text-hero-muted md:flex" onClick={() => scrollTo("projeto")}>Descubra <ArrowDown className="h-4 w-4" /></button>
      </section>

      <section id="projeto" className="section-space scroll-mt-20">
        <div className="site-container grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="image-frame aspect-[4/5] lg:aspect-[4/5]"><img src={photoTeam.url} alt="Professor e participantes do Jai Rak Team" className="h-full w-full object-cover object-center" loading="lazy" /></div>
          <div>
            <SectionIntro eyebrow="O projeto" title="Mais que uma luta. Uma missão." />
            <div className="mt-7 space-y-5 text-base leading-8 text-muted-foreground sm:text-lg">
              <p>O Jai Rak Team é um projeto social que encontra no Muay Thai uma oportunidade de ensinar, acolher e inspirar crianças e adolescentes.</p>
              <p>Nossa missão vai além do desenvolvimento esportivo. Queremos contribuir para a formação de valores, fortalecer vínculos e oferecer boas referências através da disciplina, do respeito, do amor ao próximo e da fé em Jesus Cristo.</p>
              <p className="font-semibold text-foreground">Acreditamos que cada criança e adolescente possui valor, potencial e merece encontrar pessoas dispostas a caminhar ao seu lado.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="missao" className="section-space scroll-mt-20 bg-hero text-hero-foreground">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionIntro eyebrow="Nossa missão" title="Um coração que luta por vidas." dark />
            <div className="space-y-5 text-lg leading-8 text-hero-muted">
              <p>No Jai Rak, acreditamos que o verdadeiro propósito vai muito além de formar atletas.</p>
              <p>Queremos caminhar ao lado de crianças e adolescentes, oferecendo acolhimento, disciplina, respeito e referências positivas.</p>
              <p className="mission-quote">O Muay Thai é a nossa ferramenta. O amor é a nossa motivação. Jesus Cristo é o fundamento da nossa missão.</p>
            </div>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-card border border-hero-foreground/10 bg-hero-foreground/10 md:grid-cols-3">
            {missionCards.map(({ icon: Icon, title, text }) => (
              <article key={title} className="bg-hero p-7 sm:p-9">
                <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
                <h3 className="mt-6 font-display text-2xl uppercase">{title}</h3>
                <p className="mt-3 leading-7 text-hero-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="treino" className="section-space bg-secondary">
        <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="lg:order-2"><div className="image-frame aspect-[4/5]"><img src={photoKick.url} alt="Jovem praticando chute de Muay Thai" className="h-full w-full object-cover object-center" loading="lazy" /></div></div>
          <div>
            <SectionIntro eyebrow="Muay Thai como ferramenta" title="Disciplina que começa no treino e acompanha a vida." />
            <p className="mt-6 leading-8 text-muted-foreground">O esporte abre espaço para aprendizados que atravessam o tatame. Em cada atividade, buscamos cultivar atitudes que ajudam crianças e adolescentes a crescer com consciência e respeito.</p>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3" aria-label="Valores desenvolvidos no treino">
              {["Respeito", "Disciplina", "Responsabilidade", "Perseverança", "Trabalho em equipe"].map((item) => <li key={item} className="flex items-center gap-2 border-b border-border pb-3 font-semibold"><Check className="h-4 w-4 shrink-0 text-primary" />{item}</li>)}
            </ul>
            <blockquote className="mt-9 border-l-2 border-primary pl-5 font-display text-2xl uppercase leading-tight text-foreground">Aqui, cada treino é uma oportunidade de ensinar muito mais do que golpes.</blockquote>
          </div>
        </div>
      </section>

      <section id="equipe" className="section-space">
        <div className="site-container">
          <SectionIntro eyebrow="Nossa equipe" title="Conheça quem faz acontecer.">Duas funções que se encontram no mesmo propósito: servir, ensinar e cuidar do futuro do projeto.</SectionIntro>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              ["PO", "Patrick Oliveira", "Professor do Projeto", "Responsável pela condução das atividades e pelo ensino do Muay Thai."],
              ["MN", "Marcos Neves", "Gestor do Projeto", "Responsável pela organização e pelo desenvolvimento do projeto."],
            ].map(([initials, name, role, description]) => (
              <article key={name} className="team-card">
                <span className="team-monogram" aria-hidden="true">{initials}</span>
                <div><p className="text-xs font-bold uppercase text-primary">{role}</p><h3 className="mt-2 font-display text-3xl uppercase">{name}</h3><p className="mt-3 max-w-md leading-7 text-muted-foreground">{description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="galeria" className="section-space scroll-mt-20 bg-hero text-hero-foreground">
        <div className="site-container">
          <SectionIntro eyebrow="Galeria" title="Momentos do Jai Rak." dark>Cada treino, cada encontro e cada conquista fazem parte da nossa história.</SectionIntro>
          <div className="gallery-grid mt-10">
            {gallery.map((image, index) => (
              <button type="button" key={image.src} className="gallery-item group" onClick={() => setLightboxIndex(index)} aria-label={`Ampliar imagem ${index + 1}`}>
                <img src={image.src} alt={image.alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
                <span className="gallery-number">{String(index + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="participe" className="section-space scroll-mt-20 bg-secondary">
        <div className="site-container grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <SectionIntro eyebrow="Como participar" title="Seu lugar também pode ser aqui.">Quer saber mais sobre o projeto e como participar? Entre em contato com nossa equipe pelo WhatsApp. Para menores de idade, a conversa deve ser conduzida pelo responsável legal.</SectionIntro>
          <Button asChild variant="gold" size="xl"><a href={whatsappLinks.participate} target="_blank" rel="noreferrer">Quero participar <ChevronRight /></a></Button>
        </div>
      </section>

      <section id="apoie" className="section-space scroll-mt-20 bg-hero text-hero-foreground">
        <div className="site-container">
          <SectionIntro eyebrow="Seja um apoiador" title="Ajude a manter essa missão viva." dark>Sua contribuição ajuda o Jai Rak Team a continuar desenvolvendo suas atividades e alcançando crianças e adolescentes por meio do esporte e do amor de Jesus.</SectionIntro>
          <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="donation-panel">
              <p className="text-sm font-bold uppercase text-hero-muted">Escolha uma referência de valor</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {["20", "50", "100"].map((value) => <button key={value} type="button" className={`value-button ${selectedValue === value ? "value-button-active" : ""}`} onClick={() => setSelectedValue(value)}>R$ {value}</button>)}
                <button type="button" className={`value-button ${selectedValue === "other" ? "value-button-active" : ""}`} onClick={() => setSelectedValue("other")}>Outro valor</button>
              </div>
              {selectedValue === "other" ? <label className="mt-5 block text-sm text-hero-muted">Digite um valor positivo<input type="number" min="1" step="0.01" inputMode="decimal" value={customValue} onChange={(event) => setCustomValue(event.target.value)} className="mt-2 h-12 w-full rounded-control border border-hero-foreground/20 bg-hero-foreground/5 px-4 text-hero-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" placeholder="R$ 0,00" /></label> : null}
              <div className="my-6 border-y border-hero-foreground/10 py-5"><p className="text-sm text-hero-muted">Sua contribuição:</p><strong className="font-display text-3xl text-primary">{displayContribution}</strong></div>
              <p className="text-sm leading-6 text-hero-muted">O valor é apenas uma referência. A contribuição é concluída no aplicativo do seu banco.</p>
              <Button variant="gold" size="xl" className="mt-6 w-full" onClick={revealPix} disabled={selectedValue === "other" && (!customValue || Number(customValue) <= 0)}>Continuar com Pix</Button>
            </div>
            <div ref={pixRef} className={`pix-panel ${showPix ? "pix-panel-visible" : ""}`} aria-hidden={!showPix}>
              {showPix ? <>
                <div className="grid items-center gap-7 sm:grid-cols-[minmax(180px,260px)_1fr]">
                  <div className="rounded-control bg-qr p-4"><img src={qrAsset.url} alt="QR Code Pix oficial do Jai Rak Team" className="aspect-square h-auto w-full" /></div>
                  <div>
                    <span className="eyebrow">Pagamento por Pix</span>
                    <h3 className="mt-3 font-display text-3xl uppercase">Escaneie ou copie a chave.</h3>
                    <p className="mt-3 leading-7 text-hero-muted">Escaneie o QR Code ou copie a chave Pix para contribuir.</p>
                    <label className="mt-5 block text-xs font-bold uppercase text-hero-muted" htmlFor="pix-key">Chave Pix</label>
                    <input id="pix-key" value={siteConfig.pixKey} readOnly className="mt-2 w-full rounded-control border border-hero-foreground/15 bg-hero-foreground/5 px-4 py-3 font-mono text-lg text-hero-foreground outline-none focus:border-primary" />
                    <Button variant="gold" size="xl" className="mt-3 w-full" onClick={copyPix}>{copyStatus === "copied" ? <Check /> : <Clipboard />}{copyStatus === "copied" ? "Chave Pix copiada!" : "Copiar chave Pix"}</Button>
                    {copyStatus === "error" ? <p role="alert" className="mt-2 text-sm text-primary">Não foi possível copiar automaticamente. A chave foi selecionada para cópia manual.</p> : null}
                  </div>
                </div>
                <p className="mt-6 border-t border-hero-foreground/10 pt-5 text-xs leading-5 text-hero-muted">Confira os dados do destinatário e informe o valor da sua contribuição no aplicativo do banco, quando necessário. O QR Code é estático e não recebe automaticamente o valor escolhido acima.</p>
                <Button asChild variant="goldOutline" size="xl" className="mt-5"><a href={whatsappLinks.donation} target="_blank" rel="noreferrer">Falar com a equipe</a></Button>
              </> : <div className="grid min-h-80 place-items-center text-center"><div><Clipboard className="mx-auto h-9 w-9 text-primary" /><p className="mt-4 max-w-sm text-hero-muted">Escolha um valor de referência e continue para visualizar o QR Code oficial.</p></div></div>}
            </div>
          </div>
        </div>
      </section>

      <section id="parceiro" className="section-space">
        <div className="site-container">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><SectionIntro eyebrow="Seja um parceiro" title="Juntos, podemos ir mais longe.">O Jai Rak Team acredita na força das parcerias. Se você ou sua empresa deseja contribuir com essa missão por meio de apoio financeiro, equipamentos, materiais ou serviços, entre em contato conosco.</SectionIntro><Button asChild variant="gold" size="xl"><a href={whatsappLinks.partnership} target="_blank" rel="noreferrer">Quero ser parceiro</a></Button></div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {supportCards.map(({ icon: Icon, title, text }) => <article key={title} className="support-card"><Icon className="h-7 w-7 text-primary" /><h3 className="mt-5 font-display text-xl uppercase">{title}</h3><p className="mt-2 leading-7 text-muted-foreground">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section id="contato" className="section-space scroll-mt-20 bg-secondary">
        <div className="site-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <SectionIntro eyebrow="Contato" title="Vamos conversar?">Estamos a uma mensagem de distância. Conheça, participe ou converse com a equipe pelos nossos canais oficiais.</SectionIntro>
          <div className="grid gap-4 sm:grid-cols-2">
            <a href={whatsappLinks.general} target="_blank" rel="noreferrer" className="contact-link"><MessageIcon /><span><small>WhatsApp</small><strong>{siteConfig.whatsappDisplay}</strong></span><ChevronRight /></a>
            <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" className="contact-link"><Instagram /><span><small>Instagram</small><strong>{siteConfig.instagramHandle}</strong></span><ChevronRight /></a>
          </div>
        </div>
      </section>

      <footer className="bg-hero pb-24 pt-14 text-hero-foreground sm:pb-10">
        <div className="site-container">
          <div className="grid gap-10 border-b border-hero-foreground/10 pb-10 md:grid-cols-[1fr_auto]">
            <div className="flex items-center gap-4"><img src={logoAsset.url} alt="Jai Rak Team" className="h-16 w-16 rounded-full object-cover" /><div><strong className="font-display text-2xl">JAI RAK TEAM</strong><p className="mt-1 text-sm text-hero-muted">Muito além do Muay Thai. Uma missão de amor.</p></div></div>
            <nav className="flex max-w-xl flex-wrap gap-x-5 gap-y-3 text-sm text-hero-muted" aria-label="Links do rodapé">{[...navItems, ["Apoiar", "apoie"] as const].map(([label, id]) => <a key={`${id}-footer`} href={`#${id}`} className="hover:text-primary">{label}</a>)}</nav>
          </div>
          <div className="flex flex-col gap-4 pt-6 text-xs text-hero-muted sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Jai Rak Team. Todos os direitos reservados.</p><div className="flex gap-3"><a href={whatsappLinks.general} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="social-icon"><MessageIcon /></a><a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" className="social-icon"><Instagram /></a></div></div>
        </div>
      </footer>

      <a href={whatsappLinks.general} target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="Falar com o Jai Rak Team pelo WhatsApp"><MessageIcon /></a>

      {lightboxIndex !== null && activeGalleryImage ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Visualização ampliada da galeria" onClick={() => setLightboxIndex(null)}>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4 z-10 text-hero-foreground hover:bg-hero-foreground/10 hover:text-primary" onClick={() => setLightboxIndex(null)} aria-label="Fechar galeria"><X /></Button>
          <Button variant="ghost" size="icon" className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-hero-foreground hover:bg-hero-foreground/10 hover:text-primary sm:left-6" onClick={(event) => { event.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length); }} aria-label="Imagem anterior"><ArrowLeft /></Button>
          <img src={activeGalleryImage.src} alt={activeGalleryImage.alt} className="max-h-[86vh] max-w-[84vw] object-contain" onClick={(event) => event.stopPropagation()} />
          <Button variant="ghost" size="icon" className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-hero-foreground hover:bg-hero-foreground/10 hover:text-primary sm:right-6" onClick={(event) => { event.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % gallery.length); }} aria-label="Próxima imagem"><ArrowRight /></Button>
          <span className="absolute bottom-5 text-xs font-bold text-hero-muted">{lightboxIndex + 1} / {gallery.length}</span>
        </div>
      ) : null}
    </main>
  );
}

function MessageIcon({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className || "h-6 w-6"}><path d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.52 0 .18 5.34.18 11.9c0 2.1.55 4.15 1.6 5.96L.08 24l6.29-1.65a11.9 11.9 0 0 0 5.7 1.45h.01C18.64 23.8 24 18.46 24 11.9c0-3.18-1.24-6.17-3.48-8.42ZM12.08 21.8h-.01a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.73.98 1-3.63-.24-.37a9.86 9.86 0 0 1-1.52-5.29C2.18 6.44 6.62 2 12.08 2a9.83 9.83 0 0 1 7 2.9A9.84 9.84 0 0 1 22 11.9c0 5.46-4.46 9.9-9.92 9.9Zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47a8.9 8.9 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" /></svg>;
}