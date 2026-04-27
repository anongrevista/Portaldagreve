import { notFound } from "next/navigation";
import { Reference } from "@/components/ReferenceTooltip";
import { FileCheck, Calendar, Users, PenTool, Link as LinkIcon, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Dados estruturados do documento "Informações sobre a greve"
 * Extraídos do .txt original completo para renderização nativa com o design da Central.
 */
const INFORMACOES_GREVE = {
  title: "Informações sobre a greve",
  sumario: [
    { label: "1. Conquistas de Greves anteriores", anchor: "greves-anteriores" },
    { label: "1.1 Greve (2023)", anchor: "greve-2023", indent: true },
    { label: "1.2 Paralisação (2019)", anchor: "paralisacao-2019", indent: true },
    { label: "1.3 Greve (2016)", anchor: "greve-2016", indent: true },
    { label: "2. Informações sobre esta greve", anchor: "sobre-essa-greve" },
    { label: "2.1 Lutas da greve", anchor: "lutas-da-greve", indent: true },
    { label: "2.2 Pautas da greve", anchor: "pautas-da-greve", indent: true },
    { label: "2.3 Informações úteis", anchor: "informacoes-uteis", indent: true },
    { label: "2.4 Funcionamento da greve", anchor: "funcionamento-da-greve", indent: true },
    { label: "2.5 Como ajudar", anchor: "como-ajudar", indent: true },
    { label: "2.6 Reuniões e atividades até agora", anchor: "reunioes-atividades", indent: true },
  ],
};

const APRESENTACAO_CENTRAL = {
  title: "Apresentação da Central da Greve (CG)",
  sumario: [
    { label: "O projeto em poucas palavras", anchor: "projeto-resumo" },
    { label: "1. Introdução", anchor: "introducao" },
    { label: "2. O que é", anchor: "o-que-e" },
    { label: "3. Equipe", anchor: "equipe" },
    { label: "4. Objetivos e Como", anchor: "objetivos" },
    { label: "5. Estrutura de Abas", anchor: "estrutura-abas" },
    { label: "6. Organização e Layout", anchor: "organizacao-layout" },
    { label: "7. Por que a Central é necessária?", anchor: "necessidade" },
    { label: "9. Parte Técnica", anchor: "parte-tecnica" },
    { label: "10. Conclusão", anchor: "conclusao" },
  ],
};

/**
 * Mapeamento de slugs para documentos.
 * Quando novos documentos forem adicionados, basta adicionar a entrada aqui.
 */
const DOCUMENT_MAP: Record<string, { key: string; title: string }> = {
  "ifusp/comando-de-greve/informacoes-sobre-a-greve": {
    key: "informacoes-sobre-a-greve",
    title: "Informações sobre a greve",
  },
  "apresentacao-do-hub-da-greve": {
    key: "apresentacao-do-hub",
    title: "Apresentação da Central da Greve (CG)",
  },
  "ifusp/comando-de-greve/reuniao-direcao-ifusp": {
    key: "reuniao-direcao-ifusp",
    title: "Reunião com a Direção do IFUSP",
  },
  "ifusp/comando-de-greve/reuniao-todos-comandos": {
    key: "reuniao-todos-comandos",
    title: "Reunião com o comando de greve geral da USP",
  },
  "ifusp/comando-de-greve/documento-assinatura-kaline": {
    key: "documento-assinatura-kaline",
    title: "Documento de não perseguição que a kaline (diretora do IF assinou)",
  },
  "ifusp/comando-de-greve/o-que-e-o-comando": {
    key: "o-que-e-o-comando",
    title: "O que é o Comando de Greve",
  },
  "ifusp/comando-de-greve/influencers-de-direita": {
    key: "influencers-de-direita",
    title: "Como lidar com influencers de direita",
  },
};

function SectionDivider() {
  return <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8" />;
}

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-20 flex items-center gap-3">
      <span className="w-1 h-7 bg-secondary rounded-full inline-block" />
      {children}
    </h2>
  );
}

function SubSectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="text-xl font-semibold text-gray-200 mt-8 mb-3 scroll-mt-20">
      {children}
    </h3>
  );
}

function CategoryBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-primary/20 text-primary border border-primary/30 rounded-full px-3 py-1 text-sm font-semibold mb-3 mt-4">
      {children}
    </span>
  );
}

function Marked({ color, children }: { color: 'yellow' | 'red' | 'gray'; children: React.ReactNode }) {
  const bgClass = {
    yellow: 'bg-yellow-400/20 border-b border-yellow-400/40 text-yellow-100',
    red: 'bg-red-500/20 border-b border-red-500/40 text-red-100',
    gray: 'bg-gray-500/20 border-b border-gray-500/40 text-gray-100',
  }[color];
  
  return <span className={cn("px-1.5 py-0.5 rounded-sm transition-colors", bgClass)}>{children}</span>;
}

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 items-start">
      <span className="text-secondary mt-1.5">•</span>
      <span className="text-gray-300">{children}</span>
    </li>
  );
}

function ActivityItem({ date, children }: { date: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <div className="flex-shrink-0 w-24 pt-1">
        <span className="text-[10px] font-bold text-secondary uppercase tracking-widest px-2 py-1 bg-secondary/10 border border-secondary/20 rounded">
          {date}
        </span>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">{children}</p>
    </li>
  );
}

function InformacoesGreveContent() {
  const references = [
    { id: "1", title: "Como lidar com a aparição de influencers de direita", url: "/documentos/ifusp/comando-de-greve/influencers-de-direita" },
    { id: "2", title: "Reunião com o comando de greve geral da USP", url: "/documentos/ifusp/comando-de-greve/reuniao-todos-comandos" },
    { id: "3", title: "Reunião com a Direção do IFUSP", url: "/documentos/ifusp/comando-de-greve/reuniao-direcao-ifusp" },
    { id: "4", title: "O que é o Comando de Greve", url: "/documentos/ifusp/comando-de-greve/o-que-e-o-comando" }
  ];

  return (
    <>
      {/* Sumário */}
      <div className="bg-[#1a1f2e] border border-gray-700/50 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          Sumário
        </h2>
        <nav className="space-y-1.5">
          {INFORMACOES_GREVE.sumario.map((item) => (
            <a
              key={item.anchor}
              href={`#${item.anchor}`}
              className={`block text-sm transition-colors hover:text-secondary ${
                item.indent ? "pl-6 text-gray-400 hover:text-gray-200" : "font-semibold text-gray-300"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Legenda de Cores */}
      <div className="bg-gray-800/20 border border-gray-700/30 rounded-xl p-5 mb-10">
        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Significado das Marcações
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Marked color="gray">Marcação Cinza</Marked>
            <span className="text-sm text-gray-400">— Futuramente terão referências a outros documentos detalhados.</span>
          </div>
          <div className="flex items-center gap-3">
            <Marked color="yellow">Marcação Amarela</Marked>
            <span className="text-sm text-gray-400">— Pautas que ainda precisam de maior explicação e detalhamento.</span>
          </div>
          <div className="flex items-center gap-3">
            <Marked color="red">Marcação Vermelha</Marked>
            <span className="text-sm text-gray-400">— Pautas que ainda estão sendo avaliadas para ver se é possível incluir.</span>
          </div>
        </div>
      </div>

      {/* 1. Greves anteriores */}
      <SectionTitle id="greves-anteriores">1. Conquistas de Greves anteriores</SectionTitle>
      <p className="text-gray-300 leading-relaxed mb-4">
        Podemos obter algumas informações com base em conquistas reais de mobilizações passadas:
      </p>

      <SubSectionTitle id="greve-2023">1.1 Greve (2023)</SubSectionTitle>
      <p className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Conquistas:</p>
      <ul className="list-disc list-inside space-y-1.5 ml-2 mb-6">
        <BulletItem>GT de dados descobriu o parâmetro sustentabilidade da reitoria</BulletItem>
        <BulletItem>Contratação de professores</BulletItem>
        <BulletItem>Jantar aos sábados</BulletItem>
        <BulletItem>PPP bacharelado</BulletItem>
        <BulletItem>Mudança de responsáveis pelo Física 1 — Funchal e companhia eram responsáveis</BulletItem>
      </ul>

      <SubSectionTitle id="paralisacao-2019">1.2 Paralisação (2019)</SubSectionTitle>
      <p className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Conquistas:</p>
      <ul className="list-disc list-inside space-y-1.5 ml-2 mb-6">
        <BulletItem>Evitou cortes no orçamento da USP</BulletItem>
        <BulletItem>União dos cientistas em uma luta nacional</BulletItem>
        <BulletItem>Chamou atenção para falta de professores</BulletItem>
      </ul>

      <SubSectionTitle id="greve-2016">1.3 Greve (2016)</SubSectionTitle>
      <p className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Conquistas:</p>
      <ul className="list-disc list-inside space-y-1.5 ml-2 mb-6">
        <BulletItem>Cotas na FUVEST</BulletItem>
        <BulletItem>Debate da criação de um ENEM-USP e políticas de acesso à universidade</BulletItem>
      </ul>

      <SectionDivider />

      {/* 2. Sobre essa greve */}
      <SectionTitle id="sobre-essa-greve">2. Informações sobre esta greve</SectionTitle>

      {/* 2.1 Lutas da greve */}
      <SubSectionTitle id="lutas-da-greve">2.1 Lutas da greve</SubSectionTitle>
      <ul className="list-disc list-inside space-y-2 ml-2 mb-8 text-gray-300">
        <BulletItem>Por uma mudança na forma do repasse de verba estadual das universidades estaduais, com o fim do ICMS o repasse de verba deve se manter e não a alternativa de terceirização de tudo na universidade e políticas de autofinanciamento. A universidade é e deve continuar sendo pública, a educação é um direito do povo e um dever do estado. O rumo da ciência deve ser pautada pelo povo e não por grandes empresas;</BulletItem>
        <BulletItem>Contra a tomada dos espaços estudantis. A universidade é um centro cultural, ela reúne pessoas de todas as regiões, culturas, espaços, idades e esse encontro de diversas culturas e experiências resulta em espaços, saraus, festas e etc incríveis e únicas que são importantes para o desenvolvimento social dos estudantes;</BulletItem>
        <BulletItem>Pela abertura de mais concursos para professores, a USP está de novo descumprindo o prometido e de novo temos que pautar isso, pois matérias estão deixando de ser oferecidas por falta de professores;</BulletItem>
        <BulletItem>Contra a privatização e precarização dos bandejões, chega de larvas em nossas comidas. Não é um adicional de proteína, é um risco grave à saúde dos estudantes e que leva muitos ao hospital por intoxicação todos os semestre;</BulletItem>
        <BulletItem>Por uma defesa a isonomia e direitos dos funcionários e alunos que não são representados nas reuniões e assembleias apesar de serem maioria da universidade sendo que a usp já prometeu e nao cumpre que tenham no mínimo 20% de representantes discentes nas assembleias e reuniões;</BulletItem>
      </ul>

      <SectionDivider />

      {/* 2.2 Pautas da greve */}
      <SubSectionTitle id="pautas-da-greve">2.2 Pautas da greve</SubSectionTitle>
      <p className="text-gray-300 leading-relaxed mb-6">
        As pautas foram divididas em 4 eixos, sendo eles o de permanência, espaços de vivência, acesso e orçamento. As mesmas já compõe a carta de reivindicações do IFUSP e foram enviadas ao DCE para que tenha um debate analisando as cartas de cada instituto e suas pautas e compor a pauta geral da USP como um todo.
      </p>

      {/* Pautas USP Geral */}
      <h4 className="text-lg font-semibold text-gray-100 mb-4 border-l-2 border-secondary/50 pl-3">
        Pautas da carta de reivindicações feitas para a USP (geral)
      </h4>

      {/* Permanência */}
      <CategoryBadge>Permanência - Eixo 1</CategoryBadge>

      <p className="text-sm font-semibold text-white mt-3 mb-2">1. Melhoras no Bandejão:</p>
      <ul className="list-disc list-inside space-y-1.5 ml-4 mb-4">
        <BulletItem>Construção de bandejão poli/p3 (alunos da ver/fofito não tem tempo de bandejão)</BulletItem>
        <BulletItem>Desprivatização dos bandejões e equipe sem terceirizados</BulletItem>
        <BulletItem>Café da manhã em todos os bancos das 6h as 9h</BulletItem>
        <BulletItem>Vigilância sanitária constante</BulletItem>
        <BulletItem><Marked color="yellow">Jantar no domingo</Marked></BulletItem>
        <BulletItem><Marked color="yellow">Funcionar nos feriados</Marked></BulletItem>
        <BulletItem><Marked color="yellow">Dois pães na prefeitura e na química</Marked></BulletItem>
      </ul>

      <p className="text-sm font-semibold text-white mt-3 mb-2">2. Por melhoras e garantias para os funcionários:</p>
      <ul className="list-disc list-inside space-y-1.5 ml-4 mb-4">
        <BulletItem>BUSP para o funcionário terceirizado</BulletItem>
        <BulletItem>Intérprete de libras para os alunos que precisam (atualmente são funcionários temporários contratos de um ano ou semestre, quando o funcionário acaba o professor(a) fica impedido de dar aulas ou o aluno de entender)</BulletItem>
        <BulletItem><Marked color="yellow">Contratação de pessoal estatizado para o HU</Marked></BulletItem>
      </ul>

      <p className="text-sm font-semibold text-white mt-3 mb-2">3. Políticas de permanência efetivas:</p>
      <ul className="list-disc list-inside space-y-1.5 ml-4 mb-4">
        <BulletItem>BUSP entre campos Butantã e quadrilátero da saúde, um circular entre os campos</BulletItem>
        <BulletItem>Passe livre para CRUSP (meia passagem)</BulletItem>
        <BulletItem>Formação continuada para dar aula o professor ter um currículo atualizado para dar aulas</BulletItem>
        <BulletItem>Tarifa gratuita para toda a comunidade USP e BUSP para toda comunidade</BulletItem>
        <BulletItem>Contratação de mais professores titulares</BulletItem>
        <BulletItem>Aumento de PUBs, mantendo valor e prioridade a pessoas de baixa renda</BulletItem>
        <BulletItem>Mais roteadores na USP</BulletItem>
        <BulletItem>USP aceitar medidas protetivas</BulletItem>
        <BulletItem>Maior oferecimento da disciplina de libras e ser de um semestre para cada curso</BulletItem>
        <BulletItem><Marked color="yellow">Bolsa de suporte a pessoas com deficiência (profissionais e não bolsistas)</Marked></BulletItem>
        <BulletItem><Marked color="yellow">Aumento da frequência dos circulares no fim de semana</Marked></BulletItem>
      </ul>

      {/* Espaços */}
      <CategoryBadge>Espaços - Eixo 2</CategoryBadge>
      <ul className="list-disc list-inside space-y-1.5 ml-4 mb-4 mt-2">
        <BulletItem>Salas lilás na USP (espaço de acolhimento para mulheres em situações de violência)</BulletItem>
      </ul>

      {/* Acesso */}
      <CategoryBadge>Acesso - Eixo 3</CategoryBadge>
      <ul className="list-disc list-inside space-y-1.5 ml-4 mb-4 mt-2">
        <BulletItem>Cotas para pós, cotas trans/indígena/PCD</BulletItem>
        <BulletItem>Auxílio mudança para cruspianos no primeiro mês</BulletItem>
        <BulletItem>PAPFE a um salário mínimo paulista e meio pro CRUSP</BulletItem>
        <BulletItem>Porcentagem de alunos do PAPFE atrelado porcentagem de alunos abaixo da renda mínima na faculdade</BulletItem>
        <BulletItem>Cota de escola pública ampliada para 90%</BulletItem>
        <BulletItem>Cotas para contratação de professores</BulletItem>
        <BulletItem>Fim do vestibular</BulletItem>
      </ul>

      {/* Orçamento */}
      <CategoryBadge>Orçamento - Eixo 4</CategoryBadge>
      <ul className="list-disc list-inside space-y-1.5 ml-4 mb-8 mt-2">
        <BulletItem>Fim do teto de gastos que ocorrem em todas as etapas (USP é a única com teto, Unesp e Unicamp não tem)</BulletItem>
        <BulletItem>Isonomia universitária — direitos iguais a todos os funcionários e ganhos de benefícios iguais</BulletItem>
        <BulletItem>Isonomia em votações para alunos (já deve ser 20% e nem isso é cumprido)</BulletItem>
        <BulletItem>Manutenção do repasse de verba com o fim do ICMS (substituição pelo IBS) — financiamento não pode ser entregue à iniciativa privada</BulletItem>
      </ul>

      {/* Pautas IFUSP */}
      <h4 className="text-lg font-semibold text-gray-100 mb-4 border-l-2 border-secondary/50 pl-3">
        Pautas da carta de reivindicações feitas para o IFUSP
      </h4>

      <CategoryBadge>Permanência - Eixo 1</CategoryBadge>
      <ul className="list-disc list-inside space-y-1.5 ml-4 mb-4 mt-2">
        <BulletItem>Exaustores/ar/ventilador no bandejão da física</BulletItem>
        <BulletItem>Efetivação do Física Acolhe para que a equipe de psicólogos seja contratada e não paga pelo dinheiro do Show da Física</BulletItem>
        <BulletItem>GT anti assédio (psicológico, professores, alunos e funcionários) ter treinamento da PRIP</BulletItem>
        <BulletItem>Discussão dos PPPs por um GT (ênfase na LIC e refazer o projeto pedagógico defasado)</BulletItem>
        <BulletItem><Marked color="yellow">Física 0 e bases matemáticas</Marked></BulletItem>
        <BulletItem><Marked color="yellow">Ar condicionado nas salas</Marked></BulletItem>
      </ul>

      <CategoryBadge>Espaços - Eixo 2</CategoryBadge>
      <ul className="list-disc list-inside space-y-1.5 ml-4 mb-4 mt-2">
        <BulletItem>Abertura da biblioteca e espaços de estudo (Méson Pi)</BulletItem>
        <BulletItem>Conforto térmico no instituto</BulletItem>
        <BulletItem><Marked color="red">Reabertura do bosque da física</Marked></BulletItem>
        <BulletItem><Marked color="yellow">Pisos táteis e políticas de inclusão e segurança (elevadores, incêndio, sala de descompressão)</Marked></BulletItem>
        <BulletItem><Marked color="yellow">HU ser capaz de realizar pronto atendimentos</Marked></BulletItem>
        <BulletItem><Marked color="yellow">Restabelecimento/revitalização da oca e vincular ela a creche oeste</Marked></BulletItem>
      </ul>

      <CategoryBadge>Orçamento - Eixo 4</CategoryBadge>
      <ul className="list-disc list-inside space-y-1.5 ml-4 mb-4 mt-2">
        <BulletItem>GT de dados fiscalizar dados de renda/PAPFE, mapear o que é permanência</BulletItem>
        <BulletItem><Marked color="yellow">GT de dados ver os fundos de investimento e se tem corrupção</Marked></BulletItem>
      </ul>

      <SectionDivider />

      {/* 2.3 Informações úteis */}
      <SectionTitle id="informacoes-uteis">2.3 <Marked color="gray">Informações úteis</Marked></SectionTitle>
      <div className="space-y-3 mb-8">
        <div className="flex items-start gap-3 bg-[#1a1f2e] rounded-lg p-4 border border-gray-700/40">
          <span className="text-secondary text-lg mt-0.5">⚠</span>
          <p className="text-gray-300 text-sm leading-relaxed">
            <Marked color="gray">Aulas online não podem ser ministradas segundo as normas da própria USP (lei da reitoria) (para pós até 20%);</Marked>
          </p>
        </div>
        <div className="flex items-start gap-3 bg-[#1a1f2e] rounded-lg p-4 border border-gray-700/40">
          <span className="text-secondary text-lg mt-0.5">⚠</span>
          <p className="text-gray-300 text-sm leading-relaxed">
            <Marked color="gray">Avaliação não pode ser aplicada durante piquetes;</Marked>
          </p>
        </div>
        <div className="flex items-start gap-3 bg-[#1a1f2e] rounded-lg p-4 border border-gray-700/40">
          <span className="text-primary text-lg mt-0.5">✓</span>
          <p className="text-gray-300 text-sm leading-relaxed">
            <Marked color="gray">Professores em sua maioria apoiam a greve e entendem que não é adequado dar aulas;</Marked>
          </p>
        </div>
        <div className="flex items-start gap-3 bg-secondary/10 rounded-lg p-4 border border-secondary/30">
          <span className="text-secondary text-lg mt-0.5">ℹ</span>
          <p className="text-gray-300 text-sm leading-relaxed">
            <Marked color="gray">O calendário pode ser estendido, já está sendo debatido isso em outros institutos até e já o ocorreu em greves passadas;</Marked>
          </p>
        </div>
      </div>

      <SectionDivider />

      {/* 2.4 Funcionamento da greve */}
      <SubSectionTitle id="funcionamento-da-greve">2.4 Funcionamento da greve</SubSectionTitle>
      <div className="space-y-4 text-gray-300 leading-relaxed mb-8">
        <p>
          <strong className="text-white">O Cefisma:</strong> é o CA da física e tem parte chave nisso tudo, visto que os CAs em geral representam os estudantes e seus interesses.
        </p>
        <p>
          <strong className="text-white">O Comando de Greve:</strong> organiza a greve de seus respectivos institutos, cada instituto que aderiu tem um comando e os diferentes comandos estão em contato constante. O comando foi votado em assembleia e o de agora é formado por pessoas do Cefisma, da atlética, do HS, de coletivos, do DCE, do CRUSP e pessoas independentes, sendo bem plural.
        </p>
        <p>
          <strong className="text-white">As Assembleias:</strong> são convocadas para tomadas de decisões. O comando e o Cefisma não decidem nada sozinhos; eles organizam as informações e as decisões chaves são tomadas por votação em assembleia.
        </p>
      </div>

      {/* 2.5 Como ajudar */}
      <SubSectionTitle id="como-ajudar">2.5 Como ajudar</SubSectionTitle>
      <p className="text-gray-300 mb-4">Formas de se somar às lutas sendo feitas. Greve não é férias!</p>
      <ul className="list-disc list-inside space-y-1.5 ml-4 mb-8 text-gray-300">
        <BulletItem>Vindo no piquete &quot;fazer ronda&quot;</BulletItem>
        <BulletItem>Ocupando o espaço, e não ficando em casa</BulletItem>
        <BulletItem>Participando das atividades de greve divulgadas</BulletItem>
        <BulletItem>Ajudar nos cartazes e na exposição que pretendemos fazer</BulletItem>
        <BulletItem>
          <Reference 
            id="1" 
            index={1} 
            title="Como lidar com a aparição de influencers de direita" 
            date="Guia de Conduta"
            url="/documentos/ifusp/comando-de-greve/influencers-de-direita"
          >
            Não engajar com pessoas que aparecem para fazer vídeos sensacionalistas
          </Reference>
        </BulletItem>
      </ul>

      <SectionDivider />

      {/* 2.6 Reuniões e atividades */}
      <SubSectionTitle id="reunioes-atividades">2.6 Reuniões e atividades até agora</SubSectionTitle>
      <ul className="space-y-4 mb-16">
        <ActivityItem date="Dia 17">
          <Reference 
            id="4" 
            index={4} 
            title="O que é o Comando de Greve" 
            date="17 de Outubro"
            url="/documentos/ifusp/comando-de-greve/o-que-e-o-comando"
          >
            Assembleia geral do IFUSP, onde foi votado e aprovado a greve. E também eleito o comando de greve do IFUSP.
          </Reference>
        </ActivityItem>
        <ActivityItem date="Dia 17">
          <Marked color="gray">Trancamento de todas as salas do IFUSP e ordens aos funcionários para que elas não fossem abertas e suas cadeiras usadas para piquetes, impedindo as aulas.</Marked>
        </ActivityItem>
        <ActivityItem date="Semana 20-24">
          <Marked color="gray">Piquetes elaborados e manutenção da mobilização no instituto.</Marked>
        </ActivityItem>
        <ActivityItem date="Dia 24">
          <Reference 
            id="2" 
            index={2} 
            title="Reunião com o comando de greve geral da USP" 
            date="24 de Outubro"
            url="/documentos/ifusp/comando-de-greve/reuniao-todos-comandos"
          >
            Reunião dos comandos de greve da USP.
          </Reference>
        </ActivityItem>
        <ActivityItem date="Dia 24">
          <Reference 
            id="3" 
            index={3} 
            title="Reunião com a Direção do IFUSP" 
            date="24 de Outubro"
            url="/documentos/ifusp/comando-de-greve/reuniao-direcao-ifusp"
          >
            Reuniões com a direção do IFUSP.
          </Reference>
        </ActivityItem>
      </ul>

      {/* Fontes Section */}
      <div className="mt-16 pt-8 border-t border-gray-800">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <LinkIcon size={20} className="text-primary" />
          Fontes e Documentos Relacionados
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {references.map((ref) => (
            <a 
              key={ref.id}
              id={`ref-${ref.id}`}
              href={ref.url}
              className="flex items-center gap-4 p-4 rounded-xl bg-[#1a1f2e] border border-gray-700/50 hover:border-primary/50 hover:bg-[#1e2538] transition-all group scroll-mt-24"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary group-hover:bg-primary group-hover:text-white transition-all">
                {ref.id}
              </div>
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                {ref.title}
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

function ApresentacaoCentralContent() {
  return (
    <>
      {/* Imagem de Capa */}
      <div className="relative w-full aspect-video md:aspect-[21/9] mb-8 rounded-2xl overflow-hidden border border-gray-800 bg-[#09090b] flex items-center justify-center">
        <img 
          src="/assets/apresentacao-hub.jpg" 
          alt="Apresentação Central" 
          className="object-contain w-full h-full p-4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/80 to-transparent pointer-events-none" />
      </div>
      <div className="bg-[#1a1f2e] p-4 text-center border-t border-gray-700/50 mb-10">
        <p className="text-gray-400 text-sm">
          Feito pelo comando de greve para melhorar a comunicação durante a greve.
        </p>
      </div>

      {/* Sumário */}
      <div className="bg-[#1a1f2e] border border-gray-700/50 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          Sumário
        </h2>
        <nav className="space-y-1.5">
          {APRESENTACAO_CENTRAL.sumario.map((item) => (
            <a
              key={item.anchor}
              href={`#${item.anchor}`}
              className="block text-sm transition-colors hover:text-secondary font-semibold text-gray-300"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <SectionTitle id="projeto-resumo">O projeto em poucas palavras</SectionTitle>
      <p className="text-gray-300 leading-relaxed mb-6">
        A Central da Greve (CG) é uma plataforma digital, um aplicativo que roda direto no navegador, construído para melhorar a comunicação e a organização durante o período de mobilização. O projeto segue a filosofia de software livre (open source) e foi projetado para ser uma ferramenta centralizadora de informações, pautas e suporte à comunidade acadêmica em greve, com todo o código-fonte disponível publicamente.
      </p>

      <SectionDivider />

      <SectionTitle id="introducao">1. Introdução</SectionTitle>
      <p className="text-gray-300 leading-relaxed mb-6">
        A Central da Greve (CG) é uma frente tecnológica do movimento de mobilização do IFUSP. Seu objetivo é transformar a forma como a comunicação da greve é realizada, tanto internamente (na relação entre alunos e comando) quanto na relação entre a universidade e a sociedade, buscando dar transparência e agilidade às pautas e ações do movimento.
      </p>

      <SectionTitle id="o-que-e">2. O que é</SectionTitle>
      <p className="text-gray-300 leading-relaxed mb-4">
        A Central da Greve (CG) é uma plataforma digital do tipo WebApp. Ele não se limita a ser uma rede social de notícias, mas uma ferramenta de organização política e acadêmica. Trata-se de uma plataforma que estende o alcance das assembleias para o ambiente digital, incentivando a participação ativa e o entendimento profundo das causas defendidas.
      </p>
      <p className="text-gray-300 leading-relaxed mb-6">
        A plataforma oferece ferramentas específicas: acompanhamento de pautas, calendários de mobilização, manuais de greve e suporte para que alunos não percam o vínculo com o instituto.
      </p>

      <SectionTitle id="equipe">3. Equipe</SectionTitle>
      <p className="text-gray-300 leading-relaxed mb-4">
        A governança da plataforma é conduzida por uma equipe técnica em colaboração com o Comando de Greve:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-2 mb-6">
        <BulletItem><strong>Moderação e Curadoria:</strong> Responsáveis por garantir que as informações publicadas sejam verídicas e alinhadas às decisões das assembleias.</BulletItem>
        <BulletItem><strong>Produção de Conteúdo:</strong> Equipe de comunicação que traduz as pautas em materiais acessíveis (textos, vídeos, artes).</BulletItem>
      </ul>

      <SectionTitle id="objetivos">4. Objetivos e Como</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {[
          "Criar um espaço digital para reunir informações da greve",
          "Fornecer atualizações constantes sobre a mobilização",
          "Prover uma Wiki de protocolos e pautas centralizada",
          "Elaborar um mapa interativo de atividades e piquetes",
          "Preservar a memória do movimento estudantil/docente",
          "Fornecer ferramentas de apoio ao estudante",
          "Permitir a expressão individual e troca de experiências",
          "Humanizar a luta política e acadêmica",
          "Promover a inclusão e acessibilidade no movimento",
          "Fornecer compreensão sistêmica das pautas",
          "Diminuir a distância entre Comando e Sociedade",
          "Introduzir as frentes de atuação e comissões",
          "Respeitar as boas práticas de segurança digital",
          "Centralizar assembleias, eventos e iniciativas"
        ].map((obj, i) => (
          <div key={i} className="bg-[#1a1f2e] p-4 rounded-lg border border-gray-700/30 flex items-start gap-3">
            <span className="text-secondary font-bold">4.{i+1}</span>
            <p className="text-sm text-gray-300 leading-tight">{obj}</p>
          </div>
        ))}
      </div>

      <SectionTitle id="estrutura-abas">5. Estrutura de Abas</SectionTitle>
      <p className="text-gray-300 leading-relaxed mb-6">
        A plataforma é organizada em seções intuitivas que facilitam o acesso à informação, desde o fluxo de posts da comunidade até as ferramentas específicas do Comando de Greve (CGIF).
      </p>

      <SectionTitle id="organizacao-layout">6. Organização e Layout</SectionTitle>
      <p className="text-gray-300 leading-relaxed mb-6">
        O design prioriza a rapidez na entrega da informação e a facilidade de navegação, com uma arquitetura moderna e responsiva adaptada para dispositivos móveis.
      </p>

      <SectionTitle id="necessidade">7. Por que a Central é necessária?</SectionTitle>
      <p className="text-gray-300 leading-relaxed mb-4">
        A comunicação em tempos de greve costuma ser caótica e espalhada. A Central responde a três necessidades urgentes:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4 mb-6">
        <BulletItem><strong>Combate à Desinformação:</strong> Centralização de fontes oficiais.</BulletItem>
        <BulletItem><strong>Manutenção da Comunidade:</strong> Evitar o isolamento dos alunos.</BulletItem>
        <BulletItem><strong>Transparência:</strong> Demonstrar claramente os motivos da greve para a sociedade.</BulletItem>
      </ul>

      <SectionDivider />

      <SectionTitle id="parte-tecnica">9. Parte Técnica</SectionTitle>
      <p className="text-gray-300 leading-relaxed mb-6">
        A arquitetura utiliza TypeScript, Next.js e Supabase. A performance é otimizada para redes móveis, garantindo que o usuário consiga acessar informações críticas mesmo em condições de internet limitada dentro do campus.
      </p>

      <SectionTitle id="conclusao">10. Conclusão</SectionTitle>
      <p className="text-gray-300 leading-relaxed mb-6">
        A Central da Greve (CG) representa um marco na organização digital dos movimentos universitários. Ao unir tecnologia de ponta com pautas sociais, ela consolida a infraestrutura necessária para uma mobilização moderna, inclusiva e tecnicamente robusta.
      </p>
    </>
  );
}

function OQueEComandoContent() {
  return (
    <>
      <SectionTitle id="definicao">O que é o Comando de Greve?</SectionTitle>
      <p className="text-gray-300 leading-relaxed mb-6">
        O comando de greve é votado em assembleia e nela cada instituto/faculdade tem direito a 1 representante em seu comando a cada 15 alunos presentes na assembleia. 
      </p>
      
      <p className="text-gray-300 leading-relaxed mb-4">
        Seu papel é além de <Marked color="yellow">representar os estudantes</Marked> daquele espaço no período de greve também comandar a mesma das seguintes formas:
      </p>

      <ul className="list-disc list-inside space-y-2 ml-4 mb-8 text-gray-300">
        <BulletItem>Organizar</BulletItem>
        <BulletItem>Dirigir o processo</BulletItem>
        <BulletItem>Mobilizar</BulletItem>
        <BulletItem>Negociar as pautas</BulletItem>
        <BulletItem>Construir um calendário</BulletItem>
        <BulletItem>Puxar assembleias</BulletItem>
        <BulletItem>Compor um comando de greve geral da USP (formado por todos os comandos que compõem a universidade)</BulletItem>
      </ul>
    </>
  );
}

function LidarInfluencersContent() {
  return (
    <>
      <SectionTitle id="introducao-influencers">Protocolo de Conduta</SectionTitle>
      <p className="text-gray-300 leading-relaxed mb-6">
        Com a infeliz realidade recente do aparecimento, cada vez mais comum, de políticos e &quot;influencers&quot; da extrema-direita nos espaços estudantis, cresce a necessidade de medidas comuns a serem tomadas com essa possibilidade nos espaços ifuspianos. Na tentativa de usar a revolta estudantil como conteúdo para fortalecerem suas bases e suas redes sociais, fica claro que a postura tem que ser <strong className="text-white">&quot;não dar palco para maluco&quot;</strong>.
      </p>

      <p className="text-gray-300 leading-relaxed mb-6">
        Como em quaisquer situações já enfrentadas nessa e em outras greves passadas, no primeiro contato, é primordial o diálogo para tentar mitigar o conflito. Apesar disso, ainda mais com o exemplo que tivemos anteriormente com o &quot;influencer&quot; Victor Ruiz e o vereador Lucas Pavanato, é claro que o conflito é o desejo deles. Dessa forma, é importante não só estarmos já anteriormente munidos de argumentos para a tentativa de diálogo, mas também de artifícios para impossibilitar os desejos de conflito de tais personagens políticos.
      </p>

      <SubSectionTitle id="medidas">Medidas a serem tomadas</SubSectionTitle>
      <div className="space-y-4 mb-10">
        <div className="flex gap-4 bg-[#1a1f2e] p-4 rounded-lg border border-gray-800">
          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold shrink-0">1</div>
          <p className="text-gray-300 text-sm"><strong>Uso de Sons Altos:</strong> O uso de sons altos que impossibilitem a produção de conteúdo midiático dessas pessoas, com músicas com copyright (ex: músicas da Disney).</p>
        </div>
        <div className="flex gap-4 bg-[#1a1f2e] p-4 rounded-lg border border-gray-800">
          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold shrink-0">2</div>
          <p className="text-gray-300 text-sm"><strong>Minimizar Interações:</strong> Tentar ao máximo minimizar interações e diálogos posteriores (que já tomem posturas agressivas).</p>
        </div>
        <div className="flex gap-4 bg-[#1a1f2e] p-4 rounded-lg border border-gray-800">
          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold shrink-0">3</div>
          <p className="text-gray-300 text-sm"><strong>Piquete Humano:</strong> Caso seja necessário, realizar um piquete humano, formado por uma &quot;corrente&quot; de pessoas para impedir a passagem dessas pessoas, especialmente ao espaço do piquete.</p>
        </div>
        <div className="flex gap-4 bg-[#1a1f2e] p-4 rounded-lg border border-gray-800 border-red-500/30 bg-red-900/10">
          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 font-bold shrink-0">!</div>
          <p className="text-gray-300 text-sm"><strong>Seguranças Armados:</strong> É comum eles terem a companhia de seguranças armados, não sejam agressivos. Vamos evitar uma tragédia maior que a pura presença deles no piquete.</p>
        </div>
      </div>
    </>
  );
}

export default function DocumentoPage({ params }: { params: { slug: string[] } }) {
  const slugKey = params.slug.join("/");
  const entry = DOCUMENT_MAP[slugKey];

  if (!entry) {
    notFound();
  }

  const context = params.slug.slice(0, -1).join(" / ").toUpperCase();

  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex flex-1 overflow-hidden px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="flex-1 overflow-y-auto pr-4 sm:pr-8 pb-32 pt-4 max-w-4xl">
          {/* Breadcrumb */}
          <div className="mb-4 text-xs font-semibold text-gray-500 tracking-wider">
            DOCUMENTOS DA CENTRAL &gt; {context}
          </div>

          {/* Título do documento */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                DOC
              </span>
              <span className="text-xs text-gray-500">Comando de Greve — IFUSP</span>
            </div>
            <h1 className="text-primary font-bold text-3xl sm:text-4xl">
              {entry.title}
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-3" />
          </div>

          {/* Aviso de Elaboração */}
          <div className="mb-10 p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex items-center gap-4 group hover:bg-amber-500/10 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <AlertTriangle className="text-amber-500" size={20} />
            </div>
            <p className="text-sm text-amber-200/60 leading-relaxed font-medium">
              Este documento ainda está sendo elaborado pelo comando de greve e pode sofrer alterações.
            </p>
          </div>

          {/* Conteúdo do documento */}
          {entry.key === "informacoes-sobre-a-greve" && <InformacoesGreveContent />}
          {entry.key === "apresentacao-do-hub" && <ApresentacaoCentralContent />}
          {entry.key === "reuniao-direcao-ifusp" && <ReuniaoDirecaoIfuspContent />}
          {entry.key === "reuniao-todos-comandos" && <ReuniaoTodosComandosContent />}
          {entry.key === "reunioes-comando-kaline" && <ReunioesKalineContent />}
          {entry.key === "documento-assinatura-kaline" && <AssinaturaKalineContent />}
          {entry.key === "o-que-e-o-comando" && <OQueEComandoContent />}
          {entry.key === "influencers-de-direita" && <LidarInfluencersContent />}

          {/* Seção de Referências (CG V1.0) */}
          <div className="mt-20 pt-10 border-t border-gray-800">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <FileCheck size={20} className="text-primary" />
              Documentação Oficial
            </h3>
            <p className="text-sm text-gray-500 italic mb-4">
              Consulte os documentos oficiais e atas de assembleia para informações detalhadas e segurança jurídica.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReferenceItem({ id, index, title, url }: { id: string; index: number; title: string; url: string }) {
  return (
    <a 
      id={`ref-${id}`}
      href={url}
      className="flex flex-col p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-primary/30 transition-all group scroll-mt-24"
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-black text-primary uppercase tracking-widest">{id}</span>
        <span className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center text-[10px] font-bold text-secondary">
          {index}
        </span>
      </div>
      <span className="text-sm text-gray-300 group-hover:text-white transition-colors line-clamp-1">{title}</span>
    </a>
  );
}

function ReunioesKalineContent() {
  return (
    <>
      <SectionTitle id="reunioes-kaline">Informações sobre as reuniões com Kaline</SectionTitle>
      <div className="bg-[#1a1f2e] border border-gray-700/50 rounded-xl p-8 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
            <Users size={24} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Diálogo Institucional</h3>
            <p className="text-sm text-gray-400">Pautas de permanência e apoio estudantil</p>
          </div>
        </div>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          As reuniões com a representante Kaline focaram na viabilização das pautas de permanência que foram apresentadas na carta de reivindicações. Houve um debate extenso sobre a aplicação dos recursos e a transparência nos processos de auxílio.
        </p>

        <ul className="space-y-4">
          <BulletItem>
            <strong className="text-secondary">Eixo de Permanência:</strong> Discussão sobre o aumento do PAPFE e a isonomia no tratamento de bolsistas.
          </BulletItem>
          <BulletItem>
            <strong className="text-secondary">Transparência:</strong> Solicitação de abertura de dados sobre a fila de espera do CRUSP.
          </BulletItem>
        </ul>
      </div>
    </>
  );
}

function AssinaturaKalineContent() {
  return (
    <>
      <SectionTitle id="documento-assinatura">Documento de não perseguição que a kaline (diretora do IF assinou)</SectionTitle>
      <div className="bg-gray-900/50 border border-dashed border-gray-700 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <PenTool size={32} className="text-primary" />
        </div>
        <h3 className="text-2xl font-black text-white mb-4">Formalização das Pautas</h3>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          Este documento representa o compromisso formal assinado durante as negociações, detalhando os prazos para resposta da Reitoria.
        </p>
        
        <div className="bg-[#121212] border border-gray-800 rounded-xl p-6 w-full max-w-sm text-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Documento Verificado</span>
          </div>
          <p className="text-sm text-gray-300 italic border-l-2 border-primary pl-4 mb-6">
            "Comprometemo-nos a analisar a viabilidade orçamentária para o reajuste das bolsas de monitoria até o próximo conselho..."
          </p>
          <button className="w-full py-3 bg-primary/20 text-primary border border-primary/30 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
            Baixar Cópia Digitalizada (PDF)
          </button>
        </div>
      </div>
    </>
  );
}

function ReuniaoDirecaoIfuspContent() {
  return (
    <>
      <SectionTitle id="reuniao-direcao">Informações sobre a reunião com a direção do IFUSP</SectionTitle>
      <div className="bg-[#1a1f2e] border border-gray-700/50 rounded-xl p-8 mb-8">
        <h3 className="text-xl font-bold text-white mb-6">Pontos principais discutidos:</h3>
        <ul className="space-y-4 list-disc pl-5">
          <BulletItem>
            <strong className="text-primary">Ameaça de aulas:</strong> A diretoria sinalizou a intenção de considerar aulas como dadas, o que implicaria falta para todos os alunos ausentes.
          </BulletItem>
          <BulletItem>
            <strong className="text-primary">Calendário Acadêmico:</strong> Houve afirmações de que o calendário seria imutável, apesar de precedentes históricos mostrarem que o calendário é mutável e já foi alterado em greves anteriores.
          </BulletItem>
          <BulletItem>
            <strong className="text-primary">Incentivo ao Conflito:</strong> Observou-se um incentivo para que alunos contrários à greve se posicionem contra as decisões tomadas em assembleia pelo Centro Acadêmico (CA).
          </BulletItem>
        </ul>
      </div>
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
        <p className="text-yellow-200 text-sm italic">
          Nota: Este documento contém um resumo dos pontos críticos levantados pelo Comando de Greve.
        </p>
      </div>
    </>
  );
}

function ReuniaoTodosComandosContent() {
  return (
    <>
      <SectionTitle id="reuniao-comandos">Informações sobre a reunião com o comando de greve geral da USP</SectionTitle>
      <div className="bg-[#1a1f2e] border border-gray-700/50 rounded-xl p-8 mb-8">
        <h3 className="text-xl font-bold text-white mb-6">Pontos principais e votações:</h3>
        <ul className="space-y-6">
          <BulletItem>
            <strong className="text-primary block mb-1 uppercase text-xs tracking-widest">Representação na Reitoria</strong>
            <p className="text-gray-300 leading-relaxed">
              Votação de quais serão os comandos que terão representantes na reunião com o reitor na terça-feira.
            </p>
          </BulletItem>
          
          <BulletItem>
            <strong className="text-primary block mb-1 uppercase text-xs tracking-widest">Quórum de Representantes</strong>
            <p className="text-gray-300 leading-relaxed">
              Votação de quantos serão os representantes enviados para a mesa de negociação.
            </p>
          </BulletItem>
          
          <BulletItem>
            <strong className="text-primary block mb-1 uppercase text-xs tracking-widest">Próxima Reunião</strong>
            <p className="text-gray-300 leading-relaxed">
              Votação da próxima reunião do comando após a reunião de terça, agendada para a próxima quarta-feira.
            </p>
          </BulletItem>
        </ul>
      </div>
      
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
        <p className="text-gray-400 text-sm italic">
          Nota: Estas decisões foram tomadas de forma coletiva entre os comandos de greve presentes na reunião geral da USP.
        </p>
      </div>
    </>
  );
}
