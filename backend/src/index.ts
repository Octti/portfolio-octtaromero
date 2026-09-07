import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';

const app = express()
const PORT = process.env.PORT || 8000;

//Permitir peticiones desde el frontend
app.use(cors({ origin: 'http://localhost:5173', credentials: true}));
app.use(express.json())

//Definimos la esctructura de los datos
interface ProfileData {
    name: string; 
    title: string;
    about: string;
    skills: {core :string[]; learning: string[]};
    fun_facts: string[];
}

//Ruta principal que devuelve la información 
app.get('/api/profile', (req: Request, res: Response) => {
    const profile: ProfileData = {
        name: "Octavio Romero",
        title: "System Engineering Student & Full-Stack Developer",
        about: "Systems Engineering student passionate about software development, technology, and continuous learning. I enjoy building software and solving challenging problems across both Back-End and Front-End.",
        skills: {
            core: ["Python", "MySQL", "SQLite", "Git", "GitHub", "Docker", "CI/CD (GitHub Actions)", "Node.js", "Express", "TypeScript", "CSS", "HTML", "JavaScript"],
            learning: ["Angular", "React", "Django", "FastAPI", "Linux", "Cybersecurity"]
        },
        fun_facts: ["MMA 🥋", "Music 🎵", "Movies 🎬", "Video Games 🎮"]
    };
    //pequeño retraso de medio segundo para que la animacion del frontend se luzca
    setTimeout(() => res.json(profile), 500);
});

app.listen(PORT, () => {
    console.log(`Backend corriendo en http://localhost:${PORT}`);
})