# Buscador de Países

Proyecto estático de una aplicación web para buscar países.

## Descripción

- Solo HTML, CSS y JavaScript
- Usa `data.json` como fuente de datos local
- Compatible con hosting estático como Netlify o GitHub Pages
- Rutas relativas para funcionar desde cualquier URL pública

## Archivos principales

- `index.html`
- `style.css`
- `script.js`
- `data.json`

## Requisitos

- Ningún backend
- Sin dependencias externas
- Funciona como sitio estático

## Cómo probar localmente

Si quieres ver la aplicación en tu navegador local, ejecuta un servidor estático simple desde la carpeta del proyecto:

```bash
cd /home/eric/Descargas/Eric.S/Mundial
python3 -m http.server 8000
```

Luego abre:

```text
http://localhost:8000
```

## Despliegue en Netlify

1. Crea un nuevo sitio en Netlify
2. Sube la carpeta del proyecto o conecta tu repositorio
3. Configura el directorio de publicación como `.`
4. No se necesita comando de build

## Despliegue en GitHub Pages

1. Crea un repositorio GitHub con estos archivos
2. Activa GitHub Pages desde la configuración del repositorio
3. Selecciona la rama principal y la carpeta raíz `/`
4. Al publicar, `index.html` se cargará correctamente

## Notas

- `data.json` se carga con una ruta relativa desde `index.html`
- La aplicación está lista para funcionar en entornos estáticos
