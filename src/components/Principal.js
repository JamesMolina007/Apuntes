import React from 'react'
import './assets/CSS/indexStyle.css'
function Principal(){
    function subir(e){
        e.preventDefault();
        const apunte = document.getElementById('apunte');
        const tags = document.getElementById('tags');
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        console.log(hoy.toDateString());
        if(apunte && tags){

        }else{
            window.alert("Llene cada uno de los datos");
        }
    }
    return(
        <div>
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
            <div class="container rounded w-50 shadow my-3 py-3 ">
                <label className="lbl">nombre</label>
                <textarea className="form-control" rows="1" placeholder="Apunte: react fue creado por desarrolladores de facebook..." id="apunte"></textarea>
                <input type="text" placeholder="Etiquetas: javascript,react,front end" className="form-control my-2" id="tags"></input>
                <button class="btn btn-primary" onClick={subir}><i class="fas fa-plus-circle"></i>Subir</button>
            </div>
        </div>
    );
}

export default Principal