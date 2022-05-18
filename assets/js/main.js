'use strict'

		const openModel = ()=> document.getElementById('model').classList.add('active')

		const closeModel = ()=> {
			clearFields()
			document.getElementById('model').classList.remove('active')
		}

		const getLocalStorage = ()=> JSON.parse(localStorage.getItem('db_touriste'))??[]
		const setLocalStorage = (db_touriste)=> localStorage.setItem('db_touriste', JSON.stringify(db_touriste))

		const readTouriste = ()=> getLocalStorage()

		const createTouriste = (touriste)=> {
			const db_touriste = getLocalStorage()
			db_touriste.push(touriste)
			setLocalStorage(db_touriste)
		} 

		const updateTouriste = (index, touriste)=> {
			const db_touriste = readTouriste()
			db_touriste[index] = touriste
			setLocalStorage(db_touriste)
		}


		const deleteTouriste = (index)=> {
			const db_touriste = readTouriste()
			db_touriste.splice(index, 1)
			setLocalStorage(db_touriste)
		}

		const isValidFields = ()=> {
		   return document.getElementById('form').reportValidity()
		}

		const clearFields = ()=> {
			const fields = document.querySelectorAll('.model-field')
			fields.forEach(field => field.value = "")
		} 

		const saveTouriste = ()=>{
			if(isValidFields()){
				const touriste = {
					nom: document.getElementById('nom').value,
					prenom: document.getElementById('prenom').value,
					email: document.getElementById('email').value,
					pays: document.getElementById('pays').value,
					adresse: document.getElementById('adresse').value,
					
				}
				//console.log('The Cadastral student: ' + student)
				const index = document.getElementById('nom').dataset.index
				if(index == 'new'){
					createTouriste(touriste)
					listTouriste()
					closeModel()
				}else{
					updateTouriste(index, touriste)
					listTouriste()
					closeModel()
				}
			}
		}


		const createRow = (touriste, index)=> {
			const newRow = document.createElement('tr')
			newRow.innerHTML = `
				<td>${touriste.nom}</td>
				<td>${touriste.prenom}</td>
				<td>${touriste.email}</td>
				<td>${touriste.pays}</td>
				<td>${touriste.adresse}</td>
				<td>
					<button type="button" class="button green" id="edit-${index}">Modifier</button>
					<button type="button" class="button red" id="delete-${index}">Supprimer</button>
				</td>
			`
			document.querySelector('#tblTouriste>tbody').appendChild(newRow)
		}

		const crearTable = ()=> {
			const rows = document.querySelectorAll('#tblTouriste>tbody tr')
			rows.forEach(row => row.parentNode.removeChild(row))
		}

		const listTouriste = ()=> {
			const touristes =  readTouriste()
			// console.log(students)
			crearTable()
			touristes.forEach(createRow)
		}

		const fillFields = (touriste)=> {
			document.getElementById('nom').value = touriste.nom
			document.getElementById('prenom').value = touriste.prenom
			document.getElementById('email').value = touriste.email
			document.getElementById('pays').value = touriste.pays
			document.getElementById('adresse').value = touriste.adresse

			document.getElementById('nom').dataset.index = touriste.index
		}

		const editTouriste = (index)=>{
			const touriste = readTouriste()[index]
			touriste.index = index
			fillFields(touriste)
			openModel()
		}

		const editDelete = (event)=>{
			if(event.target.type == 'button'){
				const [action, index] = event.target.id.split('-')
				if(action == 'edit'){
					editTouriste(index)
				}else{
					const touriste = readTouriste()[index]
					const response = confirm(`Etes-vous sûr de supprimer ${touriste.nom} ${touriste.prenom} ??`)
					if(response){
						deleteTouriste(index)
						listTouriste()
					}
				}
			}
		}

		listTouriste()

		document.getElementById('idTouriste').addEventListener('click', openModel)
		document.getElementById('modelClose').addEventListener('click', closeModel)
		document.getElementById('cancel').addEventListener('click', closeModel)
		document.getElementById('save').addEventListener('click', saveTouriste)
		document.querySelector('#tblTouriste>tbody').addEventListener('click', editDelete)