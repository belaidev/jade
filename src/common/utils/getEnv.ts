export const getEnv = (envVarName: string) => {
	const envVar = process.env[envVarName];
	if (!envVar) throw new Error(`'${envVarName}' environment variable missing`);
	return envVar;
};
