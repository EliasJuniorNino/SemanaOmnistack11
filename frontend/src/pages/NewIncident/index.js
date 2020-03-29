import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
	const [title, setTitle ] = useState();
	const [description, setDesciption] = useState();
	const [value, setValue ] = useState();

	const ongId = localStorage.getItem('ongId');

	const history = useHistory();

	async function handleNewIncident(e) {
		e.preventDefault();

		const data = {
			title,
			description,
			value
		};

		try {
			await api.post('incidents', data, {
				headers: {
					Authorization: ongId,
				}
			})
			history.replace('/profile');
		} catch (error) {
			alert('erro ao cadastrar caso')
		}
	}

	return (
		<div className="new-incident-container">
			<div className="content">
				<section>
					<img src={logoImg} alt="Be the hero"/>

					<h1>Cadastrar novo caso</h1>
					<p>
						Descreva o caso detalhadamente para encontrar um heroi para resolver
						isso.
					</p>

					<Link className="back-link" to="/profile" >
						<FiArrowLeft size={16} color="#E02041" />
						Voltar para home
					</Link>
				</section>

				<form onSubmit={handleNewIncident}>
					<input 
						value={title}
						onChange={e => setTitle(e.target.value)}
						placeholder="Titulo do caso" />
					<textarea 
						value={description}
						onChange={e => setDesciption(e.target.value)}
						placeholder="Descrição" />
					<input 
						value={value}
						onChange={e => setValue(e.target.value)}
						placeholder="Valor em reais" />
					<button className="button" type="submit">Cadastrar</button>
				</form>
			</div>
		</div>
	);
}
