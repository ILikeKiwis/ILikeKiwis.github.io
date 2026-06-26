# ILikeKiwis.github.io

Landing page personal para usar como enlace en CV y LinkedIn. Esta web esta creada con Astro + Tailwind y usa archivos JSON para que sea facil editar el perfil y los proyectos destacados.

La version por defecto esta en ingles en `/`. La version en espanol esta en `/es/`.

## Editar contenido

- Perfil, enlaces y texto principal: `src/data/profile.json`
- Proyectos destacados: `src/data/projects.json`
- Si quieres incluir tu CV, coloca el archivo como `public/cv.pdf` o cambia `cvUrl` en el perfil.
- Para editar idiomas, cambia los bloques `en` y `es` de esos JSON.

## Ejecutar en local

```bash
pnpm install
pnpm run dev
```

## Sincronizar datos publicos de GitHub

La pagina no depende de la API de GitHub para cargar, asi evita rate limits en visitantes. Si quieres actualizar metadatos publicos de tus repositorios, edita la lista de repos en `src/data/projects.json` y ejecuta:

```bash
pnpm run sync:github
```

Para tener mas limite de peticiones, puedes usar un token:

```bash
GITHUB_TOKEN=tu_token npm run sync:github
```

## Desplegar en GitHub Pages

Tu configuracion actual de GitHub Pages puede quedarse como:

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/(root)`

Para esa configuracion, este proyecto exporta una copia estatica a la raiz del repo:

```bash
pnpm run export:pages
```

Despues solo tienes que subir los cambios a `main`. GitHub Pages servira `index.html` y la carpeta `_astro/` directamente desde la raiz.
