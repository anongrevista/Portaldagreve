const fs = require('fs');
const JSZip = require('jszip');
const path = require('path');

async function processFile(filename) {
    const filePath = path.join('/home/stangorlini/PG - Portal da greve/public/Documentos PG (Portal da greve)', filename);
    const data = fs.readFileSync(filePath);
    const zip = await JSZip.loadAsync(data);
    const htmlFileName = Object.keys(zip.files).find(name => name.endsWith('.html'));
    let html = await zip.files[htmlFileName].async('text');
    
    // Strip styles
    html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    
    // Replace headings and list items for basic readability
    html = html.replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi, '\n\n# $1\n\n');
    html = html.replace(/<li[^>]*>(.*?)<\/li>/gi, '\n- $1');
    html = html.replace(/<p[^>]*>(.*?)<\/p>/gi, '\n$1\n');
    
    // Strip remaining tags
    let text = html.replace(/<[^>]+>/g, '');
    
    // Decode html entities roughly
    text = text.replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    
    // Cleanup newlines
    text = text.replace(/\n\s*\n/g, '\n\n');
    
    fs.writeFileSync(`scratch/${filename}.txt`, text);
    console.log(`Saved scratch/${filename}.txt`);
}

async function main() {
    await processFile('Apresentação do Portal da Greve o (PG).zip');
    await processFile('Glossário da greve .zip');
    await processFile('Informações sobre a greve.zip');
}

main().catch(console.error);
