import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../Services/api';

import './styles.css'

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    /**
     * executa uma fun��o, sempre que o estado das vari�veis(segundo par�metro) s�o alterados
     * se deixar o segundo par�metro vazio, vai executar uma vez quando a p�gina � carregada.
     */
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: localStorage.getItem('ongId'),
            },
        }).then(response => {
            setIncidents(response.data);
        })
    }, []);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${ id }`, {
                headers: {
                    Authorization: localStorage.getItem('ongId'),
                }
            });

            /**
             * n�o � necess�rio buscar os dados do banco para mostrar a lista
             * basta aletrar o estado da lista mostrando apenas o que � diferente
             * do que foi deletado
             */
            setIncidents(incidents.filter(incident => incident.id !== id));

        } catch (error) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={ logoImg } alt="Be The Hero" />
                <span>Bem-vinda, { localStorage.getItem('ongName') }</span>

                <Link className="button" to="/incidents/new">
                    Cadastrar Novo Caso
                </Link>

                <button
                    type="button"
                    onClick={ handleLogout }
                >
                    <FiPower size={ 18 } color="#E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>
            <ul>
                { incidents.map(incident => (
                    <li key={ incident.id }>
                        <strong>Caso:</strong>
                        <p>{ incident.title }</p>

                        <strong>Descri��o:</strong>
                        <p>{ incident.description }</p>

                        <strong>Valor:</strong>
                        <p>
                            { Intl.NumberFormat(
                                'pt-BR', { style: 'currency', currency: 'BRL' }
                            ).format(incident.value) }
                        </p>

                        <button
                            type="button"
                            onClick={ () => handleDeleteIncident(incident.id) }
                            /**
                             * � necess�rio criar uma fun��o para o clique, pois, sem a fun��o
                             * ao carregar a p�gina, a fun��o handle ser� executada e o onClick receber� o retorno
                             * dela
                             */
                        >
                            <FiTrash2 siza={ 20 } color="#a8a8b3" />
                        </button>
                </li>
                )) }
            </ul>
        </div>
    );
}