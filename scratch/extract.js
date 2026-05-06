const JSZip = require('jszip');
const fs = require('fs');
const path = require('path');

async function extractZip(zipPath, outMdPath) {
  try {
    const data = fs.readFileSync(zipPath);
    const zip = await JSZip.loadAsync(data);
    
    for (const [filename, fileData] of Object.entries(zip.files)) {
      if (filename.endsWith('.html')) {
        let html = await fileData.async('string');
        
        // Very basic HTML to Markdown
        html = html.replace(/<head>.*?<\/head>/gs, '');
        html = html.replace(/<style>.*?<\/style>/gs, '');
        
        // Headings
        html = html.replace(/<h1.*?>(.*?)<\/h1>/gs, '\n# $1\n');
        html = html.replace(/<h2.*?>(.*?)<\/h2>/gs, '\n## $1\n');
        html = html.replace(/<h3.*?>(.*?)<\/h3>/gs, '\n### $1\n');
        html = html.replace(/<h4.*?>(.*?)<\/h4>/gs, '\n#### $1\n');
        
        // Paragraphs
        html = html.replace(/<p.*?>(.*?)<\/p>/gs, '\n$1\n');
        
        // Bold / Italic
        html = html.replace(/<span style="font-weight:700.*?">(.*?)<\/span>/gs, '**$1**');
        html = html.replace(/<strong.*?>(.*?)<\/strong>/gs, '**$1**');
        html = html.replace(/<em.*?>(.*?)<\/em>/gs, '*$1*');
        
        // Lists
        html = html.replace(/<li.*?>(.*?)<\/li>/gs, '- $1\n');
        html = html.replace(/<ul.*?>/gs, '\n');
        html = html.replace(/<\/ul>/gs, '\n');
        
        // Clean tags
        html = html.replace(/<[^>]+>/g, '');
        
        // Decode entities
        html = html.replace(/&nbsp;/g, ' ');
        html = html.replace(/&quot;/g, '"');
        html = html.replace(/&lt;/g, '<');
        html = html.replace(/&gt;/g, '>');
        html = html.replace(/&amp;/g, '&');
        html = html.replace(/&#39;/g, "'");

        // Clean extra newlines
        html = html.replace(/\n{3,}/g, '\n\n');
        
        fs.writeFileSync(outMdPath, html.trim());
        console.log(`Extracted to ${outMdPath}`);
        return;
      }
    }
  } catch (e) {
    console.error(e);
  }
}

async function run() {
  await extractZip(
    path.join(__dirname, '../public/Documentos PG (Portal da greve)/A SEMANA DECISIVA DA GREVE.zip'),
    path.join(__dirname, '../public/Documentos PG (Portal da greve)/a-semana-decisiva.md')
  );
  
  await extractZip(
    path.join(__dirname, '../public/Documentos PG (Portal da greve)/IFUSP/Emails enviados/Resposta do Comando de greve ao email da direção do IFUSP.zip'),
    path.join(__dirname, '../public/Documentos PG (Portal da greve)/IFUSP/Emails enviados/resposta-comando.md')
  );
}

run();
