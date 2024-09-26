import partyFetch from "../axios/config"

import { useState, useEffect } from "react"

import { useParams, Link, useNavigate } from "react-router-dom"

import useToast from "../hooks/useToast"

import "./Party.css"

const Party = () => {
	const { id } = useParams()

	const [party, setParty] = useState(null)

	const navigate = useNavigate()

	//load party
	useEffect(() => {
		const loadParty = async () => {
			const res = await partyFetch.get(`/parties/${id}`)

			console.log(res.data)

			setParty(res.data)
		}

		loadParty()
	}, [])

	//delete this party
	const handleDelete = async () => {
		const res = await partyFetch.delete(`/parties/${id}`)

		if (res.status === 200) {
			navigate("/")
			useToast(res.data.msg)
		}
	}

	if (!party) return <p>Carregando...</p>

	return (
        <div className="party">
			<h1>{party.title}</h1>
			<h3>Orçamento: R$ {party.budget}</h3>
            <img className='party-img'src={party.image} alt={party.title} />
			<div className="actions-container">
				<Link to={`/party/edit/${party._id}`} className="btn">
					Editar
				</Link>
				<button onClick={handleDelete} className="btn-secondary">
					Excluir
				</button>
			</div>

			<h3>Serviços contratados:</h3>


			{party.services && (
                <div className="services-container">
					{party.services.map((service) => (
                        <div className="service" key={service._id}>
							<img src={service.image} alt={service.name} />
							<p>{service.name}</p>
						</div>
					))}
				</div>
			)}

            {party.services.length === 0 && (
                <p>Você não contratou nenhum serviço para esta festa.</p>
            )}
		</div>
	)
}

export default Party
