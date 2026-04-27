# Proposta de Arquitetura e Integração: Central da Greve (CG) V1.0

ter tambem os documentos de reunioes comando e kakline e tambem o documento que kaline teve de assinar
A evolução da Central da Greve (CG) deve priorizar a centralização da informação e a rastreabilidade acadêmica, transformando a plataforma em uma central de documentação e comunicação científica robusta e de alta performance.

## 1. Módulo de Calendário Acadêmico e Eventos
A implementação de uma seção de calendário permitirá a visualização temporal de atividades, prazos burocráticos (como editais PUB/AEX) e eventos.

* **Localização:** Uma nova rota `/calendario` ou um componente *Sticky* na Dashboard principal.
* **Integração:** Sincronização via API para que as atualizações reflitam automaticamente na interface sem necessidade de *hardcode*.

## 2. Sistema de Referenciamento e Gestão de Ofícios
Para garantir o rigor técnico na comunicação da GREVE, a Central implementará um sistema de hiperlinks cruzados entre documentos explicativos e documentos oficiais normativos.

| Recurso | Descrição Técnica | Implementação |
| :--- | :--- | :--- |
| **Referência de Ofícios** | Citações diretas a documentos administrativos. | Componente de `<Tooltip>` ou *Hover Card* com metadados do ofício no texto. |
| **Seção de Referências** | Listagem ao final de cada documento explicativo. | Array de objetos no banco de dados mapeando `id_doc` para `url_documento`. |
| **Acesso Direto** | Clique nas referências com redirecionamento ao arquivo. 

## 3. Integração de Mídia: Mini-Player de Redes Sociais
A fim de aumentar o engajamento de divulgação científica sem comprometer o *Cumulative Layout Shift* (CLS) ou o tempo de carregamento da página no Next.js.

* **Arquitetura:** Uso de *thumbnails* estáticas (capas dos posts) com sobreposição visual (*overlay*) de um ícone de reprodução ou link externo.
* **Comportamento:** O player real (iframe) ou o redirecionamento só será acionado via interação do usuário, evitando o download de scripts de rastreamento no carregamento inicial da página.
* **Estética:** *Grid* responsiva utilizando Tailwind CSS, mantendo a proporção de aspecto (1:1 ou 4:5) característica da rede social.

---

## Estrutura Lógica de Navegação

A hierarquia de informação e rotas da plataforma operará sob a seguinte matriz estrutural:

$$
\text{Central (CG)} \rightarrow 
\begin{cases} 
\text{Dashboard} & \rightarrow \text{Calendário Dinâmico} \\
\text{Documentação} & \rightarrow \text{Textos Explicativos} \xrightarrow{\text{ref}} \text{Ofícios (Drive)} \\
\text{Comunicação} & \rightarrow \text{Feed Social (Instagram Mini-player)} 
\end{cases}
$$

## Benefícios de Implementação

1. **Escalabilidade Documental:** O uso de referências estruturadas facilita a manutenção de documentos e a atualização de versões sem gerar links quebrados.
2. **Scannability:** O calendário e o mini-player permitem que o usuário absorva informações rapidamente por via visual, enquanto o acesso aos ofícios atende à necessidade de aprofundamento técnico.
3. **Eficiência de Hardware:** Ao tratar as mídias externas como miniaturas carregadas sob demanda (*Lazy Loading*), a aplicação preserva a memória RAM do dispositivo do usuário final e mantém altas pontuações de acessibilidade e velocidade.

