# 🚀 Guia de Deploy - Smart Ilha

## 📋 Checklist Pré-Deploy

### ✅ Preparação Local
- [ ] Node.js instalado (versão 18+)
- [ ] Dependências instaladas (`npm install`)
- [ ] Código testado localmente (`npm run dev`)
- [ ] Build testado (`npm run build`)

### ✅ Configuração do Projeto
- [ ] `next.config.mjs` configurado para export estático
- [ ] `suppressHydrationWarning` adicionado ao layout
- [ ] Imagens otimizadas (`unoptimized: true`)

## 🔧 Como Fazer o Deploy

### 1. Executar o Script de Deploy
\`\`\`bash
# Dar permissão ao script
chmod +x deploy.sh

# Executar deploy
npm run deploy
# ou
./deploy.sh
\`\`\`

### 2. Verificar o Build
Após o script, verifique se foi criada a pasta `out/` com:
- ✅ `index.html`
- ✅ `checkout2/index.html`
- ✅ Pasta `_next/` com chunks JS/CSS
- ✅ Arquivo `.htaccess`

### 3. Upload para o Servidor

#### Via FTP/SFTP:
\`\`\`bash
# Exemplo com rsync
rsync -avz --delete out/ usuario@servidor:/caminho/do/site/

# Exemplo com scp
scp -r out/* usuario@servidor:/caminho/do/site/
\`\`\`

#### Via cPanel/Painel de Controle:
1. Acesse o gerenciador de arquivos
2. Navegue até a pasta `public_html` (ou equivalente)
3. **DELETE todos os arquivos antigos**
4. Faça upload de **TODO** o conteúdo da pasta `out/`

## 🔧 Configuração do Servidor

### Apache (.htaccess)
O arquivo `.htaccess` já está incluído na pasta `out/` após o build.

### Nginx
Use o arquivo `nginx.conf` fornecido e adapte os caminhos:
\`\`\`bash
# Copiar configuração
sudo cp nginx.conf /etc/nginx/sites-available/smartilha
sudo ln -s /etc/nginx/sites-available/smartilha /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
\`\`\`

## 🧪 Teste Pós-Deploy

### ✅ Verificações Essenciais
- [ ] Site carrega sem erro 404
- [ ] Console do navegador sem erros
- [ ] Página inicial funciona
- [ ] Página `/checkout2` funciona
- [ ] Imagens carregam corretamente
- [ ] Vídeos funcionam
- [ ] Formulários funcionam
- [ ] Links internos funcionam

### 🔍 Debug de Problemas

#### Erro 404 em arquivos JS/CSS:
\`\`\`bash
# Verificar se os arquivos existem
ls -la /caminho/do/site/_next/static/

# Verificar permissões
chmod -R 755 /caminho/do/site/
\`\`\`

#### Erro de CORS em imagens:
- Verificar se `unoptimized: true` está no next.config.mjs
- Verificar se as URLs das imagens estão corretas

#### Página em branco:
- Verificar console do navegador
- Verificar se `index.html` existe
- Verificar configuração do servidor

## 📊 Monitoramento

### Logs do Servidor
\`\`\`bash
# Apache
tail -f /var/log/apache2/access.log
tail -f /var/log/apache2/error.log

# Nginx
tail -f /var/log/nginx/smartilha_access.log
tail -f /var/log/nginx/smartilha_error.log
\`\`\`

### Ferramentas de Teste
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **Lighthouse**: Ferramenta do Chrome DevTools

## 🚨 Solução de Problemas Comuns

### ChunkLoadError
\`\`\`bash
# Limpar cache e rebuild
rm -rf out .next node_modules/.cache
npm install
npm run build
\`\`\`

### Erro de Hidratação
- Verificar se `suppressHydrationWarning` está no layout
- Verificar se não há diferenças entre servidor e cliente

### Imagens não carregam
- Verificar URLs das imagens
- Verificar se `unoptimized: true` está configurado
- Verificar permissões dos arquivos

## 📞 Suporte

Se encontrar problemas:
1. Verificar logs do servidor
2. Verificar console do navegador
3. Testar localmente primeiro
4. Verificar se todos os arquivos foram enviados

---

**Última atualização**: $(date)
**Versão do Next.js**: 14.2.3
