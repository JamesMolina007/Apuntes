import './assets/CSS/indexStyle.css'
import { useHistory } from 'react-router-dom'
function Principal(){
    let history = useHistory();
    var perfil;
    function append(apunte, hoy, tags, likes, dislikes, subir, correo, usuario, div, idNum  ){
        console.log(apunte + " -> " + hoy + " -> " + tags + " -> " + likes + " -> " + dislikes);
        if(apunte && tags){
            const contenedor = document.getElementById(div);
            const publicacion = document.createElement('div');
            var carta = document.createElement('div');
            carta.className = "card";
            var cuerpoCarta = document.createElement('div');
            cuerpoCarta.className = "card-body";
            var textoCarta = document.createElement('p');
            textoCarta.className = "card-text";
            textoCarta.innerHTML = apunte;
            var tag = document.createElement('button');
            tag.className = "btn mt-2"
            cuerpoCarta.appendChild(textoCarta);
            carta.appendChild(cuerpoCarta);
            var tagsN = tags.split(";");
            for (var i = 0; i < tagsN.length; i++) {
                var tag_1 = document.createElement('span');
                tag_1.className = "tag_1";
                tag_1.innerHTML = tagsN[i];
                console.log(tag_1);
                tag.appendChild(tag_1);
            }
            publicacion.className = "container container_p rounded w-50 shadow my-3 py-3 contenerPublicacion";
            var us = document.createElement('label');
            var fa = document.createElement('label');
            fa.innerHTML = hoy;
            fa.className = "lbl d-block";
            us.innerHTML = usuario;
            us.className = "lbl";
            publicacion.appendChild(us);
            publicacion.appendChild(fa);
            publicacion.appendChild(carta);
            publicacion.appendChild(tag);
            var like = document.createElement('button');
            like.className = "btn_r";
            like.innerHTML = likes;
            like.onclick = function() {btn_Reaccion(like);};
            var dislike = document.createElement('button');
            dislike.className = "btn_r";
            dislike.innerHTML = dislikes;
            dislike.onclick = function() {btn_Reaccion(dislike);};
            var img_like = document.createElement('i');
            var img_dislike = document.createElement('i');
            img_like.className = "fas fa-thumbs-up";
            img_dislike.className = "fas fa-thumbs-down"; 
            if(subir){
                if(localStorage.getItem(correo)){      
                    const idBTN = localStorage.getItem(correo).split(",");
                    dislike.id = idBTN.length + "d";
                    like.id = idBTN.length + "l";
                }
            }else{
                dislike.id = idNum + "d";
                like.id = idNum + "l";
            }
            like.appendChild(img_like)
            dislike.appendChild(img_dislike);
            var reaccion = document.createElement('div');
            reaccion.className = "reacciones";
            reaccion.appendChild(like);
            reaccion.appendChild(dislike);
            publicacion.appendChild(reaccion);
            contenedor.appendChild(publicacion);
            if(subir){
                if(localStorage.getItem(correo)){      
                    const lista = localStorage.getItem(correo).split(",");
                    var cadena = (lista.length+1) + "|" + apunte + "|" + hoy + "|" + tags + "|" + 0 + "|" + 0;     
                    localStorage.setItem(correo, localStorage.getItem(correo) + ',' + cadena);
                }else{
                    var cadena = 1 + "|" + apunte + "|" + hoy + "|" + tags + "|" + 0 + "|" + 0;     
                    localStorage.setItem(correo,cadena);
                }    
                const ap = document.getElementById('apunte');
                ap.value = "";
                const tg = document.getElementsByClassName('tags');
                tg.value = "";
            }
        }else{
            window.alert("Llene cada uno de los datos");
        }
        
    }
    window.onload = function(e){
        e.preventDefault();
        var cell = document.getElementById("miPublicacion");
        if ( cell.hasChildNodes() ){
            while ( cell.childNodes.length >= 1 ){
                cell.removeChild( cell.firstChild );
            }
        }
        console.log("cargando...");
        const usAct = localStorage.getItem("usuarioActual").split("|");
        if(localStorage.getItem(usAct[0])){
            const apuntes = localStorage.getItem(usAct[0]).split(",");
            for(var i = 0; i < apuntes.length; i++ ){
                var elementos = apuntes[i].split("|");  
                append(elementos[1],elementos[2],elementos[3],elementos[4],elementos[5], false, usAct[0], usAct[1],'miPublicacion', i);
            }
        }
        const publicacion = document.getElementById("publicacion");
        publicacion.style.display = "block";
        const misPublicaciones = document.getElementById("miPublicacion");
        misPublicaciones.style.display = "block";
        const otraPublcacion = document.getElementById("otraPublicacion");
        otraPublcacion.style.display = "none";
        const otroUsuario = document.getElementById("otroUsuario");
        otroUsuario.style.display = "none";
    }
    function subir(e){
        e.preventDefault();
        const apunte = document.getElementById('apunte').value;
        const tags = document.getElementById('tags').value;
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        const usAct = localStorage.getItem("usuarioActual").split("|");
        append(apunte, hoy.toDateString(), tags, 0, 0, true, usAct[0], usAct[1],'miPublicacion', 0);
    }
    
    function cerrarSesion(e){
        e.preventDefault();
        history.push("");
    }

    function busqueda(e){
        e.preventDefault();
        var contenedor = document.createElement("div");
        
        contenedor.className ="container container_p rounded w-50 shadow my-3 py-3 contenerPublicacion";
        const usuario = document.getElementById("buscar").value;
        if(usuario){
            const publicacion = document.getElementById("publicacion");
            publicacion.style.display = "none";
            const misPublicaciones = document.getElementById("miPublicacion");
            misPublicaciones.style.display = "none";

            const content = document.getElementById("contenedor");
            const publicaciones = document.getElementById("otraPublicacion");
            const otras = document.getElementById("otroUsuario");

            content.removeChild(publicaciones);
            content.removeChild(otras);

            const otraPublicacion = document.createElement("div");
            otraPublicacion.id ="otraPublicacion";
            content.appendChild(otraPublicacion);

            const otros = document.createElement("div");
            otros.id ="otroUsuario";
            content.appendChild(otros);

            const otraP = document.getElementById("otraPublicacion");
            const list = document.createElement("div");
            list.className = "list-group";
            const label = document.createElement("label");
            label.className = "lbl d-block";

            const find = document.createElement("label");
            find.className = "lbl d-block";

            list.appendChild(label);
            list.appendChild(find);
            var encontrados = 0;
            const userInfoG = localStorage.getItem("gmail").split(",");
            for( var i = 0; i < userInfoG.length; i++ ){
                var datos = userInfoG[i].split("|");
                if( datos[0].includes(usuario) || datos[1].includes(usuario) ){
                    encontrados++;
                    const usuarioEncontrado = document.createElement("button");
                    usuarioEncontrado.onclick = function() {btn_buscar(usuarioEncontrado);};
                    usuarioEncontrado.className = "list-group-item list-group-item-action my-1";
                    const lbl_Nombre = document.createElement("label");
                    const lbl_Correo = document.createElement("label");
                    const br = document.createElement("br");
                    lbl_Nombre.innerHTML = datos[1];
                    lbl_Correo.innerHTML = datos[0];
                    usuarioEncontrado.appendChild(lbl_Nombre);
                    usuarioEncontrado.appendChild(br);
                    usuarioEncontrado.appendChild(lbl_Correo);
                    list.appendChild(usuarioEncontrado);
                    console.log("Encontrado");
                }
            }
            const userInfo = localStorage.getItem("email").split(",");
            for( var i = 0; i < userInfo.length; i++ ){
                var datos = userInfo[i].split("|");
                if( datos[0].includes(usuario) || datos[1].includes(usuario) ){
                    encontrados++;
                    const usuarioEncontrado = document.createElement("button");
                    usuarioEncontrado.onclick = function() {btn_buscar(usuarioEncontrado);};
                    usuarioEncontrado.className = "list-group-item list-group-item-action my-1";
                    const lbl_Nombre = document.createElement("label");
                    const lbl_Correo = document.createElement("label");
                    const br = document.createElement("br");
                    lbl_Nombre.innerHTML = datos[1];
                    lbl_Correo.innerHTML = datos[0];
                    usuarioEncontrado.appendChild(lbl_Nombre);
                    usuarioEncontrado.appendChild(br);
                    usuarioEncontrado.appendChild(lbl_Correo);
                    list.appendChild(usuarioEncontrado);
                    console.log("Encontrado");
                }
            }
            label.innerHTML = "Busqueda para: " + usuario;
            find.innerHTML = "Resultados Encontrados: " + encontrados;
            contenedor.appendChild(list);
            otraP.appendChild(contenedor);
            const busquedaUs = document.getElementById("buscar")
            busquedaUs.value = "";
        }
    }

    function btn_buscar(e){
        const content = document.getElementById("contenedor");
        const publicaciones = document.getElementById("otraPublicacion");
        const otras = document.getElementById("otroUsuario");

        content.removeChild(publicaciones);
        content.removeChild(otras);

        const otraPublicacion = document.createElement("div");
        otraPublicacion.id ="otraPublicacion";
        content.appendChild(otraPublicacion);

        const otros = document.createElement("div");
        otros.id ="otroUsuario";
        content.appendChild(otros);
        console.log("mostrar lbl...");
        var boton = document.createElement("button");
        boton = e;
        const correo = boton.lastChild.innerHTML;
        const usuario = boton.firstChild.innerHTML;
        console.log(correo);
        const apuntesTodos = localStorage.getItem(correo);
        if(apuntesTodos){
            const apunte = apuntesTodos.split(",");
            perfil = correo;
            for(var i = 0; i < apunte.length; i++ ){
                const elementos = apunte[i].split("|");
                append(elementos[1],elementos[2],elementos[3],elementos[4],elementos[5], false, correo, usuario, "otroUsuario", i);
                console.log("hizo append");
            }
        }   
    }

    function btn_Reaccion(e){
        var boton = document.createElement("button");
        boton = e;
        const id = e.id;
        var nPublicacion = 0;
        if( id.includes("d") ){
            nPublicacion = id.split("d");
        }else{
            nPublicacion = id.split("l");
        }
        var reacciones = 0;
        for( var i = 0; i < boton.innerHTML.length; i++ ){
            if( boton.innerHTML[i] === '<'){
                i = boton.innerHTML.length
            }else{
                reacciones++;
            }

        }
        var reaccionesTotales = boton.innerHTML.substring(0,reacciones);
        reaccionesTotales++;
        const user = localStorage.getItem("usuarioActual").split("|");
        const correo = user[0];
        if(!perfil)
            perfil = correo;
        const cadena = correo + "|" + perfil + "|" + id;
        if( localStorage.getItem("reacciones") ){
            localStorage.setItem("reacciones", localStorage.getItem("reacciones") + ',' + cadena);
        }else{
            localStorage.setItem("reacciones",cadena);
        }
        boton.innerHTML = reaccionesTotales;
        console.log(reaccionesTotales);
        console.log(perfil);
    }

    return(
        <div id="contenedor">
            <div className="barra">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <div className="col-1">
                            <i className="fas fa-book img-fluid principal_f"></i>
                        </div>
                        <a className="navbar-brand" href="#">UniApuntes</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <button className="btn nav-link active" aria-current="page" onClick={window.onload}>Inicio</button>
                                </li>
                                <li className="nav-item">
                                    <button className="btn nav-link" onClick ={window.onload}>Mis Apuntes</button>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" >Etiquetas</a>
                                </li>
                                <li className="nav-item">
                                    <button className="btn nav-link" href="#" tabIndex="-1" onClick={cerrarSesion}>Cerrar Sesión</button>
                                </li>
                            </ul>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Buscar..." aria-label="Search" id="buscar"></input>
                                <button className="btn btn-outline-success" type="submit" onClick={busqueda}>Buscar</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="container container_p rounded w-50 shadow my-3 py-3 " id="publicacion">
                {/* <label className="lbl">nombre</label> */}
                <textarea className="form-control" rows="1" placeholder="Apunte: react fue creado por desarrolladores de facebook..." id="apunte"></textarea>
                <input type="text" placeholder="Etiquetas: javascript;react;front end" className="form-control my-2" id="tags"></input>
                <button className="btn btn-primary bg-blue" onClick={subir}><i className="fas fa-plus-circle"></i>Subir</button>
            </div>
            <div id="miPublicacion"></div>
            <div id="otraPublicacion"></div>
            <div id="otroUsuario"></div>
        </div>
    );
}

export default Principal