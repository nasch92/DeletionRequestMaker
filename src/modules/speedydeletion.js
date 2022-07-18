import * as utils from "./utils";

let criteriaLists = {  
    general:[
    {code: "g1", name: "G1. Vandalismo"},
    {code: "g2", name: "G2. Etiqueta"},
    {code: "g3", name: "G3. Páginas promocionales"},
    {code: "g4", name: "G4. Páginas de pruebas de edición"},
    {code: "g5", name: "G5. Bulos, fraudes"},
    {code: "g6", name: "G6. Violaciones de derechos de autor"},
    {code: "g7", name: "G7. Páginas de discusión huérfanas"},
    {code: "g8", name: "G8. Borrado de una página para dejar sitio"},
    {code: "g9", name: "G9. Recreación de material borrado"},
    {code: "g10", name: "G10. Para mantenimiento elemental"},
    {code: "g11", name: "G11. A petición del único autor"}
],  articles:[
    {code: "a1",   name: "A1. Viola «lo que Wikipedia no es»"},
    {code: "a1.1", name: "A1.1 Artículos que solo incluyen enlaces"},
    {code: "a1.2", name: "A1.2 Definiciones de diccionario o recetas"},
    {code: "a1.3", name: "A1.3 Fuente primaria"},
    {code: "a1.4", name: "A1.4 Ensayos de opinión"}
],  redirects:[
    {code: "r1", name: "R1. Redirecciones a páginas inexistentes"},
    {code: "r2", name: "R2. Redirecciones de un espacio de nombres a otro"},
    {code: "r3", name: "R3. Redirecciones automáticas innecesarias"},
    {code: "r4", name: "R4. Redirecciones incorrectas o innecesarias"},
],  categories:[
    {code: "c1", name: "C1. Categorías vacías"},
    {code: "c2", name: "C2. Categorías trasladadas o renombradas"},
    {code: "c3", name: "C3. Categorías que violan la política de categorías"}
],  userpages:[
    {code: "u1", name: "U1. A petición del propio usuario"},
    {code: "u2", name: "U2. Usuario inexistente"},
    {code: "u3", name: "U3. Violación de la política de páginas de usuario"}
],  templates:[
    {code: "p1", name: "P1. Violación de la política de plantillas de navegación"},
    {code: "p2", name: "P2. Subpágina de documentación huérfana"},
    {code: "p3", name: "P3. Plantillas de un solo uso"}
]}

function getOptions(criteriaType) {
	let options = [];
	for (let chosenType of criteriaLists[criteriaType]) {
		let option = { type: 'option', value: chosenType.code, label: chosenType.name, checked: chosenType.default };
		options.push(option);
	}
	return options;
}

function createFormWindow() {
	let Window = new Morebits.simpleWindow(620, 530);
	Window.setTitle('Solicitar borrado rápido');
	Window.addFooterLink('Criterios para el borrado rápido', 'Wikipedia:Criterios para el borrado rápido');
	let form = new Morebits.quickForm(submitMessage);

    let gField = form.append({
	    type: 'field',
		label: 'Criterios generales:',
	    });
    gField.append({
        type: 'checkbox',
        name: 'general',
        list: getOptions("general")
        })

    if ( mw.config.get( 'wgNamespaceNumber' ) == 0 ) {
        let aField = form.append({
		    type: 'field',
		    label: 'Criterios para artículos:',
        })

        aField.append({
            type: 'checkbox',
            name: 'article',
            list: getOptions("articles")
        })
    }
    
    if (mw.config.get( 'wgIsRedirect' )) {
        let rField = form.append({
            type: 'field',
            label: 'Criterios para páginas de redirección:',
        })
        rField.append({
            type: 'checkbox',
            name: 'article',
            list: getOptions("redirects")
        })
    }

    if ( mw.config.get( 'wgNamespaceNumber' ) == 14 ) {
        let cField = form.append({
            type: 'field',
            label: 'Criterios para categorías:',
        })
        cField.append({
            type: 'checkbox',
            name: 'article',
            list: getOptions("categories")
        })
    }

    if ( mw.config.get( 'wgNamespaceNumber' ) == 2 ) {
        let uField = form.append({
            type: 'field',
            label: 'Criterios para páginas de usuario:',
        })
        uField.append({
            type: 'checkbox',
            name: 'article',
            list: getOptions("userpages")
        })
    }

    if ( mw.config.get( 'wgNamespaceNumber' ) == 10 ) {
        let tField = form.append({
            type: 'field',
            label: 'Criterios para plantillas:',
        })
        tField.append({
            type: 'checkbox',
            name: 'article',
            list: getOptions("templates")
        })
    }

	form.append({
		type: 'submit',
		label: 'Aceptar'
	});

    let result = form.render();
	Window.setContent(result);
	Window.display();
}

function submitMessage(e) {
	let form = e.target;
}

export {createFormWindow};