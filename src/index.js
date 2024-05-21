import fastify from "fastify";
import { z } from "zod";
import cors from "@fastify/cors";

const app = fastify();
app.register(cors);

app.get("/", async (request, response) => {
    return { status: "Server is up." };
});

app.get("/announcements/latest", async (request, response) => {
    return {
        title: "Announcement",
        from: "rakinar2",
        content:
            "We're happy to announce that we're almost done with the project!",
        timestamp: Date.now(),
    };
});

const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
});

app.post("/login", (request, response) => {
    try {
        const { username, password } = loginSchema.parse(request.body);

        if (username === "root" && password === "root") {
            return {
                token: "LMAO",
                expires: Date.now() + 1000 * 60 * 60 * 24,
                user: {
                    id: 0,
                    username: "root",
                    name: "Root User",
                    avatar: "https://images-ext-1.discordapp.net/external/3IZJa1HCOoUBmqWBx-0DxCkVSkuyYTVPUvcWQkaCFmw/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/774553653394538506/122a9dba34f636cb35e19a963e8e42f6.webp?format=webp",
                },
                guilds: [
                    {
                        id: "964969362073198652",
                        name: "OneSoftNet",
                        icon: "3bb81d7da4041bc44a56eacc3c1e57ef",
                    },
                    {
                        id: "911987536379912193",
                        name: "Private Server",
                        icon: null,
                    },
                ],
            };
        } else {
            response.status(401).send({ error: "Invalid credentials" });
        }
    } catch (error) {
        response.status(400).send({ error: error?.errors });
    }
});

app.listen(
    {
        port: 3000,
        host: "0.0.0.0"
    },
    (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address}`);
    }
);
