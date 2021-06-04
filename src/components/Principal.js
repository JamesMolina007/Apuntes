import './assets/CSS/indexStyle.css'
function Principal(){

    window.onload = function(e){
        e.preventDefault();
        console.log("cargando...");
        const usAct = localStorage.getItem("usuarioActual").split("|");
        if(localStorage.getItem(usAct[0])){
            const apuntes = localStorage.getItem(usAct[0]).split(",");
            for(var i = 0; i < apuntes.length; i++ ){
                console.log(apuntes[i]);
            }
        }
    }
    function subir(e){
        e.preventDefault();
        const apunte = document.getElementById('apunte').value;
        const tags = document.getElementById('tags').value;
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        console.log(hoy.toDateString());
        if(apunte && tags){
            const contenedor = document.getElementById('contenedor');
            const publicacion = document.createElement('div');
            var carta = document.createElement('div');
            carta.className = "card";
            var cuerpoCarta = document.createElement('div');
            cuerpoCarta.className = "card-body";
            var textoCarta = document.createElement('p');
            textoCarta.className = "card-text";
            textoCarta.innerHTML = apunte;
            var tag = document.createElement('div');
            cuerpoCarta.appendChild(textoCarta);
            carta.appendChild(cuerpoCarta);
            var tagsN = tags.split(",");

            var row = document.createElement('div');
            row.className = "row g-1 mt-3 text-center";
            for (var i = 0; i < tagsN.length; i++) {
                var tag_1 = document.createElement('span');
                tag_1.className = "tag_1 col";
                tag_1.innerHTML = tagsN[i];
                console.log(tag_1);
                row.appendChild(tag_1);
                tag.appendChild(row);
            }
            publicacion.className = "container container_p rounded w-50 shadow my-3 py-3 contenerPublicacion";
            const usAct = localStorage.getItem("usuarioActual").split("|");
            var us = document.createElement('label');
            var fa = document.createElement('label');
            fa.innerHTML = hoy.toDateString();
            fa.className = "lbl d-block";
            us.innerHTML = usAct[1];
            us.className = "lbl";
            publicacion.appendChild(us);
            publicacion.appendChild(fa);
            publicacion.appendChild(carta);
            publicacion.appendChild(tag);
            var like = document.createElement('button');
            like.className = "btn_r";
            like.innerHTML = "0";
            var dislike = document.createElement('button');
            dislike.className = "btn_r";
            dislike.innerHTML = "0";
            var img_like = document.createElement('i');
            var img_dislike = document.createElement('i');
            img_like.className = "fas fa-thumbs-up";
            img_dislike.className = "fas fa-thumbs-down"; 
            like.appendChild(img_like)
            dislike.appendChild(img_dislike);
            var reaccion = document.createElement('div');
            reaccion.className = "reacciones";
            reaccion.appendChild(like);
            reaccion.appendChild(dislike);
            publicacion.appendChild(reaccion);
            contenedor.appendChild(publicacion);
            if(localStorage.getItem(usAct[0])){      
                const lista = localStorage.getItem(usAct[0]).split(",");
                var cadena = (lista.length+1) + "|" + apunte + "|" + hoy.toDateString() + "|" + 0 + "|" + 0;     
                localStorage.setItem(usAct[0], localStorage.getItem(usAct[0]) + ',' + cadena);
            }else{
                var cadena = 1 + "|" + apunte + "|" + hoy.toDateString() + "|" + 0 + "|" + 0;     
                localStorage.setItem(usAct[0],cadena);
            }    
            const ap = document.getElementById('apunte');
            ap.innerHTML = "";
            const tg = document.getElementById('tags');
            tg.innerHTML = "";
        }else{
            window.alert("Llene cada uno de los datos");
        }
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
                                    <a className="nav-link active" aria-current="page" href="#">Inicio</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Mis Apuntes</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" >Etiquetas</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Cerrar Sesión</a>
                                </li>
                            </ul>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Buscar..." aria-label="Search"></input>
                                <button className="btn btn-outline-success" type="submit">Buscar</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="container container_p rounded w-50 shadow my-3 py-3 ">
                {/* <label className="lbl">nombre</label> */}
                <textarea className="form-control" rows="1" placeholder="Apunte: react fue creado por desarrolladores de facebook..." id="apunte"></textarea>
                <input type="text" placeholder="Etiquetas: javascript,react,front end" className="form-control my-2" id="tags"></input>
                <button className="btn btn-primary" onClick={subir}><i className="fas fa-plus-circle"></i>Subir</button>
            </div>
        </div>
    );
}

export default Principal