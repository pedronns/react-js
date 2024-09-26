import axios from "../axios-config"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { MdClose } from "react-icons/md"
import { toast } from "react-toastify"
import "./Home.css"

const Home = () => {
	const [memories, setMemories] = useState([])

	useEffect(() => {
		const getMemories = async () => {
			const res = await axios.get("/memories")
			setMemories(res.data)
		}

		getMemories()
	}, [])

	const deleteMemory = async (id) => {
		try {
			setMemories((prevMemories) =>
				prevMemories.filter((memory) => memory._id !== id)
			)

			await axios.delete(`/memories/${id}`)
		} catch (error) {
			console.error("Erro ao deletar a memória:", error)
			setMemories((prevMemories) => [
				...prevMemories,
				memories.find((memory) => memory._id === id),
			])
		}
	}

	return (
		<div className="home">
			<h2>Confira as últimas memórias</h2>
			<div className="memories-container">
				{memories.length > 0 &&
					memories.map((memory) => (
						<div className="memory" key={memory._id}>
							<MdClose
								className="delete"
								onClick={() => deleteMemory(memory._id)}
							/>
							<img
								src={`${axios.defaults.baseURL}${memory.src}`}
								alt={memory.title}
							/>
							<p>{memory.title}</p>
							<Link className="btn" to={`/memories/${memory._id}`}>
								Comentar
							</Link>
						</div>
					))}
				{memories.length === 0 && <p>Sem memórias para exibir.</p>}
			</div>
		</div>
	)
}

export default Home
