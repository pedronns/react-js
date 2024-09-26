const mongoose = require("mongoose")

async function main() {
	try {
		mongoose.set("strictQuery", true)

		await mongoose.connect(
			"mongodb+srv://pedrodnunes1:8zmNdfpXAeEVF0zX@cluster0.kziok.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
		)

        console.log('Conectado ao banco!')
	} catch (error) {
		console.log(error)
	}
}


module.exports = main
