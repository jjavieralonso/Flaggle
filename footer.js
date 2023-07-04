// agregar en html <meta name="viewport" content="width=device-width, initial-scale=1.0"> Meta para que sea responsive.
// agregar en html <script src="footer.js"></script>
// agregar en html <footer id="footer"></footer>
function generarFooter() {
    const footer = document.getElementById('footer');

    const linkedinLink = crearEnlace('https://www.linkedin.com/in/javier-alonso-502a59205/', '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-linkedin" width="36" height="36" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M8 11l0 5"></path><path d="M8 8l0 .01"></path><path d="M12 16l0 -5"></path><path d="M16 16v-3a2 2 0 0 0 -4 0"></path></svg>');
    const githubLink = crearEnlace('https://github.com/jjavieralonso', '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-github" width="36" height="36" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path></svg>');
    const repoLink = crearEnlace('https://jjavieralonso.github.io/portfolio/', '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-briefcase" width="36" height="36" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path><path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2"></path><path d="M12 12l0 .01"></path><path d="M3 13a20 20 0 0 0 18 0"></path></svg>');

    const proyectName = nombreProyecto();

    footer.appendChild(proyectName);
    footer.appendChild(linkedinLink);
    footer.appendChild(githubLink);
    footer.appendChild(repoLink);

    const mediaQuery = window.matchMedia('(max-width: 700px)');
    handleMediaQuery(mediaQuery);
    mediaQuery.addListener(handleMediaQuery);

    function handleMediaQuery(mediaQuery) {
        footer.style.backgroundColor = '#1C1C1C';
        footer.style.minHeight = '75px';
        footer.style.minWidth = '100%';
        footer.style.position = 'absolute';
        footer.style.bottom = '0';
        footer.style.right = '0';
        footer.style.display = 'flex';
        footer.style.alignItems = 'center';
        footer.style.justifyContent = 'center';
        footer.style.borderRadius = '10px 10px 0px 0px';
    }
}

function crearEnlace(url, icono) {
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.target = '_blank';
    enlace.innerHTML = icono;
    enlace.style.color = 'white';
    return enlace;
}
function nombreProyecto() {
    const nombreProyecto = document.createElement('p');
    nombreProyecto.textContent = 'Flaggle' //<---- Cambia el nombre del proyecto
    nombreProyecto.style.textDecoration = 'overline';
    nombreProyecto.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    nombreProyecto.style.color = 'white';
    nombreProyecto.style.fontSize = '20px'
    nombreProyecto.style.marginRight = '35px'

    return nombreProyecto;
}

generarFooter();