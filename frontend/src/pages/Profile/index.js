import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import { useState } from 'react';

export default function Profile() {
	const [incidents, setIncidents] = useState([]);

	const history = useHistory();

	const ongName = localStorage.getItem('ongName');
	const ongId = localStorage.getItem('ongId');

	useEffect(() => {
		api.get('profile', { headers: {
			Authorization: ongId
		}}).then(res => {
			setIncidents(res.data)
		})
	}, [ongId]);

	async function handleDeleteIncident(id) {
		try {
			await api.delete(`incidents/${id}`, {
				headers: {
					Authorization: ongId
				}
			})
			setIncidents(incidents.filter(el => el.id !== id))
		} catch (error) {
			alert('Erro ao deletar caso, tente novamente');
		}
	}

	function handleLogout() {
		localStorage.clear();
		history.replace('/')
	}

	return (
		<div className="profile-container">
			<header>
				<img src={logoImg} alt="Be the hero"/>
				<span>Bem vinda, {ongName}</span>

				<Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
				<button type="button" onClick={handleLogout}>
					<FiPower size={18} color="#E02041" />
				</button>
			</header>

			<h1>Casos cadastrados</h1>
			<ul>
				{
					incidents.map((item, index) => (
						<li key={index}>
							<strong>CASO:</strong>
							<p>{item.title}</p>
							
							<strong>DESCRIÇÂO:</strong>
							<p>{item.description}</p>

							<strong>Valor:</strong>
							<p>
								{
									Intl.NumberFormat(
										'pt-BR', 
										{ style: 'currency', currency: 'BRL' }
									).format(item.value)
								}
							</p>

							<button 
								type="button" 
								onClick={() => handleDeleteIncident(item.id)}
							>
								<FiTrash2 size={20} color="#a8a8e3"/>
							</button>
						</li>
					))
				}
			</ul>
		</div>
	);
}
