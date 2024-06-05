import type { Config } from "drizzle-kit";

const getEnv = (envVarName: string) => {
	const envVar = process.env[envVarName];
	if (!envVar) throw new Error(`'${envVarName}' environment variable missing`);
	return envVar;
};

export default {
	schema: "./src/feats/**/schema.ts",
	out: "./migrations",
	strict: true,
	dialect: "mysql",
	dbCredentials: {
		host: getEnv("DB_HOST"),
		user: getEnv("DB_USER"),
		password: getEnv("DB_PASS"),
		database: getEnv("DB_NAME")
	}
} satisfies Config;
